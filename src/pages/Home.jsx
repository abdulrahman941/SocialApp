import React, { useContext } from 'react'
import {useEffect,useState} from 'react'
import PostCard from '../Card/PostCard.jsx'
import getAllPosts from '../auth/services/postapi'
import Spinner from '../Spinner/Spinner.jsx'
import CreatePost from  "../component/CreatePost/CreatePost.jsx"
import { lightLayout } from '@heroui/react'







export default function Home() {
  //get all post
  const [allPosts, setallPosts] = useState([])

 async function getPosts(){
    const response = await getAllPosts()
     if(response.message=='success'){
      setallPosts(response.posts)
      console.log(response.posts)
     }

  }

 
  useEffect(()=>{
   getPosts()
   
   },[])


return <>
 <title>Home Feed | Route Social</title>
      <meta
        name="description"
        content="Explore your feed to see the latest posts from people you follow. Stay connected with your community on Route Social."
      />
      <meta name="keywords" content="Social Media, Route Academy, Project" />
 <div className="bg-gray-300">
  <CreatePost callback={getPosts}/>
   {/* display post */}
  {allPosts.length>0? allPosts.map((post)=>{return <PostCard callback={getPosts} allComment={false} post={post} key={post.id}/>}):<Spinner/>}    
  
 </div>


  </>
  
}
  
    



