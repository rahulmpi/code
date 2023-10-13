import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddProductReviews } from "../store/slices/AppSlice";
import { useParams } from "react-router-dom";
import { realdb } from "../firebase";
import { ref, push, update } from 'firebase/database';

const ReviewForm = ({data}) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [value, setValue] = useState({
        userName: data ? data.userName : '',
        rating: data ? data.rating : '',
        review: data ? data.review : '',
    })


    const [msg, setMsg] = useState('')
    const handleChange = (e) =>{
      let {name, value} = e.target;
      setValue((prev) =>({
        ...prev,
        [name] : value
      }))
    }

    const {rating, userName, review} = value

    const handleAdd = async(e) =>{
      e.preventDefault()
     const data = {
                userName,
                rating,
                review,
                productId: id,
             }

             try {
               await push(ref(realdb, 'reviews'), data);
               setMsg('Data was successfully set.')
               setValue({
                name: '',
                rating:  '',
                review: '',
               })
             } catch (error) {
               setMsg('Error setting data:', error)
             }
    }

    const handleUpdate = async(e) =>{ 
      e.preventDefault()
      update(ref(realdb, `reviews/${data.id}`), value)
      .then(() => {
        setMsg('Data updated successfully')
        setValue({
          name: '',
          rating:  '',
          review: '',
         })
      })
      .catch((error) => {
        console.error('Error updating data:', error);
  });
    }

    // const handleAdd = (e) =>{
    //      e.preventDefault()
    //      dispatch(AddProductReviews(data)).unwrap()
    //      .then(() => {
    //         setMsg('Your form has been submitted')
    //         setTimeout(() =>{
    //            handleClose()
    //         }, 1000)
    //      })
    //      .catch(() => {
    //        setMsg('Error while submitting')
    //      });
    // }


  return (
        <form>
            <h3>Write a Review</h3>
            <br/>
            <div className='row'>
            <div className='form-group md-12'>
                <label>Name</label>
                <input type="text" name="userName" value={userName} className='form-control' onChange={handleChange}/>
            </div>
            <div className='form-group md-12'>
                <label>Rating</label>
                <div className="star_icon"> 
                {Array.from({length: 5}, (_, index) =>{
                    return <label key={index}><input type="radio" name="rating" value={5 - index} onChange={handleChange}/>{ 5 - index <= rating ? <FaStar/>: <AiOutlineStar/>}</label>
                })}
                </div>
                
            </div>
            <div className='form-group md-12'>
            <label>Comments</label>
                <textarea name="review" value={review} className='form-control' onChange={handleChange}/>
            </div>
            <div className="md-12">
                
                {data ? <button className="btn" onClick={handleUpdate}>Update</button> : <button className="btn" onClick={handleAdd}>Submit</button>}
                <br/>
                {msg && <p>{msg}</p>}
            </div>
           
            </div>
        </form>
  )
}

export default ReviewForm