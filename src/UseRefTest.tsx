import React, { forwardRef, RefObject, useImperativeHandle, useRef, useState, useCallback } from 'react';

interface MyInputProps {
    defaultValue: string;
    onBeforeChange?: (value: string) => boolean;
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
const MyFunctionalUncontrolledInput = React.forwardRef(function (props: MyInputProps, refs: RefObject<MyInputRef>) {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>();

    /**
     * 명령형 핸들러 선언
     */
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
                if (props.onBeforeChange && !props.onBeforeChange(e.target.value)) {
                    return;
                }

                setValue(e.target.value);
            }}
        />
    )
})

export default function UseRefTest() {
    const ref = useRef<HTMLDivElement>()
    const inputRef = useRef<MyInputRef>();

    const handleClickGetValue = useCallback(() => {
        alert(inputRef.current.getValue())
    }, []);

    const handleClickFocus = useCallback(() => {
        inputRef.current.focus();
    }, [])

    const handleBeforeChange = useCallback((value: string) => {
        if (value === '111') {
            return false;
        }
        return true;
    }, [])

    return (
        <div ref={ref} className='blue'>
            <button onClick={handleClickGetValue}>MyInput의 Value</button>
            <button onClick={handleClickFocus}>MyInput focus</button>
            <MyFunctionalUncontrolledInput
                ref={inputRef}
                defaultValue={''}
                onBeforeChange={handleBeforeChange} />
        </div>
    )
}

export { MyFunctionalUncontrolledInput as MyInput };