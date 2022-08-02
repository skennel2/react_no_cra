import React, { useCallback, useReducer } from 'react';

export interface CounterState {
    count: number;
}
export interface CounterAction {
    type: 'INCREASE' | 'DECREASE';
    value: number;
}

export function counterReducer(initialState: CounterState, action: CounterAction): CounterState {
    if (action.type === 'INCREASE') {
        return {
            ...initialState,
            count: initialState.count + action.value
        };
    }
    else if (action.type === 'DECREASE') {
        return {
            ...initialState,
            count: initialState.count - action.value
        };
    }

    return initialState;
}

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
