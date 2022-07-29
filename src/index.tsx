import React from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import TestComponent from './TestComponent';
import styled from 'styled-components';
import SqlProcessor from './SqlProcessor';
import SWRTest from './SWRTest';
import { ClickCounter } from './ClickCounter';
import { ImageLoadTest } from './ImageLoadTest';

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
            <Router>
                <div style={{
                    display: 'flex'
                }}>
                    <SimpleRect>
                        <Link to={'SWRTest'}>SWRTest</Link>
                        <Link to={'TestComponent'}>TestComponent</Link>
                        <Link to={'SqlProcessor'}>SqlProcessor</Link>
                        <Link to={'StyledImageLoadTest'}>StyledImageLoadTest</Link>
                        <Link to={'ClickCounter'}>ClickCounter</Link>

                    </SimpleRect>
                    <div>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/ClickCounter" element={<ClickCounter name={'Counter'} />} />
                            <Route path="/SWRTest" element={<SWRTest />} />
                            <Route path="/TestComponent" element={<TestComponent />} />
                            <Route path="/SqlProcessor" element={<SqlProcessor />} />
                            <Route path="/StyledImageLoadTest" element={<StyledImageLoadTest />} />
                            <Route path="*" element={<div>Not Found</div>} />
                        </Routes>
                    </div>
                </div>
            </Router>
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