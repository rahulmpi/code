import React from "react";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import FormatPrice from "../helpers/FormatPrice";
import { useDispatch } from "react-redux";
import { increaseAmount, decreaseAmount, removeItem } from "../store/slices/CartSlice";


const CartItem = ({image, name, price, amount, id, color}) => {
  const dispatch = useDispatch()

  const setDecrease = (id) =>{
    dispatch(decreaseAmount(id))
  }
  const setIncrease = () =>{
    dispatch(increaseAmount(id))
  }

  const removeItems = (id) =>{
    dispatch(removeItem(id))
  }

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
      amount={amount}
      setDecrease={() =>setDecrease(id)}
      setIncrease={() =>setIncrease(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItems(id)}/>
      </div>
    </div>
  );
};

export default CartItem;
