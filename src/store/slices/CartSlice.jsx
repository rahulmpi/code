import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    total_price: '',
    total_item: '',
    shipping_fee: 50000,
    order_details: {},
}

const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart : (state, action) =>{
           const {id, amount, color, product} = action.payload

           const existItem = state.cart.find((elem) => elem.id === id + color)

           if(existItem){
              let updatedCart = state.cart.map((elem) =>{
                if(elem.id === id + color){
                    let newAmount = elem.amount + amount

                    if(newAmount >= elem.max){
                        newAmount = elem.max
                    }

                    return {
                        ...elem, 
                        amount: newAmount
                    }
                }
                else{
                    return elem
                }
              })
              state.cart = updatedCart
           }
           else{
              state.cart = [...state.cart, {
                id: id + color,
                image: product.image[0].url,
                max: product.stock,
                price: product.price,
                name: product.name,
                amount,
                color
              }]
           }
        },
        increaseAmount : (state, action) =>{
           let updatedCart = state.cart.map((elem) =>{
              if(elem.id === action.payload){
                 let newAmount = elem.amount + 1

                 if(elem.amount >= elem.max){
                    newAmount = elem.max
                 }
                 return{
                    ...elem,
                    amount: newAmount
                 }
              }
              else{
                 return elem
              }
           })
           state.cart = updatedCart
        },
        decreaseAmount : (state, action) =>{
            let updatedCart = state.cart.map((elem) =>{
                if(elem.id === action.payload){
                   let newAmount = elem.amount - 1
  
                   if(elem.amount <= 1){
                      newAmount = 1
                   }
                   return{
                      ...elem,
                      amount: newAmount
                   }
                }
                else{
                   return elem
                }
             })
             state.cart = updatedCart
        },
        removeItem : (state, action) =>{
           let updatedCart = state.cart.filter((elem) => elem.id !== action.payload)
           state.cart = updatedCart
        },
        clearCart: (state) =>{
            state.cart = []
        },
        cartTotal: (state) =>{
            let cartTotal = state.cart.reduce((acc, elem) => acc + elem.amount * elem.price, 0)
            state.total_price = cartTotal
        },
        cartTotalItems: (state) =>{
            let cartItems = state.cart.reduce((acc, elem) => acc + elem.amount, 0)
            state.total_item = cartItems
        },
        setOrderDetails: (state, action) =>{
         state.order_details = action.payload
        },
        removeOrderDetails: (state) =>{
         state.order_details = {}
        }
    }
})

export const {addToCart, increaseAmount, decreaseAmount, removeItem, clearCart, cartTotal, cartTotalItems, setOrderDetails, removeOrderDetails} = CartSlice.actions
export const CartReducer = CartSlice.reducer