import React, {useState} from 'react';
import {Input,Select,SelectItem,Button} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import schemaLogin from '../schema/schemaLogin'
import signin from '../services/loginApi'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';



export default function Login() {

let {setuserToken}=useContext(AuthContext)

   const navigate = useNavigate()

  const[apiError,setapiError]=useState(null)
  const[isLoading,setisLoading]=useState(false)

let {handleSubmit,register,formState:{errors,touchedFields}} =useForm({
  defaultValues:{
   
    email:"",
    password:"",
   
  },
  resolver:zodResolver(schemaLogin),
  mode:'onBlur',
  reValidateMode:'onBlur'
});

/*console.log(register("name"))*/

/*console.log(formState.errors.name?.message)*/

 async function submitForm(userData){
 setisLoading(true)
 const response = await signin(userData)
console.log('submit',userData)

if (response.message=='success'){
        //login=>token
        localStorage.setItem('token',response.token)
        setuserToken(response.token)
        navigate('/Home')
}
else{
  //error
     setapiError(response.error)
}
     setisLoading(false)
}


  return (<>
  <div className="container mx-auto bg-gray-300">
    <div className="bg-gray-200 min-h-screen text-center flex justify-center items-center">
    <div className="sm:w-full md:w-1/3 p-5 m-auto bg-white shadow rounded-2xl">
    <h2 className='text-2xl my-4 font-bold text-sky-700'>Login now</h2>
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-6">
     
      <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} {...register('email')} label="email" type="email" />
      <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message} {...register('password')} label="password" type="password" />
     
      </div>
      {apiError?<p className="text-red-500 py-2">{apiError}</p>:null}
      <Button isLoading={isLoading} type='submit' className='w-full my-4' color="primary" variant="shadow">
        Submit
      </Button>
      <p>Does not you have an account ? <Link className='text-sky-600' to='/Register'>sign up</Link></p>
    </form>
    </div>
  </div>
  </div>
  
  
  
  </>
    
  )
}
