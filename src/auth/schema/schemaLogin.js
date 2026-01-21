import * as zod from "zod"

  const schemaLogin=zod.object({
  email:zod.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'invalid email'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/,'invalid password'),
 })

export default schemaLogin