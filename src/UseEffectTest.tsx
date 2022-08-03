import React, { useState, useEffect } from "react";

export default function UseEffectTest() {
    const [value, setValue] = useState('Hello World');
    const [show, setShow] = useState(true);

    // 빈 배열이 인자일경우 처음 렌더링된 케이스에서만 호출
    // 리턴되는 함수는 클린업 함수, 이 경우 언마운트 될때 호출
    useEffect(() => {
        console.log('mount UseEffectTest')
        return () => {
            console.log('unmount UseEffectTest')
        }
    }, [])

    // 렌더링 될때마다 호출
    useEffect(() => {
        console.log('update UseEffectTest')
    })

    // 특정 state, props가 변경되었을때 호출 
    useEffect(() => {
        console.log('mount UseEffectTest')
    }, [value])

    return (
        <div>
            <div>
                <button onClick={() => {
                    setValue('Hello World')
                }}>
                    Hello World
                </button>
                <button onClick={() => {
                    setValue('Hello Universe')
                }}>
                    Hello Universe
                </button>
                <button onClick={() => {
                    setValue('Hello Asia')
                }}>
                    Hello Asia
                </button>
            </div>

            <div>
                {value}
            </div>

            <div>
                <div>
                    <button onClick={() => {
                        setShow(!show)
                    }}>
                        {show ? 'hide' : 'show'}
                    </button>
                </div>
                {show && <SimpleComponent name={'Carti'} hobby={['study', 'cooking']} />}
            </div>
        </div>
    )
}

function SimpleComponent(props: { name: string, hobby: string[] }) {
    useEffect(() => {
        console.log(props.name, 'mount')
        return () => {
            console.log(props.name, 'unmount')
        }
    }, [])

    useEffect(() => {
        console.log(props.name, 'hobby changed')
    }, [props.hobby])

    return <div>
        <div>
            {`I Am ${props.name}`}
        </div>
        <div>
            {
                props.hobby.map((item) => {
                    return <div>{item}</div>
                })
            }
        </div>
    </div>
}