import React from 'react'
import { useSelector } from 'react-redux'
import SingleReview from './SingleReview'

const ReviewsList = () => {
  const { singleProductReview} = useSelector((state) => state.App)
  return (
    singleProductReview.map((elem) =>{
        return(
            <SingleReview {...elem} key={elem.id}/>
        )
    })   
  )
}

export default ReviewsList