import React from 'react'
import {useState} from 'react'
import {createMyPost} from '../../auth/services/postapi'
import {Button, Input} from '@heroui/react'

export default function CreatePost({callback}) {
  const [PostBody, setPostBody] = useState('')
  const [image, setImage] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [ImageURL, setImageURL] = useState('')


  async function addPost(e){
      setisLoading(true)
      e.preventDefault()
      console.log('add',PostBody);
      const formData=new FormData()
      formData.append('body',PostBody??'')
      if(image){
        formData.append('image',image)
      }
      const response= await createMyPost(formData)
      console.log(response);
      if(response.message=='success'){
         await callback()
        setPostBody('')
        setImageURL('')
      }
        setisLoading(false)

  }
  function handleImg(e){
    // console.log(e.target.files[0]);
    setImage(e.target.files[0])
    // console.log(URL.createObjectURL(e.target.files[0]))
    setImageURL(URL.createObjectURL(e.target.files[0]))
    e.target.value=''
  }
  return <>
  <div className="w-full mx-auto">
    <form onSubmit={addPost}>
     <div className="editor py-5 mt-5 bg-gray-50 mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl">
      <h2 className="text-xl font-bold my-4">Create a new Post</h2>

  <input value={PostBody} onChange={(e)=>{setPostBody(e.target.value)}}className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="what is on your mind?" type="text" />
  {/* icons */}
  {ImageURL && <div className="relative">
    <img className="w-full" src={ImageURL} alt="PostImg" />
   <svg onClick={()=>{setImageURL("")}}xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


  </div>}
  <input onChange={handleImg} id="postImg" type='file' className="hidden"/>
  <div className="icons flex text-gray-500 m-2">
    <label htmlFor="postImg">
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
</label>
    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
  </div>
  {/* buttons */}
  <div className="buttons flex justify-end">
    <Button isLoading={isLoading} type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</Button>
  </div>
</div>
  </form>
  </div>

  
  
  </>
    
  
}






