import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Confetti} from 'remotion-confetti';
import {ConfettiConfig} from 'remotion-confetti/index';
import {FC} from 'react';

const confettiConfig1: ConfettiConfig = {
	particleCount: 200,
	startVelocity: 100,
	colors: ['#0033ff', '#ffffff', '#00ff33'],
	spread: 1200,
	x: 1200,
	y: 600,
	scalar: 3,
};

export const MyComposition: FC<{avatarUrl: string; name: string}> = (props) => {
	const {avatarUrl, name} = props;
	return (
		<AbsoluteFill>
			<Confetti {...confettiConfig1} />
			<AbsoluteFill>
				<h1
					style={{
						textAlign: 'center',
						fontSize: 200,
						color: 'white',
						float: 'left',
						textShadow: '10px 10px 50px #000'
					}}
				>
					{name}
				</h1>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					background: 'white',
					width: 600,
					height: 600,
					borderRadius: '100%',
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					overflow: 'hidden',
				}}
			>
				<Img style={{minWidth: '100%', minHeight: '100%'}} src={avatarUrl} />
			</AbsoluteFill>
			<Img
				src={staticFile('background-contributor.png')}
				width={2400}
				height={1350}
			/>
		</AbsoluteFill>
	);
};
