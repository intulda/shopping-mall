import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DetailProductPage(props){

    const productId = props.match.params.productId 

    const [Product, setProduct] = useState({})

    useEffect(() => {
        
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setProduct(response.data.product[0]);
                }else{
                    alert("상세 정보 가져오기를 실패했습니다.");
                }
            })
    }, [])

    return (
        <div style={{width : '100%', padding : '3rem 4rem'}}>
            <div style={{display : 'flex', justifyContent: 'center'}}>
                <h1>{Product.title}</h1>
            </div>

            <br />
             {/* productImage */}

             {/* productInfo */}
   
        </div>

    
    )
}

export default DetailProductPage;