import React, {useEffect, useState} from 'react'
import { Row, Col, Divider } from 'antd';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';

function AdminProductListPage(){

    // 페이징을 위한 변수
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)     // 처음에 보여주는 개수
    const [AdminProductInfo, setAdminProductInfo] = useState([]);
    useEffect(() => { debugger;
       
        let body = {
            skip : Skip ,
            limit : Limit
        }

        getProduct(body)
       
   }, [])

 const getProduct = (body) => {
    axios.post("/api/adminProduct/list", body)
    .then(response => {
        if(response.data.success){ debugger;
            setAdminProductInfo(response.data.adminProductInfo);
            
        }else{
            alert("상품을 가져오는데 실패 했습니다.")
        }
    })
}

<<<<<<< HEAD
const gridMainOnClick = (event) => {
=======
const onRowClick = (event) => {
>>>>>>> e7ab124ff0d2f4ff773659dd29889fd3cef7634f
    debugger;
}

const gridMain = AdminProductInfo.map((product, index) => {
<<<<<<< HEAD
    return <Row key={index} onClick={gridMainOnClick}>
        <Col span={4} order={5} >
            {product.title}
=======
    return <Row key={index} onClick={onRowClick}>
        <Col span={4} order={5}>
            <a href>{product.title}</a>
>>>>>>> e7ab124ff0d2f4ff773659dd29889fd3cef7634f
        </Col>
        <Col span={4} order={4} >
            {product.description}
        </Col>
        <Col span={4} order={3}>
            {product.leftSize}
        </Col>
        <Col span={4} order={2}>
             {product.rightSize}
        </Col>
        <Col span={5} order={1}>
             <ImageSlider images={product.images}/>
        </Col>
    </Row>
})
    
return (
    <div style={{width: '100%', padding: '3rem 4rem'}}>
        <div style={{display: 'flex', justifyContent: 'center' }}>
            <Divider orientation="left">List</Divider>
        </div> 
        <Row>
            <Col span={4} order={5} >
                글제목
            </Col>
            <Col span={4} order={4} >
                설명
            </Col>
            <Col span={4} order={3}>
                왼쪽 사이즈
            </Col>
            <Col span={4} order={2}>
                오른쪽 사이즈
            </Col>
            <Col span={5} order={1}>
                이미지
            </Col>
        </Row>
        <br />
        {gridMain}
       
</div>
)
}

export default AdminProductListPage