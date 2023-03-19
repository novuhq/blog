import schedule from 'node-schedule';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderMedia} from '@remotion/renderer';
import path from 'path';
import {GitHubAPI} from './services/github';
require('dotenv').config();
GitHubAPI.setKey();

schedule.scheduleJob('0 0 1 * *', () => {
	startProcess();
});


const startProcess = async () => {
	const topContributor = await GitHubAPI.startProcess();
	const bundleLocation = await bundle(
		path.resolve('./src/index.ts'),
		() => undefined,
		{
			webpackOverride: (config) => config,
		}
	);

	const comps = await getCompositions(bundleLocation, {
		inputProps: topContributor,
	});

	const composition = comps.find((c) => c.id === 'Contributor')!;

	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: 'h264',
		outputLocation: 'out/contributor.gif',
		inputProps: topContributor,
	});
};
