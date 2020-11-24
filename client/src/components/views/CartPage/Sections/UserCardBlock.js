import renderEmpty from 'antd/lib/config-provider/renderEmpty'
import React from 'react'
import "./UserCardBlock.css"

function UserCardBlock(props){

    const renderCartImages = (images) => {debugger;
        if(images.length > 0){
            let image = images[0];
            return `http://localhost:5000/${image}`
        }
    }
    const renderItems = () => ( 
        props.products && props.products.map((product, index )=> (
            <tr key={index}>
                <td>
                    <img style={{width: '70px'}} alt="product" src={renderCartImages(product.images)}/>
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    $ {product.price} 
                </td>
                <td>
                    <butto>
                        remove
                    </butto>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )

}

export default UserCardBlock