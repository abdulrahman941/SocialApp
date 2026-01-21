import {useState,useEffect} from 'react';
import { createContext } from "react";
import { getLoggedUser } from '../auth/services/loginApi';
import { jwtDecode } from "jwt-decode";




export const AuthContext = createContext()

export function AuthContextProvider(props){

    const[userToken,setuserToken] = useState(null)
    const[userData,setuserData] = useState(null)
  

    

   async function getUser(){
    const response= await getLoggedUser()
    console.log(response);
    if(response.message=='success'){
      setuserData(response.user)
    }
    
   }
    useEffect(()=>{
    if (localStorage.getItem('token')!=null){
        setuserToken(localStorage.getItem('token'))
               getUser()
     }
    
    },[userToken])
  return <AuthContext.Provider value={{userToken,setuserToken,userData,setuserData}}>
    
{props.children}
  </AuthContext.Provider>
}