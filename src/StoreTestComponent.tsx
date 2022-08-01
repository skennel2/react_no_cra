import React, { useReducer, useCallback } from 'react';
import './TestComponent.css';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from 'redux';

export interface StoreTestState {
    appName: string
}

export interface StoreTestAction extends Action {
    payload: string
}

export function StoreTestReducer(state: StoreTestState = { appName: 'Test111' }, action: StoreTestAction): StoreTestState {
    if (action.type === 'change') {
        return {
            ...state,
            appName: action.payload
        }
    }

    return state;
}

export default function StoreTestComponent() {
    const name = useSelector<StoreTestState, string>(state => state.appName)
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
