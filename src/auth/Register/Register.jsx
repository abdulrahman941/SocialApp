import React, {useState} from 'react';
import {Input,Select,SelectItem,Button} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import schemaRegister from '../schema/schemaRegister'
import signup from '../../auth/services/RegisterApi'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';



export default function Register() {

   const navigate = useNavigate()

  const[apiError,setapiError]=useState(null)
  const[isLoading,setisLoading]=useState(false)

let {handleSubmit,register,formState:{errors,touchedFields}} =useForm({
  defaultValues:{
    name: "",
    email:"",
    password:"",
    repassword:"",
    dateOfBirth:"",
    gender:""
  },
  resolver:zodResolver(schemaRegister),
  mode:'onBlur',
  reValidateMode:'onBlur'
});

/*console.log(register("name"))*/

/*console.log(formState.errors.name?.message)*/

 async function submitForm(UserData){
 setisLoading(true)
 const response = await signup(UserData)
console.log('submit',UserData)

if (response.message==='success'){
        //login=>token
        navigate('/')
}
else{
  //error
     setapiError(response.error)
}
setisLoading(false)
}


  return <>
 <div className="container mx-auto bg-gray-300">
   <div className="bg-gray-200 min-h-screen text-center flex justify-center items-center">
    <div className="sm:w-full md:w-1/3 p-5 m-auto bg-white shadow rounded-2xl">
    <h2 className='text-2xl my-4 font-bold text-sky-700'>Register now</h2>
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-6">
      <Input isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message} {...register('name',{
        required:'name is required',
        minLength:{
          value:3,
          message:'name min 3 char'
        },
        maxLength:{
          value:25,
          message:'name max 25 char'
        },
        pattern:{
         value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
         message: 'Only letters and single spaces allowed'

        }
        
      })} label="name" type="text" />
      {/*<p className='text-red-400 bg-amber-500'>{errors.name?.message}</p>*/}
      <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} {...register('email',{
        required:'email is required',
        pattern:{
          value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message:'email is invalid'
        }
      })} label="email" type="email" />
      {/*<p className='text-red-400 bg-amber-500'>{errors.email?.message}</p>*/}
      <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message} {...register('password')} label="password" type="password" />
      <Input isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} errorMessage={errors.rePassword?.message} {...register('rePassword')} label="repassword" type="password" />
      <div className="flex gap-3">
      <Input isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} {...register('dateOfBirth')} label="date of birth" type="date" />
      <Select isInvalid={Boolean(errors.gender && touchedFields.gender)} errorMessage={errors.gender?.message} {...register('gender')} className="max-w-xs" label="Select a gender">
      <SelectItem key={'male'}>Male</SelectItem>
      <SelectItem key={'female'}>female</SelectItem>
      </Select>
      </div>
      </div>
      {apiError?<p className="text-red-500 py-2">{apiError}</p>:null}
      <Button isLoading={isLoading} type='submit' className='w-full my-4' color="primary" variant="shadow">
        Submit
      </Button>
      <p>Do you have an account ? <Link className='text-sky-600' to='/'>sign in</Link></p>
    </form>
    </div>
  </div>
 </div>
  
  
  
  </>
    
  
}
