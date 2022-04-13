import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import testImage from './images/screenshot.png';
import './index.css';
import TestComponent from './TestComponent';

function logForTestEnvValueSettting() {
    console.log(process.env.TEST_VALUE)
}

function runApp() {
    logForTestEnvValueSettting();

    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <>
                <ClickCounter name={'카운터'} />
                <ImageLoadTest />
                <TestComponent />
            </>
        );

        console.log("app started!");
    }
}

export function ClickCounter(props: { name: string }) {
    const [count, setCount] = useState(0);

    const handleClick = useCallback((e: any) => {
        console.log(e);
        setCount(count + 1);
    }, [count]);

    return (
        <div onClick={handleClick} className={"red"}>
            {props.name} {count}
            {process.env.TEST_VALUE}
        </div>
    )
}

export function ImageLoadTest() {
    return (
        <img src={testImage} alt={'for test'} />
    )
}

runApp();