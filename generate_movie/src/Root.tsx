import {Composition, staticFile} from 'remotion';
import {getTalks} from './getData';
import {TalkScene} from './TalkScene';
import {TalkData} from './videoConfig';
import React, {useState, useEffect} from 'react';


const animationFrame = 30;
const movieSeconds = 3 * 166; // 3 sec * 166 talk

export const RemotionRoot: React.FC = () => {
	const [data, setData] = useState<[]|TalkData[]>([]);

  useEffect(() => {
		const fetchData = async () => {	
			const path = staticFile('/json/fvtt-log-2023-01-22.json');
			
			const talks = await getTalks(path);
			setData(talks);
		}
		fetchData();
	}, []);
	
	return (
		<>
			<Composition
				id="TalkScene"
				component={TalkScene}
				durationInFrames={animationFrame*movieSeconds}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{data}}
			/>
		</>
	);
};
