import React, { useReducer, useCallback } from 'react';
import './TestComponent.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootReducerState } from '.';

export default function TestComponent() {
    const name = useSelector<RootReducerState, string>(state => state.appName)
    const dispatch = useDispatch();

    const handleButtonClick = useCallback(() => {
        dispatch({
            type: 'change',
            payload: 'ssss'
        })
    }, [])

    return (
        <div className='blue'>
            <button onClick={handleButtonClick}>
                클릭
            </button>
            {name}
        </div>
    )
}
