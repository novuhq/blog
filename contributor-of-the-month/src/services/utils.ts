export const waitFor = (ms: number) =>
	new Promise((r) => {
		setTimeout(r, ms);
	});

export const MAX_CONTRIBUTION_FETCH_TRIES = 5;
export const CONTRIBUTIONS_FETCH_INTERVAL = 7_000;
