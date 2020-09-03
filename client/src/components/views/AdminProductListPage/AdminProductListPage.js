import React from 'react'
import { Row, Col, Divider } from 'antd';

function AdminProductListPage(){

    return (
        <div style={{width: '100%', padding: '3rem 4rem'}}>
            <div style={{display: 'flex', justifyContent: 'center' }}>
            <Divider orientation="left">Normal</Divider>
            </div>
            <Row>
            <Col span={6} order={4} >
                1 col-order-4
            </Col>
            <Col span={6} order={3}>
                2 col-order-3
            </Col>
            <Col span={6} order={2}>
                3 col-order-2
            </Col>
            <Col span={6} order={1}>
                4 col-order-1
            </Col>
            </Row>
    </div>
    )
}

export default AdminProductListPage