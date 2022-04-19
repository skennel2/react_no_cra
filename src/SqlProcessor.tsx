import React, { useState } from 'react';

interface SqlProcessorProps {

}

interface SqlItem {
    original: string, camelCase: string, javaField: string, mybatisVariable: string, mybatisModelVariable: string
}

export default (props: SqlProcessorProps) => {
    const [value, setValue] = useState('');
    const [columnData, setColumnData] = useState<SqlItem[]>([]);
    const [result, setResult] = useState<string>('');
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
                        const mybatisVar = toMyBatisVariable(camelCase);
                        const mybatisModelVariable = toMyBatisModelVariable(camelCase);
                        return {
                            original: original,
                            camelCase: camelCase,
                            javaField: javaField,
                            mybatisVariable: mybatisVar,
                            mybatisModelVariable: mybatisModelVariable
                        }
                    });

                setColumnData(columns);
            }}>RUN</button>

            <button onClick={() => {
                let result = '';
                columnData.forEach((item) => {
                    result += item.original + ' = ' + item.mybatisVariable + ',' + '\r'
                })

                setResult(result)
            }}>
                UPDATE
            </button>
            <button onClick={() => {
                let result = '(';
                columnData.forEach((item, index) => {
                    result += item.original + ', ';
                    if(index > 0 && index % 4 === 0) {
                        result += '\r'
                    }
                })
                result += ') VALUES ('

                columnData.forEach((item, index) => {
                    result += item.mybatisModelVariable + ', '

                    if(index > 0 && index % 4 === 0) {
                        result += '\r'
                    }
                })

                setResult(result)
            }}>
                INSERT 
            </button>            
            <div>
                <textarea cols={80} rows={30} value={result} disabled={true}/>
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

function toMyBatisModelVariable(camelCase: string) {
    return '#{model.' + camelCase + '}';
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