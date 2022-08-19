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
                {/* 
                    테스트 시나리오 
                    show state에 따라 mount, unmount가 실제로 수행되는지 테스트
                    state값을 따라 mount, unmount가 번갈아 일어난다.
                */}
                {
                    show && <SimpleComponent
                        name={'Carti'}
                        // 테스트 시나리오, props로 배열을 렌더링마다 재생성되게 넘겼을떄 (불변성을 지키지 않았을때)
                        // SimpleComponent의 useEffect가 어떻게 동작하는지 확인
                        // hobby props를 체크하는 useEffect 콜백은 매번 호출된다.
                        hobby={['study', 'cooking']}
                    />
                }
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