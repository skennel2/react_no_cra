import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import testImage from './images/screenshot.png';

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
            </>
        );

        console.log("app started!");
    }
}

function ClickCounter(props: { name: string }) {
    const [count, setCount] = useState(0);

    const handleClick = useCallback((e: any) => {
        console.log(e);
        setCount(count + 1);
    }, [count]);

    return (
        <div onClick={handleClick}>
            {props.name} {count}
            {process.env.TEST_VALUE}
        </div>
    )
}

function ImageLoadTest() {
    return (
        <img src={testImage} alt={'for test'} />
    )
}

runApp();