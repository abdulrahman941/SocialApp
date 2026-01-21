import React from 'react'
import { Button } from '@heroui/react';

export default function Notfound() {

  function GoHome(){
    window.location.href="/Home"
  }
  return <>
  <title>Error | Route Social</title>
  <div className="container mx-auto">
    <div className="mx-auto text-center h-screen py-3 flex-col gap-4">
    <div className="flex justify-center align-items-center">
      <img src="src/assets/21.webp" alt="Error" />
    </div>
    <div className="">
     <h2>Page Not Found</h2>
    <p>The page you’re looking for doesn’t exist or has been moved.</p>
    <Button onPress={GoHome} className="bg-sky-600 my-2">go to HOMEPAGE</Button>
    </div>
    </div>
  </div>
  </>
}
