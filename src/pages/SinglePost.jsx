import React, { useContext } from 'react'
import { getSinglePost} from '../auth/services/postapi'
import { useParams } from 'react-router-dom'
import {useEffect,useState} from 'react'
import Spinner from '../Spinner/Spinner.jsx';
import PostCard from '../Card/PostCard'
import CommentCard from '../component/CommentCard/CommentCard'
import { AuthContext } from '../Context/AuthContext';
import CommentDropDown from '../component/PostDropDown/CommentDropDown';



export default function Singlepost() {         
  let {id}=useParams()
  const [postDetails, setpostDetails] = useState(null)
  const {userData}=useContext(AuthContext)

  
  

  async function getPostDetails(){
    const response = await getSinglePost(id)
    console.log(response);
    if(response.message=="success"){
    
      setpostDetails(response.post)
    }
  }




  useEffect(()=>{
    getPostDetails(id)
  },[])
  return <>
  {postDetails?<PostCard callback={getPostDetails}allComment={true} post={postDetails}/>:<Spinner/>}
  


  </>
}
