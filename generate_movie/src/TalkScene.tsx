import {Series} from 'remotion';
import {Tachie} from './TalkScene/Tachie';
import {Jimaku} from './TalkScene/Jimaku';
import {Haikei} from './TalkScene/Haikei';
import {TalkData} from './videoConfig';

export const TalkScene: React.FC<{data: TalkData[]}> = ({data}) => {
	//const frame = useCurrentFrame();
	//const {durationInFrames, fps} = useVideoConfig();
	const TalkFrameSize = 30 * 3; // 表示フレーム数：30 fps * 3 sec

	const talks = data.map((talk, index) => {
		return (
			<Series.Sequence durationInFrames={TalkFrameSize} key={index}>
				<Tachie>{talk.owner}</Tachie>
				<Jimaku>{talk.content}</Jimaku>
				<Haikei></Haikei>
			</Series.Sequence>
		);
	});
	console.debug(talks);
	return (
	<>
	<Series>{talks}</Series>
	<div>{`number:${talks.length}`}</div>
	</>
	)
};

// CSS NonActive Character
// filter: grayscale(1)