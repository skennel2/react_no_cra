import React, { Reducer } from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import TestComponent from './TestComponent';
import styled from 'styled-components';
import SqlProcessor from './SqlProcessor';
import SWRTest from './SWRTest';
import { ClickCounter } from './ClickCounter';
import { ClickCounterUseReducer } from './ClickCounterUseReducer';
import { ImageLoadTest } from './ImageLoadTest';
import { Provider } from 'react-redux';
import { createStore, Action, combineReducers } from 'redux';
import StoreTestComponent, { StoreTestReducer, StoreTestReducer2, StoreTestState, StoreTestAction } from './StoreTestComponent';

/**
 * 고차 컴포넌트로 리듀서 커스텀
 * 두 리듀서에 동일한 키의 액션 type이 있는것을 해결한다.
 * @param name 
 * @param reducer 
 */
function useNamedReducer(name: string, reducer: Reducer<StoreTestState, StoreTestAction>): Reducer<StoreTestState, StoreTestAction> {
    return function (state: StoreTestState, action: StoreTestAction) {
        if(action.type === `change_${name}`) {
            return reducer(state, {
                ...action,
                type: 'change'
            })
        }

        return reducer(state, action);
    }
}

const rootReducer = combineReducers({
    StoreTestReducer: useNamedReducer('A', StoreTestReducer),
    StoreTestReducer2: useNamedReducer('B', StoreTestReducer2),
});

const store = createStore(rootReducer);

console.log('initial store state',store.getState())

store.dispatch({
    type: 'change_B',
    payload: 's333'
})

function runApp() {
    logForTestEnvValueSettting();

    const StyledImageLoadTest = styled(ImageLoadTest)`
        width: 300px;
        height: 300px;
    `;

    const SimpleRect = styled.div`
        display: flex;
        flex-direction: column;
        color: tomato;
        border-color: tomato;
        border: 1px solid;
        padding: 10px;
        border-radius: 10px
    `;

    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <Provider store={store}>
                <Router>
                    <div style={{
                        display: 'flex'
                    }}>
                        <SimpleRect>
                            <Link to={'TestComponent'}>TestComponent</Link>
                            <Link to={'SWRTest'}>SWRTest</Link>
                            <Link to={'SqlProcessor'}>SqlProcessor</Link>
                            <Link to={'StyledImageLoadTest'}>StyledImageLoadTest</Link>
                            <Link to={'ClickCounter'}>ClickCounter</Link>
                            <Link to={'ClickCounterUseReducer'}>ClickCounterUseReducer</Link>
                            <Link to={'StoreTestComponent'}>StoreTestComponent</Link>
                        </SimpleRect>
                        <div>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route path="/ClickCounter" element={<ClickCounter name={'Counter'} />} />
                                <Route path="/ClickCounterUseReducer" element={<ClickCounterUseReducer name={'Counter'} />} />
                                <Route path="/SWRTest" element={<SWRTest />} />
                                <Route path="/TestComponent" element={<TestComponent />} />
                                <Route path="/SqlProcessor" element={<SqlProcessor />} />
                                <Route path="/StyledImageLoadTest" element={<StyledImageLoadTest />} />
                                <Route path="/StoreTestComponent" element={<StoreTestComponent />} />
                                <Route path="*" element={<div>Not Found</div>} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

function App() {
    return (
        <>
            HelloWorld
        </>
    )
}

function logForTestEnvValueSettting() {
    console.log(process.env.TEST_VALUE)
}

runApp();