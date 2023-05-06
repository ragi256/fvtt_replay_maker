import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';

export const Haikei: React.FC = () => {
	return (
		<AbsoluteFill style={{zIndex: 0}}>
			<Img src={staticFile('image/background/sample.png')} />
		</AbsoluteFill>
	);
};

