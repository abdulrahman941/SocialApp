import React from 'react'
import CommentCard from './../component/CommentCard/CommentCard';
import {Link} from 'react-router-dom'
import { Input,Button } from '@heroui/react';
import {useState,useContext} from 'react'
import {AuthContext} from '../../src/Context/AuthContext'
import createMyComment from '../auth/services/commentApi';
import PostDropDown from '../component/PostDropDown/PostDropDown';
import Singlepost from './../pages/SinglePost';


export default function PostCard({post,allComment,callback}) {  //post props from home(getpost) - 
  const{userData} = useContext(AuthContext)
  
  const [CommentContent, setCommentContent] = useState()
  const [isLoading, setisLoading] = useState(false)

  async function createComment(e){

    setisLoading(true)
    e.preventDefault()
    console.log(CommentContent);
    
    const response =  await createMyComment(CommentContent,post.id)
    
        console.log(response)

    if(response.message=='success'){

       await callback()
      
    }

          setisLoading(false)

}


  return <>
   <div className="container mx-auto">
    <div className="w-full px-10 mx-auto bg-gray-300 flex flex-col">
    <div className="bg-white w-full mt-10 rounded-md mx-auto">
      <div className="bg-white w-full mx-auto rounded-md shadow-md h-auto py-3 my-5">
        <div className="w-full px-3 flex items-center justify-between">
          <div className="flex">
               <img className=" rounded-full w-10 h-10 mr-3" src={post.user.photo}/>
              <div className="">
                <h3 className="text-md font-semibold">{post.user.name}</h3>
              <p className="text-xs text-gray-500">{post.createdAt?.split('.').slice(0,1).join(' ').replace('T',' ')}</p>
              </div>
            </div>
            {userData._id==post.user._id && <PostDropDown callback={callback} postId={post.id}/>}
          </div>
       {/* <p>{post.id}</p> */}
        </div>
        <div className="border border-gray-300 mx-10 px-5 rounded-md shadow">
        {post.body&& <p>{post.body}</p>}
        {post.image &&<img className='w-full h-60 object-cover' src={post.image} alt={post.body} />}
        {/* <img src={post.image} alt={post.body} /> */}
        </div>
        <div className="h-8 mt-2 flex items-center mx-10 px-3">
          <div className="bg-blue-500 z-10 w-3 h-3 rounded-full flex items-center justify-center ">
            <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
          </div>
          <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
            <svg className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </div>
          <div className="w-full flex justify-between">
            <p className="ml-3 text-gray-500">8</p>
            <p className="ml-3 text-gray-500"><Link to={`/Singlepost/${post.id}`}> {post.comments.length}comment</Link></p>
          </div>
        </div>
       
        <div className="grid grid-cols-3 border-t-2 border-gray-400  bg-white pt-4 px-5 mx-10 my-3">
          <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
            <span className="font-semibold text-lg text-gray-500">Like</span></button>
          <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
            <span className="font-semibold text-lg text-gray-500">comment</span></button>
          <button className="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#838383" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={18} cy={5} r={3} /><circle cx={6} cy={12} r={3} /><circle cx={18} cy={19} r={3} /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            <span className="font-semibold text-lg text-gray-500">share</span></button>
        </div>
        <div className="bg-white py-2 pb-2 px-2 mx-10">
        <form onSubmit={createComment} className='flex gap-3'>
          <Input onChange={(e)=>{setCommentContent(e.target.value)}} placeholder='add your comment ...' variant='bordered'/>
          <Button isLoading={isLoading} type='submit' color='primary'>Add comment</Button>
        </form>
            </div>
{/* comments */}

             {post.comments.length>0 && allComment==false? <CommentCard id={post.comments[0]._id} comment={post.comments[0]} callback={callback}/>:post.comments.map((comment)=>{return <CommentCard key={comment?._id} comment={comment} callback={callback}/>})}
            {/* {console.log(comment)} */}


           {/* {post.comments.length>0? <CommentCard post={post}/>:null} */}
           {/* one comment */}
           {/* {<commentCard comment={post.comments[0]}/>}  */}
           {/* all comment */}
          {/* {post.comments.map((comment)=>{return <CommentCard comment={comment}/>})} */}
{/* home => one comment */}

{/* singlepost=> all comments */}

      </div>
    </div>
   </div>
  
  </>
}
