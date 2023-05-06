import React from 'react';
import { Audio, staticFile } from 'remotion';


type Props = {
	children: React.ReactNode;
};

export const Jimaku: React.FC<Props> = ({children}) => {
	return (
		<div style={jimakuBackground}>
			<div style={{position: 'relative'}}>
				<p
					style={{
						//position: 'absolute',
						top: '2px',
						width: '100%',
						left: '-6px',
						zIndex: 10,
						fontSize: 'xxx-large',
					}}
				>
					{children}
				</p>
			</div>
		</div>
	);
};

const jimakuBackground: React.CSSProperties = {
	position: 'absolute',
	width: '100%',
	height: '300px',
	bottom: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	whiteSpace: 'pre-wrap',
	zIndex: 1,
	backgroundColor: 'rgba(255,255,255,0.85)',
};
