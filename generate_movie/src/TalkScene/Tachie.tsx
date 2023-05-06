import React from 'react';
import {Img, staticFile} from 'remotion';

type Props = {
	//children: React.ReactNode;
  children: string;
};

export const Tachie: React.FC<Props> = ({children}) => {
	console.log(children);
  // let style = characterImage;
  // if (children === 'クロマ') {
  //   style.filter = 'grayscale(1)'
  // }

	return (
		<Img
			src={staticFile('image/chroma/0_default.png')}
			style={{...characterImage, filter: children === 'クロマ' ? '': 'grayscale(1)'}}

		/>
	);
};

const characterImage: React.CSSProperties = {
	position: 'absolute',
	//width: '100%',
	height: '50%',
	left: 700,
	bottom: 300,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	whiteSpace: 'pre-wrap',
	zIndex: 1,
	//backgroundColor: 'rgba(255,255,255,0.85)',
};
