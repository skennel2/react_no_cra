
import useSWR, { useSWRConfig } from 'swr'
import React, { useState } from 'react';

export default function SWRTest() {
    const { data, error } = useSWR('test', fetcher);

    const { mutate } = useSWRConfig();

    const [testValue, setTestValue] = useState(1);
    if (!data) {
        return <div>loading</div>
    }

    if (error) {
        return <div>error</div>
    }

    return (
        <div>
            <div tabIndex={-1} onClick={() => {
                setTestValue(testValue + 1);
            }}>
                {data.map(item => <div>{item.value}</div>)}
            </div>

            <button onClick={() => {
                setTestValue(testValue + 1);
            }}>counter</button>

            <button onClick={() => {
                mutate('test')
            }}>refresh data</button>
            
            <div>
                {testValue}
            </div>
        </div>
    )
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

/**
 * swr에게 제공되는 fetcher 
 * axios fetch API등으로 대체된다.
 * 
 * @param arg 
 */
const fetcher = (...arg: any) => {
    return new Promise<any[]>(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    value: getRandomArbitrary(1, 100)
                },
                {
                    id: 2,
                    value: getRandomArbitrary(1, 100)
                },
                {
                    id: 3,
                    value: getRandomArbitrary(1, 100)
                },
            ])
        }, 2000);
    })
}
