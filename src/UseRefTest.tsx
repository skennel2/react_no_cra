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
 * 일반적으로 ref로 내부 접근 가능한 컴포넌트의 형태는 클래스 기반 컴포넌트이다. 
 * useImperativeHandle과 forwardRef를 이용해서 거의 동일하게 구현하는것이 가능하다.
 */
const MyFunctionalUncontrolledInput = React.forwardRef((props: MyInputProps, refs: RefObject<MyInputRef>) => {
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
        } as MyInputRef
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

    const handleClickClear = useCallback(() => {
        inputRef.current.clear();
    }, [])

    const handleBeforeChange = useCallback((value: string) => {
        if (value === '111') {
            return false;
        }
        return true;
    }, [])

    return (
        <div ref={ref} className='blue'>
            <button onClick={handleClickGetValue}>MyInput의 getValue</button>
            <button onClick={handleClickFocus}>MyInput focus</button>
            <button onClick={handleClickClear}>MyInput의 clear</button>
            <MyFunctionalUncontrolledInput
                // 클래스 컴포넌트 처럼 ref props를 사용할 수 있다.
                ref={inputRef}
                defaultValue={''}
                onBeforeChange={handleBeforeChange} />
        </div>
    )
}

export { MyFunctionalUncontrolledInput as MyInput };