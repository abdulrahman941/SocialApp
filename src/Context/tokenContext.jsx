import { jwtDecode } from 'jwt-decode'
import React, { createContext,useState, useEffect } from 'react'




//object context kolo
export const tokenContext = createContext(null)


export default function TokenContextProvider({children}) {
 const[token,setToken]= useState(localStorage.getItem('token')) //null
 const[userId,setUserId]=useState(null)

   


useEffect(()=>{
  if(token){
 const {user}= jwtDecode(token)
 console.log(user)
 
 setUserId(user)
  }
},[token])

  return <>
  <tokenContext.Provider value={{token,setToken,userId}}>  
    {console.log(userId)}
      
    {children}
  </tokenContext.Provider>
  
  
  </>
    
  
}
