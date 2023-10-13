import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import FormatPrice from '../helpers/FormatPrice'
import { cartTotal } from '../store/slices/CartSlice'

const TotalBox = () => {
    const dispatch = useDispatch()
    const {cart, total_price, shipping_fee} = useSelector((state) => state.Cart)

    useEffect(() =>{
        dispatch(cartTotal())
     }, [cart])
  return (
    <Wrapper>
        <h3>Order Summary</h3>
        <br/>
         {
            cart.map((elem, index) =>{
                return(
                      <div className="item_row" key={index}>
                         <div className='item_detail'>
                            <img src={elem.image} alt="product image"/>
                            <h3>{elem.name}</h3>
                            <p>x {elem.amount}</p>
                         </div>
                         <div className='item_total'>
                            <p><FormatPrice price={elem.price * elem.amount}/></p>
                         </div>
                      </div>
                )
            })
         }
                      <br/>
                      <hr/>
                       <table>
                        <tbody>
                        <tr>
                            <td><b>Subtotal</b></td>
                            <td><FormatPrice price={total_price} /></td>
                        </tr>
                        <tr>
                            <td><b>Shipping Fee</b></td>
                            <td><FormatPrice price={shipping_fee} /></td>
                        </tr>
                        <tr>
                            <td><b>Total</b></td>
                            <td><FormatPrice price={total_price + shipping_fee} /></td>
                        </tr>
                        </tbody>
                       </table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
     background: #f4f4f4;
     padding: 30px;
     margin-top: 65px;
     border-radius: 5px;

     .item_row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
     }
     .item_detail{
        position: relative;
        padding-left: 65px;

        img{
            width: 50px;
            height: 50px;
            position: absolute;
            left: 0;
            top: 5px;
            object-fit: cover;
            border-radius: 5px;
        }
     }

     table {
        width: 100%;
        font-size: 14px;
        margin-top: 15px;
       td {
        padding: 5px 0;

        &:nth-child(2){
            text-align: right;
        }
    }
}
`

export default TotalBox