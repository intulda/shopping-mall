import React, { useState } from 'react';
import {Input} from 'antd';

const { Search } = Input;

function SearchFeature(props){

    const [searchTerm, setsearchTerm] = useState("")

    const searchHandler = (event) => {
        setsearchTerm(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value);
    }

    return (
        <div>
            <Search
                placeholder="input search test"
                onChange={searchHandler}
                style={{ width : 200}}
                value={searchTerm}
            />
        </div>
    )
}

export default SearchFeature;