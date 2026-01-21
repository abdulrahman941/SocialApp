import React from 'react'
import Post from '../../Card/PostCard.jsx'
import UserImage from '../../assets/userimage.avif'
import CommentDropDown from '../PostDropDown/CommentDropDown.jsx'
import {AuthContext} from '../../Context/AuthContext.jsx'
import {useContext} from 'react';




export default function CommentCard({comment,id,callback}) {         //comment from postcard   all(from postcard)

const {userData} = useContext(AuthContext)



  return <>
  <div className="bg-white w-11/12 mx-auto rounded-md shadow-md h-auto py-3 px-3 mb-2">
  <div className="border border-gray-300 my-2 rounded-md flex justify-center items-center p-3 gap-3">
          <div className="flex mt-2 gap-3">
            <img onError={(e)=>{e.target.src=UserImage}} className="rounded-full w-10 h-10 object-cover shadow-sm" src={comment?.commentCreator.photo}/>
             <div className="flex flex-col">
               <div className="flex flex-col flex-1">
             <h3 className="text-sm text-gray-800 font-bold">{comment?.commentCreator.name}</h3>
              <p className="text-xs text-gray-500">{comment?.createdAt.split('.').slice(0,1).join(' ').replace('T',' ')}</p>
             </div>
               <div className="text-gray-700 text-sm mt-1">
            <p>{comment?.content}</p>
            </div>
             </div>
            </div>
           <div className="ml-auto">

             {(comment?.commentCreator._id==userData?._id) && (<CommentDropDown callback={callback} CommentId={comment._id}/>)}
             {/* {console.log("Full Comment Data:", comment)}
             {console.log("Comment ID:", comment._id || comment.id)}
             */}
            
             {/* {console.log("Creator:", comment?.commentCreator._id)}
              {console.log("User:", userData?._id)}
              {console.log("Page ID:", id)}
               */}
           </div>
          </div>
          </div>
  </>
    


  
}



          
