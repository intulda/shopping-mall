import React from 'react';
import {Button, Descriptions } from 'antd'
/* 리덕스 훅 */
import {useDispatch} from 'react-redux';


function ProductInfo(props){ 

    const dispatch = useDispatch();
    const clickHandler = () => {
 
        // 필요한 정보를 Cart 필드에다가 넣어 준다.
        // 필요한정보 : 상품 Id, 갯수, 날짜 
    }

    return(
        <div>
             <Descriptions title="Product Info">
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{display : 'flex', justifyContent: 'center'}}>
                <Button size='large' shape='round' type='danger' onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>

        </div>
    )
}

export default ProductInfo