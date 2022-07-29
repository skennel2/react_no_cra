import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export function ClickCounter(props: { name: string; }) {
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
        <RedRect onClick={handleClick}>
            {props.name} {count}
        </RedRect>
    );
}
