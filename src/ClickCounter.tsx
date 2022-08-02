import React, { useState, useCallback } from 'react';

export function ClickCounter(props: { name: string; }) {
    const [count, setCount] = useState(0);

    const handleClick = useCallback((e: React.MouseEvent) => {
        setCount(count + 1);
    }, [count]);

    return (
        <div onClick={handleClick}>
            {props.name} {count}
        </div>
    );
}
