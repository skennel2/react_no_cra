import React, { useReducer, useCallback, Dispatch } from 'react';
import './TestComponent.css';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from 'redux';

export interface StoreTestState {
    appName: string
}

export interface StoreTestAction extends Action {
    payload: string
}

export function StoreTestReducer(state: StoreTestState = { appName: '초기값' }, action: StoreTestAction): StoreTestState {
    console.log(state, action)
    
    if (action.type === 'change') {
        return {
            ...state,
            appName: action.payload
        }
    }

    return state;
}

export function StoreTestReducer2(state: StoreTestState = { appName: '초기값' }, action: StoreTestAction): StoreTestState {
    console.log(state, action)

    if (action.type === 'change') {
        return {
            ...state,
            appName: action.payload
        }
    }

    return state;
}

export interface GlobalReducer {
    StoreTestReducer: StoreTestState,
    StoreTestReducer2: StoreTestState
}

async function asyncJobTest(dispatch: Dispatch<StoreTestAction>) {
    await new Promise<void>(resolve => {
        setTimeout(() => {
            dispatch({
                type: 'change_A',
                payload: '1'
            })
            resolve()
        }, 1000);
    })

    await new Promise<void>(resolve => {
        setTimeout(() => {
            dispatch({
                type: 'change_A',
                payload: '2'
            })
            resolve()
        }, 2000);
    })

    await new Promise<void>(resolve => {
        setTimeout(() => {
            dispatch({
                type: 'change_A',
                payload: '3'
            })
            resolve()
        }, 3000);
    })    
}

export default function StoreTest() {
    const name = useSelector<GlobalReducer, string>(state => state.StoreTestReducer.appName)
    const name2 = useSelector<GlobalReducer, string>(state => state.StoreTestReducer2.appName)
    const dispatch = useDispatch();

    const handleButtonClick = useCallback(() => {
        dispatch({
            type: 'change_A',
            payload: '데이터 변경'
        })
    }, [])

    return (
        <div className='blue'>
            <button onClick={handleButtonClick}>
                데이터 변경
            </button>
            <button onClick={async () => {
                await asyncJobTest(dispatch)
            }}>
                비동기 작업 실행 
            </button>
            <div>
                <span>A 데이터: </span>
                <span>{name}</span>
            </div>
            <div>
                <span>B 데이터: </span>
                <span>{name2}</span>
            </div>
        </div>
    )
}
