import React from 'react';
import testImage from './images/screenshot.png';

export function ImageLoadTest(props: { className?: string; }) {
    return (
        <img className={props.className} src={testImage} alt={'for test'} />
    );
}
