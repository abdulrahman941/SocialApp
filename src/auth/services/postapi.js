import axios from 'axios';

export default async function getAllPosts(){
   try {
     let {data}= await axios.get('https://linked-posts.routemisr.com/posts',{
        headers:{
            token:localStorage.getItem('token')
        },
        params:{
            limit:15,
            sort:'-createdAt'
        }
    })

    return data
   } catch (error) {
    
    return (error)
   }
}

//post Details or get single post

export  async function getSinglePost(id){
   try {
     let {data}= await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token:localStorage.getItem('token')
        }
    })

    return data
   } catch (error) {
    
    return (error)
   }
}




// create post

export  async function createMyPost(formData){
   try {
     let {data}= await axios.post('https://linked-posts.routemisr.com/posts',formData,{
        headers:{
            token:localStorage.getItem('token')
        }
    })

    return data
   } catch (error) {
    
    return (error)
   }
}










// Update post

export  async function updateMyPost(formData,postId){
   try {
     let {data}= await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,formData,{
        headers:{
            token:localStorage.getItem('token')
        }
    })

    return data
   } catch (error) {

    return (error)
   }
}




export  async function deleteMyPost(id){
   try {
     const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,{

        headers:{
            token:localStorage.getItem("token"),
     },
       
    })

    return data
   } catch (error) {
    
    return (error)
   }
}


// //get user post 

// export  async function getUserPosts(){
//    try {
//      let {data}= await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=2`,{
//         headers:{
//             token:localStorage.getItem('token')
//         },
//         params:{
//             limit:2,
//             sort:'-createdAt'
//         }
//     })

//     return data
//    } catch (error) {
    
//     return (error)
//    }
// }
