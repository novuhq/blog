import {Composition} from 'remotion';
import {MyComposition} from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Contributor"
				component={MyComposition}
				durationInFrames={300}
				fps={30}
				width={2400}
				height={1350}
				defaultProps={{
					avatarUrl: 'https://avatars.githubusercontent.com/u/39879720?v=4',
					name: 'Diwash',
				}}
			/>
		</>
	);
};
