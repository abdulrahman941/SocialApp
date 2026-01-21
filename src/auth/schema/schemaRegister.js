import * as zod from "zod"

  const schemaRegister=zod.object({
  name: zod.string().nonempty('name is required').min(3,'name min 3 char').max(25,'name max 25 char').regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/,'Only letters and single spaces allowed'),
  email:zod.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'invalid email'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,'invalid password'),
  rePassword:zod.string().nonempty('repassword is required'),
  gender:zod.string().nonempty('gender is required'),
  dateOfBirth:zod.coerce.date('date is required').refine((value)=>{
    let year=value.getFullYear()
    let dateNow=new Date().getFullYear()
    let userAge=dateNow-year
    return userAge>=20
  },'age less than 20')

 }).refine((data)=>data.password===data.rePassword,{path:['rePassword'],message:'invalid repassword'})

export default schemaRegister