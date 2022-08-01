import React, { useCallback } from 'react';
import './TestComponent.css';

export default function TestComponent() {

    const handleButtonClick = useCallback(() => {

    }, [])

    return (
        <div className='blue'>
            <button onClick={handleButtonClick}>
                클릭
            </button>
            {name}
        </div>
    )
}
