interface CounterState {
    count: number;
}
interface CounterAction {
    type: 'INCREASE' | 'DECREASE';
    value: number;
}
function counterReducer(initialState: CounterState, action: CounterAction): CounterState {
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
