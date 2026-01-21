import axios from 'axios'; 

export default async function signup(userData){
try{
    const{data}= await axios.post('https://linked-posts.routemisr.com/users/signup',userData)
console.log(data)
return data
}catch(error){
    
     
    return error.response.data
    /*console.log(error.response.data)*/
    }
}
