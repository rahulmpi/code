import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartTotalItems } from "../store/slices/CartSlice";
import { AiOutlineUser } from "react-icons/ai";
import {  signOut } from "firebase/auth";
import { auth } from "../firebase";

const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {total_item, cart} = useSelector((state) => state.Cart)

  useEffect(() =>{
    dispatch(cartTotalItems())
},[cart])

const handleLogout = () => {               
  signOut(auth).then(() => {
    localStorage.removeItem('token')
      navigate("/");
      console.log("Signed out successfully")
      
  }).catch((error) => {
  console.log(error)
  });
}

  const Nav = styled.nav`

  .navbar {
    display: flex;
    gap: 50px;
}
.user_menu{
    position: relative;

  svg {
  font-size: 30px;
  }

.drop-down {
  position: absolute;
  right: 0;
  font-size: 16px;
  display: none;
  box-shadow: 0 10px 10px #0002;
  background: #fff;
  padding: 15px 25px;

  ul{
    margin-top: 10px;
    border-top: 1px solid #f4f4f4;
    padding-top: 10px;

   li{
    cursor: pointer;
    color: #000;

    a{
      color: #000;
    }
   }
  }
}
&:hover .drop-down{
  display: block;
}
}
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  const {email} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ''

  return (
    <Nav>
      <div className="navbar">
        <ul className="navbar-lists">
          <li>
            <Link
              to="/"
              className="navbar-link "
              >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="navbar-link "
              >
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="navbar-link cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item}</span>
            </Link>
          </li>
        </ul>
        <div className="user_menu">
        <AiOutlineUser />
        <div className="drop-down">
         {email && <p>Hello <br/>
          <b>{email}</b></p>
  }
        <ul>
         {email && <li onClick={handleLogout}>Logout</li> }
          {!email && <li><Link to="/login">Login</Link></li> }
        </ul>
        </div>
      </div>
      </div>
    </Nav>
  );
};

export default Nav;
