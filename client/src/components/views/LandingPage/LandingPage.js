import React, { useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Icon , Col, Card, Row} from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

function LandingPage() {

   const [Products, setProducts] = useState([])
   const [Skip, setSkip] = useState(0)
   const [Limit, setLimit] = useState(8)     // 처음에 보여주는 개수
   const [PostSize, setPostSize] = useState(0)

   useEffect(() => {
       
        let body = {
            skip : Skip ,
            limit : Limit
        }

        getProduct(body)
       
   }, [])

   const getProduct = (body) => {
        axios.post("/api/product/products", body)
        .then(response => {
            if(response.data.success){ debugger;
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo]);    
                }else{
                    setProducts(response.data.productInfo);    
                }
                setPostSize(response.data.postsize)
            }else{
                alert("상품을 가져오는데 실패 했습니다.")
            }
        })
   }

   const loadMoreHandler = () => {

        let skip = Skip + Limit;
                  // 0  +  8;
                  // 8  +  8;

        let body = {
            skip : skip ,
            limit : Limit ,
            loadMore : true
        }

        getProduct(body);
        setSkip(skip);
   }

   // <img style={{width: '100%', maxHeight:'150px'}} src={`http://localhost:5000/${product.images[0]}`}/>
   const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key = {index}>
            <Card
                cover ={<ImageSlider images={product.images}/>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>    
   })

   const handleFilters = () => {

   }
   
    return ( 
        <div style={{width: '75%' ,margin: '3rem auto'}}>
            <div style={{textAlign : 'center'}}>
                <h2>Let's Travel AnyWhere <Icon type="rocket"/></h2>
            </div>

            {/* Filter */}
            
            {/* CheckBox */}
            <Checkbox list={continents} handleFilters={filter => handleFilters(filter, "continents")}/>

            {/* RadioBox */}
            {/* Search */}

            {/* Cards */}
            <Row gutter={16, 16}>
            {renderCards}
            </Row>

            <br/>

            {PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
            
        </div>    
    )
}

export default LandingPage
