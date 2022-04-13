import React from 'react'
import TestRenderer from 'react-test-renderer'
import { ClickCounter } from './index'

test('test for test', () => {
    expect(1).toBe(1)
})

// test('test renderder', () => {
//     const testRenderder = TestRenderer.create(
//         <ClickCounter name={'Test Click Counter'}/>
//     )

//     console.log(testRenderder)
// })