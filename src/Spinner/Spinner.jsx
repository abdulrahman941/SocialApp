import React from 'react'
import { BallTriangle } from 'react-loader-spinner'


export default function Spinner() {
  return <>
  
   <div className='vh-100 flex justify-center items-center'>
render(<BallTriangle
height={100}
width={100}
radius={5}
color="blue"
ariaLabel="ball-triangle-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}/>

    </div>
  
  
  </>
   
  
}
