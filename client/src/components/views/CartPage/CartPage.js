import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import {getCartItmes} from '../../../_actions/user_actions';
function CartPage(props) {

    const dispatch = useDispatch();

    useEffect(()=> {

        let cartItems = [];

        // 리덕스 User state안에 cart 안에 상품이 들어있는지 확인
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                })

                dispatch(getCartItmes(cartItems, props.user.userData.cart))
            }
        }
    }, [])
    return (
        <div>
            CartPage
        </div>
    )
}

export default CartPage
