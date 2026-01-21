import React from 'react'
import { Button } from '@heroui/react';
import Error from '../../../src/assets/21.webp';
import { useNavigate } from 'react-router-dom';


export default function Notfound() {

const navigate = useNavigate()

  function GoLogin(){
    navigate("/")
  }
  return <>
  <title>Error | Route Social</title>
  <div className="container mx-auto">
    <div className="mx-auto text-center h-screen py-3 flex-col gap-4">
    <div className="flex justify-center align-items-center">
      <img src={Error} alt={Error} />
    </div>
    <div className="">
     <h2>Page Not Found</h2>
    <p>The page you’re looking for doesn’t exist or has been moved.</p>
    <Button onPress={GoLogin} className="bg-sky-600 my-2">go to LOGINPAGE</Button>
    </div>
    </div>
  </div>
  </>
}
