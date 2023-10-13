import React, { useState } from 'react'
import Stars from './Stars'
import { ref, remove } from 'firebase/database';
import { realdb } from '../firebase';
import Modal from './Modal';
import ReviewForm from './ReviewForm';

const SingleReview = ({rating, userName, review, id}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);

  const handleDelete = async () =>{
    remove(ref(realdb, `reviews/${id}`))
      .then(() => {
        console.log('Data deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
}

const handleEdit = () =>{
  setShow(true)
}

  return (
    <div className='single_review'>
       <p><b>{userName}</b></p>
    <Stars stars={rating}/>
    <p>{review}</p>
    <br/>
    <div className="actions">
    <p onClick={handleEdit}>Edit</p>
    <p className="delete" onClick={handleDelete}>Delete</p>
    </div>
   
    <Modal show={show} onHide={handleClose}>
         <ReviewForm data={{rating, userName, review, id}}/>
    </Modal>
 </div>

    
  )
}

export default SingleReview