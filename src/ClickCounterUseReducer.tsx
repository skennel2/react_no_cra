import React, { useState, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { counterReducer } from './CounterReducer';

export function ClickCounterUseReducer(props: { name: string; }) {
    const [count, dispatch] = useReducer(counterReducer, { count: 0 });

    const handleClickINCREASE = useCallback((e: any) => {
        console.log(e);
        dispatch({
            type: 'INCREASE',
            value: 1
        })
    }, []);

    const handleClickDECREASE = useCallback((e: any) => {
        console.log(e);
        dispatch({
            type: 'DECREASE',
            value: 1
        })
    }, []);

    return (
        <div>
            <div onClick={handleClickINCREASE}>INCREASE</div>
            <div onClick={handleClickDECREASE}>DECREASE</div>
            {props.name} {count.count}
        </div>
    );
}
