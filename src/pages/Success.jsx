import React from 'react'
import { BsCheck2Circle } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { removeOrderDetails } from '../store/slices/CartSlice';

const Success = () => {
    const {order_details, order_details : {id}} = useSelector((state) => state.Cart)
    const amount = order_details?.purchase_units?.map((elem) => elem.amount.value)
    const dispatch = useDispatch()

    if(!order_details.purchase_units){
       return (
        <Wrapper>
        <div className='box'>
       <p>No Data Found</p>
       </div>
        </Wrapper>
       )
    }

  return (
    <Wrapper>
        <div className='box'>
            <BsCheck2Circle/>
            <h2>Your order has been placed</h2>
            <p><b>Transaction ID :</b> {id}</p>
            <p><b>Order Total : </b>{amount?.toString()} USD</p>
            <br/>
            <br/>
            <Link to='/' onClick={() => dispatch(removeOrderDetails())}><button className="btn">Back to Home</button></Link>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    background:  #f4f4f4;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;

    .box{
        background: #fff;
        padding: 40px;
        text-align: center;
        border-radius: 10px;
        max-width: 500px;
        flex: 0 0 500px;
    }
    svg{
        font-size: 50px;
        color: #23d523;
    }
    h2{
        font-size: 2.5rem;
        font-weight: 600;
        margin: 20px 0;
    }

`

export default Success