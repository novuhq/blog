export interface IOrganizationResponse {
	id: string;
	name: string;
	login: string;
	url: string;
	avatarUrl: string;
	repositories: {
		totalCount: number;
		pageInfo: {
			startCursor: string;
			endCursor: string;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
		};
		nodes: IOrganizationRepository[];
	};
}

export interface IOrganizationRepository {
	id: string;
	name: string;
	description?: string;
	url: string;
	stargazerCount: number;
	pullRequests: {
		totalCount: number;
		pageInfo: {
			startCursor: string;
			endCursor: string;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
		};
		nodes: IPullRequest[];
	};
}

export interface IPullRequest {
	title: string;
	id: string;
	url: string;
	mergedAt: string;
	mergedBy: {
		avatarUrl: string;
		url: string;
		login: string;
	};
	changedFiles: number;
	merged: boolean;
	author: {
		login: string;
		avatarUrl: string;
		url: string;
	};
}

export interface IGetOrgProps {
	endCursor?: string;
}

export interface IContributorStats {
	author: IUser & {
		type: 'User' | 'Bot';
	};
	total: number;
}

export interface IUser {
	login: string;
	id: number;
	html_url: string;
	avatar_url: string;
}

export interface IPRConfig {
	org?: string;
	author: string;
}

export interface IContributionStats {
	organization: IOrganizationResponse;
	contributions: Record<
		string,
		{
			user: IUser;
			count: number;
		}
	>;
	pullRequests: Record<
		string,
		{
			user: IUser;
			count: number;
		}
	>;
}
