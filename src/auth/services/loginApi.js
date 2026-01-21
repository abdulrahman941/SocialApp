
//login

import axios from 'axios'; 

export default async function signin(userData){
try{
    const{data}= await axios.post('https://linked-posts.routemisr.com/users/signin',userData)
console.log(data)
return data
}catch(error){
    
     
    return error.response.data
    /*console.log(error.response.data)*/
    }
}



// Get logged User Data

export  async function getLoggedUser(userData){
try{
    const{data}= await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
        headers:{
            token:localStorage.getItem('token')
        }
    })
console.log(data)
return data
}catch(error){
    return error.response.data
    // console.log(error.response.data)
    }
}


