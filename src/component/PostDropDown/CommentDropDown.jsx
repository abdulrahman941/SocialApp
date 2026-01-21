import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { deleteMyComment } from '../../auth/services/commentApi.js';
import Spinner from '../../Spinner/Spinner.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyComment } from '../../auth/services/commentApi.js';
import toast from 'react-hot-toast';

export default function CommentDropDown({callback,CommentId}) {
       const {isOpen, onOpen, onOpenChange} = useDisclosure();
       const [isLoading, setisLoading] = useState(false)
       const queryClient = useQueryClient()
       const [content, setcontent] = useState("")

      
          

    async function deleteComment(){
       setisLoading(true)
      console.log(CommentId);
       const response = await deleteMyComment(CommentId)
       console.log(CommentId);
       
       console.log(response);
       if(response.message=="success"){
         await callback()   
       }
         setisLoading(false)
    }

// update comment

const{data, isPending:loading, mutate}=useMutation({
  mutationKey:['Update comment'],
  mutationFn:({content,CommentId})=>updateMyComment(content,CommentId),
  onSuccess:(res)=>{
    console.log(res)
    
    toast.success("Comment updated Successfully")
    setcontent('')
    queryClient.invalidateQueries(['comments']) // تحديث القائمة
    callback()
    onOpenChange(false) // إغلاق المودال
  },
  onError:(error)=>{
    console.log(error)
    
    toast.error(error.response?.data?.message||"update failed")
  },
})

const handleUpdate = (e)=>{
  e.preventDefault()
  if (!content.trim()) return toast.error("Please enter a comment")
  mutate({content,CommentId})
}
  
  return <> 
  <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">...</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className="bg-white border-0" onClick={onOpen} key="edit" textValue="EditComment">
          Edit comment
        </DropdownItem>
        <DropdownItem  onClick={deleteComment} key="delete" textValue="DeleteComment" className="text-danger" color="danger">
           {isLoading?<Spinner size="sm"/>:" Delete comment"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
 
 {/* model for updatecomment: */}
 
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
         <ModalContent>
           {(onClose) => (
             <>
               <ModalHeader className="flex flex-col gap-1">Update Comment</ModalHeader>
               <ModalBody>
                      <form onSubmit={handleUpdate}>
                      <div className="editor py-5 mt-5 bg-gray-50 mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-4xl">
                       <h2 className="text-xl text-center font-bold my-4">Post</h2>
                 
                   <input value={content} onChange={(e) => { setcontent(e.target.value) }} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Update your comment" type="text" />
                  
                  
                   {/* buttons */}
                   <div className="buttons flex justify-end">
                     <Button disabled={loading} type="submit" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"> {loading ? "Updating..." : "Update"}</Button>
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
