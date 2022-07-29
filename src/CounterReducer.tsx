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
