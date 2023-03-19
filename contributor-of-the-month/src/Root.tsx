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
				width={2548}
				height={1068}
				defaultProps={{
					avatarUrl: 'https://avatars.githubusercontent.com/u/100117126?v=4',
					name: 'Nevo David',
				}}
			/>
		</>
	);
};
