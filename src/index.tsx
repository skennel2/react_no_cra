import React, { Reducer } from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import TestComponent from './TestComponent';
import UseRefTest from './UseRefTest';
import SqlProcessor from './SqlProcessor';
import SWRTest from './SWRTest';
import { ClickCounter } from './ClickCounter';
import { ClickCounterUseReducer } from './ClickCounterUseReducer';
import { ImageLoadTest } from './ImageLoadTest';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import StoreTest, { StoreTestReducer, StoreTestReducer2, StoreTestState, StoreTestAction } from './StoreTest';
import UseEffectTest from './UseEffectTest';

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
    payload: 'index에서 데이터 변경'
})

function runApp() {
    logForTestEnvValueSettting();

    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <Provider store={store}>
                <Router>
                    <div>
                        <div>
                            <Link to={'TestComponent'}>TestComponent</Link>
                            <Link to={'SWRTest'}>SWRTest</Link>
                            <Link to={'SqlProcessor'}>SqlProcessor</Link>
                            <Link to={'ImageLoadTest'}>ImageLoadTest</Link>
                            <Link to={'ClickCounter'}>ClickCounter</Link>
                            <Link to={'ClickCounterUseReducer'}>ClickCounterUseReducer</Link>
                            <Link to={'StoreTestComponent'}>StoreTestComponent</Link>
                            <Link to={'UseRefTestComponent'}>UseRefTestComponent</Link>
                            <Link to={'UseEffectTest'}>UseEffectTest</Link>
                        </div>
                        <div>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route path="/ClickCounter" element={<ClickCounter name={'Counter'} />} />
                                <Route path="/ClickCounterUseReducer" element={<ClickCounterUseReducer name={'Counter'} />} />
                                <Route path="/SWRTest" element={<SWRTest />} />
                                <Route path="/TestComponent" element={<TestComponent />} />
                                <Route path="/SqlProcessor" element={<SqlProcessor />} />
                                <Route path="/ImageLoadTest" element={<ImageLoadTest />} />
                                <Route path="/StoreTestComponent" element={<StoreTest />} />
                                <Route path="/UseRefTestComponent" element={<UseRefTest />} />
                                <Route path="/UseEffectTest" element={<UseEffectTest />} />
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