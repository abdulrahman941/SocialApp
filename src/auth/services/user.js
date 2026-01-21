import axios from "axios";

//upload profile photo

export  async function UploadProfilePhoto(formData){
   try {
     let {data}= await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,formData,{
        headers:{
            token:localStorage.getItem('token')
        }
    })

    return data
   } catch (error) {

    return (error)
   }
}
