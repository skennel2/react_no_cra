import React, { forwardRef, RefObject, useImperativeHandle, useRef, useState } from 'react';

interface MyInputProps {
    defaultValue: string
}

interface MyInputRef {
    focus: () => void;
    getValue: () => string;
    clear: () => void;
}

/**
 * 일반적으로 ref로 외부에서 접근 가능한 컴포넌트의 형태는 클래스형식이다. 
 * useImperativeHandle과 forwardRef를 이용해서 거의 동일하게 구현하는것이 가능하다.
 */
const MyUncontrolledInput = React.forwardRef(function (props: MyInputProps, refs: RefObject<MyInputRef>) {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>();

    useImperativeHandle(refs, () => {
        return {
            focus: () => {
                inputRef.current.focus()
            },
            getValue: () => {
                return value;
            },
            clear: () => {
                setValue('')
            }
        }
    });

    return (
        <input 
            ref={inputRef}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
        />
    )
})

export default function UseRefTestComponent() {
    const ref = useRef<HTMLDivElement>()
    const inputRef = useRef<MyInputRef>();

    return (
        <div ref={ref} className='blue'>
            <button onClick={() => {
                alert(inputRef.current.getValue())
            }}>
                MyInput의 Value
            </button>
            <button onClick={() => {
                inputRef.current.focus();
            }}>
                MyInput focus
            </button>
            <MyUncontrolledInput ref={inputRef} defaultValue={''}/>
        </div>
    )
}

export { MyUncontrolledInput as MyInput };