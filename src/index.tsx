import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import testImage from './images/screenshot.png';
import './index.css';
import TestComponent from './TestComponent';
import styled from 'styled-components';

function logForTestEnvValueSettting() {
    console.log(process.env.TEST_VALUE)
}

function runApp() {
    logForTestEnvValueSettting();

    const StyledImageLoadTest = styled(ImageLoadTest)`
        width: 300px;
        height: 300px;
    `;

    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <>
                <ClickCounter name={'카운터'} />
                <StyledImageLoadTest />
                <TestComponent />
            </>
        );

        console.log("app started!");
    }
}

export function ClickCounter(props: { name: string }) {
    const SimpleRect = styled.div`
        color: tomato;
        border-color: tomato;
        border: 1px solid;
        display: inline-block;
        padding: 10px;
        border-radius: 10px
    `;

    const RedRect = styled(SimpleRect)`
        color: red;
        border-color: red;
    `;

    const [count, setCount] = useState(0);

    const handleClick = useCallback((e: any) => {
        console.log(e);
        setCount(count + 1);
    }, [count]);

    return (
        <>
            <RedRect onClick={handleClick}>
                {props.name} {count}
            </RedRect>
        </>
    )
}

export function ImageLoadTest(props: {className?: string}) {
    return (
        <img className={props.className} src={testImage} alt={'for test'} />
    )
}

runApp();