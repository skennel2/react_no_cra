import React, { useState } from 'react';

interface SqlProcessorProps {

}

export default (props: SqlProcessorProps) => {
    const [value, setValue] = useState('');
    const [columnData, setColumnData] = useState<{ original: string, camelCase: string, javaField: string }[]>([]);

    return (
        <div style={{
            padding: '10px'
        }}>
            <div>
                <textarea cols={80} rows={30} value={value} onChange={(e) => {
                    setValue(e.target.value);
                }} />
            </div>
            <button onClick={() => {
                if (!value) {
                    alert('입력된 데이터가 없음')
                }

                const columns = value.split(/(\s+)/)
                    .filter(item => { console.log(item); return item.trim().length > 0 })
                    .map(item => item.trim())
                    .map(item => item.replace(',', ''))
                    .map(item => {
                        const original = item;
                        const camelCase = toUnderscoreToCamelCase(original);
                        const javaField = decorateValueToJavaField(camelCase);
                        return {
                            original: original,
                            camelCase: camelCase,
                            javaField: javaField
                        }
                    });

                setColumnData(columns);
            }}>RUN</button>
            <div>
                {
                    columnData.map((item, index) => <div key={index}>{item.javaField}</div>)
                }
            </div>
        </div>
    )
}

// function toUpdateSql(originals: string[]) {
//     return `
//     UPDATE TABLE 
//        SET ${}
//     `
// }

function toMyBatisVariable(camelCase: string) {
    return '#{' + camelCase + '}';
}

function decorateValueToJavaField(camelCaseValue: string, type: string = 'String') {
    return 'private ' + type + ' ' + camelCaseValue + ';'
}

function toUnderscoreToCamelCase(value: string) {
    const splitByUnderBarList = value.split('_');
    console.log(splitByUnderBarList)
    if (splitByUnderBarList.length <= 0) {
        return '';
    }

    return splitByUnderBarList.map((splitByUnderBarItem, index) => {
        if (index === 0) {
            return splitByUnderBarItem.toLowerCase();
        } else {
            let result = '';
            for (let index2 = 0; index2 < splitByUnderBarItem.length; index2++) {
                const char = splitByUnderBarItem.charAt(index2);
                if (index2 === 0) {
                    result += char.toUpperCase();
                } else {
                    result += char.toLowerCase();
                }
            }
            return result;
        }
    }).join('');
}