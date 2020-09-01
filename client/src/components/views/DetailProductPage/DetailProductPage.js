import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import {Row, Col} from 'antd'

function DetailProductPage(props){

    const [Product, setProduct] = useState({})

    const productId = props.match.params.productId 

    useEffect(() => {
        
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => { 
                if(response.data.success){
                    console.log("response.data", response.data);
                    setProduct(response.data.product[0]);
                }else{
                    alert("상세 정보 가져오기를 실패했습니다.");
                }
            })
    }, [])

    return (
        <div style={{width: '100%', padding: '3rem 4rem'}}>
            <div style={{display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16,16]}>
                <Col lg={12} sm={24}>
                    {/* Produect Image */}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo/>
                </Col>
            </Row>

        
        
        </div>
    )
}

export default DetailProductPage;