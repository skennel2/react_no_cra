import React, { useRef } from 'react';

export default function UseRefTestComponent() {
    const ref = useRef<HTMLDivElement>()

    return (
        <div ref={ref} className='blue'>
            <button onClick={() => {
                if (ref.current) {
                    console.log(ref.current.clientHeight)
                }
            }}>
                클릭
            </button>
        </div>
    )
}
