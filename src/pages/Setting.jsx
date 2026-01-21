import React, { useContext, useRef } from 'react'
import { Input } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import { tokenContext } from '../Context/tokenContext'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';



export default function Setting() {

  const newPassword = useRef(null)
  const password = useRef(null)
  const { token,setToken} = useContext(tokenContext)

  async function changePass() {
    return await axios.request({
      method: 'PATCH',
      url: `https://linked-posts.routemisr.com/users/change-password`,
      headers: {
        token, // تأكد أن السيرفر يتوقع 'token' وليس 'Authorization'
      },
      data: {
        password: password.current.value,
        newPassword: newPassword.current.value,
      }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: changePass,
    onSuccess: (res) => {
      console.log("Success:", res);
      alert("Password changed successfully!")
      toast.success("Password changed successfully!")
      setToken(res.data.Data.token)
    },
    onError: (err) => {
    console.log(err)
    toast.error("current password is incorrect")
    
    
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (<>
  <title>Settings | Route Social</title>
      <meta
        name="description"
        content="Manage your account settings, privacy, and preferences on Route Social. Take control of your experience."
      />
    <div className="container mx-auto">
        <div className="bg-gray-100">
      <div className="p-8 m-auto bg-white shadow-xl rounded-2xl">
        <h2 className='text-2xl my-4 font-bold text-sky-700 text-center'>Change Password</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <Input icon={faEye} ref={password} label="Current Password" type="password" variant="bordered" isRequired/>
            <Input icon={faEye} ref={newPassword} label="New Password" type="password" variant="bordered"isRequired/>
          </div>

          <button type="submit" disabled={isPending} className={`w-full my-6 py-2 rounded-xl text-white font-semibold transition-all ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 shadow-lg'}`}>{isPending ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
    </div>
    </>

  );
}

         