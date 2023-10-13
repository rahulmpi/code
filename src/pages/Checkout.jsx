import React, { useState } from 'react'
import TotalBox from '../components/TotalBox'
import styled from 'styled-components'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '../Config/Config';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderDetails, clearCart } from '../store/slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {total_price, shipping_fee, cart} = useSelector((state) => state.Cart)
    const [formData, setFormData] = useState({
        fname: '',
        lname:'',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    })

    let cartItemTitle = cart.map((elem) => elem.name)

    const {fname,lname,address1,address2,city,state,country, zip} = formData

    const inrAmount = (total_price + shipping_fee) / 100
    const INR_TO_USD_EXCHANGE_RATE = 0.012; 
    const usdAmount = inrAmount * INR_TO_USD_EXCHANGE_RATE;

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData((prev) =>({
            ...prev,
            [name] : value
          }))
    }

      // creates a paypal order
      const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: cartItemTitle.toString(),
                    amount: {
                        currency_code: 'USD',
                        value:  usdAmount.toFixed(2),
                    },
                },
            ],
        }).then((orderID) => {
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            dispatch(setOrderDetails(details))
            
            setTimeout(() =>{
                navigate('/success')
                dispatch(clearCart())
            }, 1000)
            addDoc(collection(db, "payments"), {
                details  
              });
           
        });
    };


  return (
     <>
     <Wrapper>
     <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
        <div className='container'>
        <div className='row'>
        <div className='md-8'>
        <form>
            <h2>Shipping Address</h2>
            <div className='row'>
            <div className='form-group md-6'>
                <input type="text" name="fname" value={fname} placeholder='First name' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-6'>
                <input type="text" name="lname" value={lname} placeholder='Last name' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-12'>
                <input type="text" name="address1" value={address1} placeholder='Address Line 1' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-12'>
                <input type="text" name="address2" value={address2} placeholder='Address Line 2' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-6'>
                <input type="text" name="city" value={city} placeholder='City' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-6'>
                <input type="text" name="state" value={state}  placeholder='Province/State' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-6'>
                <input type="text" name="country" value={country} placeholder='Country' className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-6'>
                <input type="text" name="zip" value={zip} placeholder='Zip/Postal Code' className='form-control' onChange={handleChange}/>
            </div>
            </div>
        </form>
        </div>
        <div className='md-4'>
            <TotalBox />
            <br/>
            <PayPalButtons
           createOrder={createOrder}
          onApprove={onApprove}
        />
        </div>
        </div>
        </div>
        </PayPalScriptProvider>
        </Wrapper>
     </>
  )
}

const Wrapper = styled.section`
      padding: 9rem 0;

      h2{
        margin-bottom: 20px;
        font-size: 3rem;
        font-weight: 600;
      }
`

export default Checkout