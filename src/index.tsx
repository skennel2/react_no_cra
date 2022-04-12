import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

console.log(process.env.TEST_VALUE)

function runApp() {
    const container = document.getElementById('root');
    if(container) {
        const root = createRoot(container);
        root.render(<ClickCounter name={'카운터'}/>);
    
        console.log("app started");
    }
}

function ClickCounter(props: {name: string}) {
    const [count, setCount] = useState(0);

    const handleClick = useCallback((e: any) => {
        console.log(e);
        setCount(count + 1);
    }, [count]);

    return (
        <span onClick={handleClick}>
            {props.name} {count}
            {process.env.TEST_VALUE}
        </span>
    )
}

runApp();