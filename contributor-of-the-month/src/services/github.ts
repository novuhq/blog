import {Octokit} from '@octokit/rest';
import {IOrganizationResponse, IGetOrgProps} from './typings';
import moment from 'moment';
import {config} from 'dotenv';

export class GitHubAPI {
	static rest: Octokit;
	static setKey(key?: string) {
		GitHubAPI.rest = new Octokit({
			auth: key || process.env.GITHUB_TOKEN,
		});
	}

	public static getOrganization(config?: IGetOrgProps) {
		return GitHubAPI.rest.graphql<{
			organization: IOrganizationResponse;
		}>(`{
            organization(login: "${process.env.ORGANIZATION}") {
                id
                name
                login
                url
                avatarUrl
                repositories(first: 100, ${
									config?.endCursor ? `after: "${config.endCursor}", ` : ''
								}privacy: PUBLIC, isFork: false) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    nodes {
                        id
                        name
                        description
                        url
                        stargazerCount
                    }
                }
            }
        }`);
	}

	static async topContributorOfRepository(
		repo: string,
		after?: string
	): Promise<Array<{avatarUrl: string; login: string}>> {
		const allPulls = await GitHubAPI.rest.graphql<{
			repository: {
				pullRequests: {
					pageInfo: {
						startCursor: string;
						endCursor: string;
						hasNextPage: string;
						hasPreviousPage: string;
					};
					nodes: Array<{
						createdAt: string;
						author: {login: string; url: string; avatarUrl: string};
					}>;
				};
			};
		}>(`
query {
  repository(name: "${repo}", owner: "${process.env.ORGANIZATION}") {
    pullRequests(states: [MERGED], ${
			after ? `after: "${after}",` : ''
		} first: 100, orderBy: {field: CREATED_AT, direction: DESC}){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }
}
		`);

		const filterArray = allPulls.repository.pullRequests.nodes.filter(
			(n) =>
				moment(n.createdAt).add(1, 'year').isAfter(moment()) &&
				n?.author?.url?.indexOf('/apps/') === -1 &&
				n?.author?.url
		);

		return [
			...filterArray.map((p) => ({
				login: p.author.login,
				avatarUrl: p.author.avatarUrl,
			})),
			...(allPulls.repository.pullRequests.nodes.length &&
			moment(allPulls.repository.pullRequests.nodes.slice(-1)[0].createdAt)
				.add(1, 'year')
				.isAfter(moment()) &&
			allPulls.repository.pullRequests.pageInfo.hasNextPage
				? await GitHubAPI.topContributorOfRepository(
						repo,
						allPulls.repository.pullRequests.pageInfo.endCursor
				  )
				: []),
		];
	}

	static async startProcess() {
		const orgs = (
			await GitHubAPI.getOrganization()
		).organization.repositories.nodes.map((p) => p.name);

		const loadContributors: Array<{login: string; avatarUrl: string}> = [];
		for (const org of orgs) {
			loadContributors.push(
				...(await GitHubAPI.topContributorOfRepository(org))
			);
		}

		const score = Object.values(
			loadContributors.reduce((all, current) => {
				all[current.login] = all[current.login] || {
					name: current.login,
					avatarUrl: current.avatarUrl,
					total: 0,
				};
				all[current.login].total += 1;
				return all;
			}, {} as {[key: string]: {avatarUrl: string; name: string; total: number}})
		).reduce(
			(all, current) => {
				if (current.total > all.total) {
					return current;
				}
				return all;
			},
			{name: '', avatarUrl: '', total: -1} as {name: string; total: number}
		);

		return score;
	}
}
