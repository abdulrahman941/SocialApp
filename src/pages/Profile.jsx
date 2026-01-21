import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../Context/tokenContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner.jsx'
import PostCard from '../Card/PostCard';
import CreatePost from './../component/CreatePost/CreatePost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {AuthContext} from '../Context/AuthContext'
import { deleteMyPost, updateMyPost } from '../auth/services/postapi';
import PostDropDown from '../component/PostDropDown/PostDropDown';
import { UploadProfilePhoto } from '../auth/services/user';
import { jwtDecode } from "jwt-decode";
import CommentCard from '../component/CommentCard/CommentCard';
import CommentDropDown from '../component/PostDropDown/CommentDropDown';

export default function Profile() {
  const { token ,userId} = useContext(tokenContext)
   const queryClient = useQueryClient();
   const{userData, setuserData}=useContext(AuthContext)
   const [isLoading, setisLoading] = useState(false)
   const [image, setImage] = useState(null)
   const [ImageURL, setImageURL] = useState('')
   console.log(token,userId);
   


// getUserPosts  call Api
 async function getUserPosts(userId,token){
  const options={
    method: 'GET',
    url:`https://linked-posts.routemisr.com/users/${userId}/posts?limit=35`,
    headers:{
       token,
    }
  }    
  const{data}= await axios.request(options); 
  return data;
 }




const {data,isPending:Loading,isError,refetch} = useQuery({
  queryKey:['user posts',userId],
  queryFn:()=> getUserPosts(userId,token),
  enabled:!!userId&&!!token
  
})

if(Loading){
  return <Spinner/>
}
if(isError){
  return <div>Error loading profile posts.</div>
}

console.log(data)

// update profile photo
async function updateUserPhoto(e){
        e.preventDefault()
        if(!image) return
        setisLoading(true)
        const formData = new FormData()
        formData.append('photo', image)
        try {
          const response = await UploadProfilePhoto(formData)
          console.log(response);
          if(response.message == 'success'){
            // Refresh user data to update the photo
            const { getLoggedUser } = await import('../auth/services/loginApi')
            const userResponse = await getLoggedUser()
            if(userResponse.message == 'success'){
              setuserData(userResponse.user)
            }
            setImage(null)
            setImageURL('')
          }
        } catch (error) {
          console.error('Upload failed:', error)
        } finally {
          setisLoading(false)
        }
}
  function handleImg(e){
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setImageURL(URL.createObjectURL(file))
    }
  }


  return <>
   
      <div className="">
        <div className="flex items-center border-b border-gray-300 pb-5 px-10 mt-10 relative">
           {/* TODO: Make title and description dynamic with user's data */}
      <title>Your Profile | Route Social</title>
      <meta name="description" content="View and manage your profile, posts, and connections on Route Social. Customize your presence in the community."/>
        <div className="relative">
          <img className="border border-gray-300 shadow-2xl shadow-gray-300 w-32 h-32 rounded-full" src={ImageURL || userData?.photo} alt=""/>
          <form onSubmit={updateUserPhoto} className="mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImg}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? 'Uploading...' : 'Upload Photo'}
              </button>
            )}
          </form>
        </div>
        <div className="flex flex-col ml-6">
        <p>{userData?.name}</p>
        <p>{userData?.email}</p>
        </div>
        </div>
        <h2 className='font-bold'>My Posts</h2>
       <div className="mt-6">
        <CreatePost callback={refetch}/>
        {data?.posts?.map((post)=> <PostCard callback={refetch} key={post.id} post={post} allComment={true}/>)}
        
   </div> 
   </div>
</>

} 
