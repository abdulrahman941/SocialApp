import React from 'react'
import {useState} from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import {Modal,ModalContent,ModalHeader,ModalBody,ModalFooter,useDisclosure,} from "@heroui/react";
import Spinner from '../../Spinner/Spinner.jsx';
import { deleteMyPost, updateMyPost } from '../../auth/services/postapi';

export default function PostDropDown({postId,callback}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
     const [PostBody, setPostBody] = useState('')
      const [image, setImage] = useState('')
      const [isLoading, setisLoading] = useState(false)
      const [ImageURL, setImageURL] = useState('')
    
       async function deletePost(){
             setisLoading(true)
            console.log(postId);
             const response = await deleteMyPost(postId)
             console.log(postId);
             
             console.log(response);
             if(response.message=="success"){
               await callback()   // call getposts Home => rerender
             }
               setisLoading(false)
          }
      async function UpdatePost(e){
          setisLoading(true)
          e.preventDefault()
          console.log('add',PostBody,image);
          const formData=new FormData()
          formData.append('body',PostBody??'')
          if(image){
            formData.append('image',image)
          }
          const response= await updateMyPost(formData,postId)
          console.log(response);
          if(response.message=='success'){
             await callback()
            setPostBody('')
            setImageURL('')
          }
            setisLoading(false)
    
      }
      function handleImg(e){
        console.log('change');
        
        // console.log(e.target.files[0]);
        setImage(e.target.files[0])
        // console.log(URL.createObjectURL(e.target.files[0]))
        setImageURL(URL.createObjectURL(e.target.files[0]))
        e.target.value=''
      }

  return <>
  <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">...</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">
           <Button  className="bg-white border-0" onPress={onOpen}>Edit Post</Button>
        </DropdownItem>
        <DropdownItem onClick={deletePost} key="delete" textValue="delete post"className="text-danger" color="danger">
          {isLoading?<Spinner size="sm"/>:" Delete post"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>





{/* model for updatepost: */}

    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">UpdatePost</ModalHeader>
              <ModalBody>
                 <form onSubmit={UpdatePost}>
                     <div className="editor py-5 mt-5 bg-gray-50 mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl">
                      <h2 className="text-xl text-center font-bold my-4">post</h2>
                
                  <input value={PostBody} onChange={(e)=>{setPostBody(e.target.value)}}className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Add your post" type="text" />
                  {/* icons */}
                  {ImageURL && <div className="relative">
                    <img className="w-full" src={ImageURL} alt="PostImg" />
                   <svg onClick={()=>{setImageURL("")}}xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-4 end-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                
                
                  </div>}
                  <input onChange={handleImg} id={postId} type='file' className="hidden"/>
                  <div className="icons flex text-gray-500 m-2">
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <label htmlFor={postId}>  
                        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                </label>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                  </div>
                  {/* buttons */}
                  <div className="buttons flex justify-end">
                    <Button isLoading={isLoading}  type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</Button>
                  </div>
                </div>
                  </form>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  </>
  
  }
