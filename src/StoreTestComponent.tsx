import React, { useReducer, useCallback } from 'react';
import './TestComponent.css';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from 'redux';

export interface RootReducerState {
    appName: string
}

export interface RootReducerAction extends Action {
    payload: string
}

export function rootReducer(state: RootReducerState = { appName: 'Test111' }, action: RootReducerAction): RootReducerState {
    if (action.type === 'change') {
        return {
            ...state,
            appName: action.payload
        }
    }

    return state;
}

export default function StoreTestComponent() {
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
