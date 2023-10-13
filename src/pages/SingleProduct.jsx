import React, { useEffect, useState, useMemo } from 'react'
import { getSingleProduct, getSingleProductReview , getSingleProductReviews} from '../store/slices/AppSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import FormatPrice from '../helpers/FormatPrice';
import MyImage from '../components/MyImage';
import Stars from '../components/Stars';
import AddToCart from '../components/AddToCart';
import Product from '../components/Product';
import ReviewsList from '../components/ReviewsList';
import Modal from '../components/Modal';
import ReviewForm from '../components/ReviewForm';
import { realdb } from "../firebase";
import { ref, query, orderByChild, equalTo, onValue } from "firebase/database";

const SingleProduct = () => {
  const dispatch = useDispatch()
  const {singleProduct, isSingleLoading, singleProductReview} = useSelector((state) => state.App)
  const { all_products} = useSelector((state) => state.Filter)
  const API = "https://api.pujakaitem.com/api/products";
  const {id} = useParams()

  const {
    id: alias,
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() =>{
    dispatch(getSingleProduct(`${API}?id=${id}`))
    //dispatch(getSingleProductReviews(id))

   const dataRef = ref(realdb, 'reviews');

   const queryRef = query(dataRef, orderByChild('productId'), equalTo(id));

   onValue(queryRef, (snapshot) => {
     const data = {...snapshot.val()};

     const newData = Object.keys(data).map((key) => ({
      id: key,
      ...data[key]
    }));

    dispatch(getSingleProductReview(data ? newData : []))
   });

  },[id])

  const relatedProducts =  useMemo(() => all_products.filter((elem) => elem.category === category && elem.id !== id), [all_products, category, id])

  const allRating = useMemo(() => singleProductReview.reduce((acc, elem) => (acc + parseInt(elem.rating)), 0), [singleProductReview]);
  const averageRating = useMemo(() => allRating / singleProductReview.length, [allRating, singleProductReview]);

  const calculateRatingPercentages = (singleProductReview) => {
    const ratingPercentages = singleProductReview.reduce((result, review) => {
      const rating = review.rating;
      result[rating] = (result[rating] || 0) + 1;
      return result;
    }, {});
  
    for (const rating in ratingPercentages) {
      const percentage = (ratingPercentages[rating] / singleProductReview.length) * 100;
      ratingPercentages[rating] = percentage.toFixed(0);
    }
  
    return ratingPercentages;
  };


  const ratingPercentages = useMemo(() => calculateRatingPercentages(singleProductReview), [singleProductReview]);

  if(isSingleLoading){
    return <p>Loading...</p>
  }
  if (!singleProduct) {
    return <p>Product not found.</p>;
  }

  return (
    <>
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={image} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>
            {singleProductReview.length > 0 && <Stars stars={averageRating} reviews={singleProductReview.length} /> }

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </div>
    </Wrapper>
    <Wrapper>
      <div className="related">
      <div className="container">
        <div className="common-heading">Related Products</div>
        <div className="grid grid-three-column">
          {relatedProducts.map((curElem) => {
            return <Product key={curElem.id} {...curElem} />;
          })}
        </div>
      </div>
      </div>
    </Wrapper>
    {singleProductReview && <Wrapper>
      <div className="container">
      <div className="common-heading">Products Reviews</div>
        <div className='row'>
          <div className="md-4">
          <div className='review_per'>
                  <p>5 Star</p>
                  <div className='progress'><div className='progress_per' style={{width: ratingPercentages[5] ? ratingPercentages[5] + '%': '0%'}}></div></div>
                  <p>{ratingPercentages[5] ? ratingPercentages[5]: '0'}%</p>
          </div>
          <div className='review_per'>
                  <p>4 Star</p>
                  <div className='progress'><div className='progress_per' style={{width: ratingPercentages[4] ? ratingPercentages[4] + '%': '0%'}}></div></div>
                  <p>{ratingPercentages[4] ? ratingPercentages[4]: '0'}%</p>
          </div>
          <div className='review_per'>
                  <p>3 Star</p>
                  <div className='progress'><div className='progress_per' style={{width: ratingPercentages[3] ? ratingPercentages[3] + '%': '0%'}}></div></div>
                  <p>{ratingPercentages[3] ? ratingPercentages[3]: '0'}%</p>
          </div>
          <div className='review_per'>
                  <p>2 Star</p>
                  <div className='progress'><div className='progress_per' style={{width: ratingPercentages[2] ? ratingPercentages[2] + '%': '0%'}}></div></div>
                  <p>{ratingPercentages[2] ? ratingPercentages[2]: '0'}%</p>
          </div>
          <div className='review_per'>
                  <p>1 Star</p>
                  <div className='progress'><div className='progress_per' style={{width: ratingPercentages[1] ? ratingPercentages[1] + '%': '0%'}}></div></div>
                  <p>{ratingPercentages[1] ? ratingPercentages[1]: '0'}%</p>
          </div>
          <br/>
           <button className='btn' onClick={handleShow}>Write a Review</button>
           <Modal show={show} onHide={handleClose}>
             <ReviewForm/>
           </Modal>
          </div>
          <div className='md-8'>
          <ReviewsList/>
          </div>
        </div>
      
      </div>
    </Wrapper>
}
   </>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.related{
  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }
  }
}

  .card {
    background-color: #fff;
    border-radius: 1rem;

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }


  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
