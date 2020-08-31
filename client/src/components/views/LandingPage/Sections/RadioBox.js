import React, { useState } from 'react'
import { Collapse , Radio } from 'antd'

const { Panel }  = Collapse;

function RadioBox(props){

    const [Value ,setValue] = useState(0);

    const renderRadioBox = () => (
        props.list && props.list.map(value => (
            <Radio key ={value._id} value={value._id}> {value.name} </Radio>
        ))
    )

    // 변경시
    const handleChange = (event) => {
        setValue(event.target.value)
        // 부모 컴퍼넌트에 전달
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={[`1`]}>
                <Panel header="This is panel header 1" key="1">
                    <Radio.Group onChange={handleChange} value={Value}> 
                        {renderRadioBox()}
                    </Radio.Group>

                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox