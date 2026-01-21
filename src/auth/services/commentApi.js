import axios from 'axios';
import { data } from 'react-router-dom';

export default async function createMyComment(content,id){
   try {
     const {data} = await axios.post('https://linked-posts.routemisr.com/comments',
        
        {
            content:content,
            post:id,
        },
    {
        headers:{
            token:localStorage.getItem("token"),
     },
       
    })

    return data
   } catch (error) {
    
    return (error)
   }
}




export  async function deleteMyComment(CommentId){
   try {
     const {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/${CommentId}`,{

        headers:{
            token:localStorage.getItem("token"),
     },
       
    })

    return data
   } catch (error) {
    
    return (error)
   }
}




// Update comment

export function updateMyComment(content,CommentId){
  return axios.put(`https://linked-posts.routemisr.com/comments/${CommentId}`,        
        {
         "content":content,
        }, 
        {
        headers:{
            token:localStorage.getItem('token')
        }


    })


   
}






//  gets comment api

export  async function getCommentsApi(postId){
   try {
     let {data}= await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,{

        headers:{
            token:localStorage.getItem('token')
        }


    })

    return data
   } catch (error) {

    return (error)
   }
}