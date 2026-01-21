import React from 'react';
import {Navigate} from 'react-router-dom';

export default function ProtectRoutes({children}) {

   if(localStorage.getItem('token')!= null ){
    //leh token
     return children
   }else{
    //login
     return <Navigate to='/'/>
   }


    
}
  
