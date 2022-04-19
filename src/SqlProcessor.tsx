import React, { useState } from 'react';

interface SqlProcessorProps {

}

interface SqlItem {
    original: string, camelCase: string, javaField: string, mybatisVariable: string, mybatisModelVariable: string
}

export default (props: SqlProcessorProps) => {
    const [value, setValue] = useState('');
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');

    const [columnData, setColumnData] = useState<SqlItem[]>([]);
    const [result, setResult] = useState<string>('');

    const handleSetColumnDataClicked = () => {
        if (!value) {
            alert('입력된 데이터가 없음')
        }

        const columns = value.split(/(\s+)/)
            .filter(item => {return item.trim().length > 0 })
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
    }

    const handleUpdateClicked = () => {
        let result = '';
        columnData.forEach((item) => {
            result += item.original + ' = ' + item.mybatisVariable + ',' + '\r'
        })

        setResult(result)
    }

    const handleInsertClicked = () => {
        let result = "INSERT INTO \r"
        result += '(\r';

        columnData.forEach((item, index) => {
            result += item.original;
            if (index < columnData.length - 1) {
                result += ', ';
            }

            if (index > 0 && index % 4 === 0) {
                result += '\r'
            }
        })
        result += '\r) VALUES \r(\r'

        columnData.forEach((item, index) => {
            result += item.mybatisModelVariable;
            if (index < columnData.length - 1) {
                result += ', ';
            }

            if (index > 0 && index % 4 === 0) {
                result += '\r'
            }
        })

        result += '\r)'

        setResult(result)
    }

    const handlePrefix = () => {
        const resultData = columnData.map((item) => {
            return prefix + item.original + suffix
        });

        setResult(resultData.join('\r'))
    }

    const handleJavaFieldsClicked = () => {
        const resultData = columnData.map((item) => {
            return item.javaField;
        });

        setResult(resultData.join('\r'))
    }

    return (
        <div style={{
            padding: '10px'
        }}>
            <div style={{
                display: 'flex'

            }}>
                <div>
                    <textarea cols={80} rows={30} value={value} onChange={(e) => {
                        setValue(e.target.value);
                    }} />
                </div>
                <div>
                    <textarea cols={80} rows={30} value={result} disabled={true} />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="" title='PREFIX'>
                        <input type="text"
                            value={prefix}
                            onChange={(e) => {
                                setPrefix(e.target.value)
                            }} />
                    </label>
                    <label htmlFor="" title='SUFFIX'>
                        <input type="text"
                            value={suffix}
                            onChange={(e) => {
                                setSuffix(e.target.value)
                            }}
                        />
                    </label>
                    <button onClick={handlePrefix}>PREFIX</button>
                </div>
                <div>
                    <button onClick={handleSetColumnDataClicked}>RUN</button>
                    <button onClick={handleJavaFieldsClicked}>JAVA Fields</button>
                    <button onClick={handleUpdateClicked}>UPDATE</button>
                    <button onClick={handleInsertClicked}>INSERT</button>
                </div>
            </div>
        </div>
    )
}

function toMyBatisVariable(camelCase: string) {
    return '#{' + camelCase + '}';
}

function toMyBatisModelVariable(camelCase: string) {
    return '#{model.' + camelCase + '}';
}

function decorateValueToJavaField(camelCaseValue: string) {
    let type = 'String';
    if(camelCaseValue.endsWith('Amt') || camelCaseValue.endsWith('Sq')) {
        type = 'BigDecimal'
    }

    return 'private ' + type + ' ' + camelCaseValue + ';'
}

function toUnderscoreToCamelCase(value: string) {
    const splitByUnderBarList = value.split('_');
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