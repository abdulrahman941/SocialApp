import { Navbar as HeroNav,NavbarBrand,NavbarContent,NavbarItem,Link,DropdownItem,DropdownTrigger,Dropdown,DropdownMenu,Avatar} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
const navigate = useNavigate();
const {userToken,setuserToken,userData,setuserData}=useContext(AuthContext)



function LogOut(){
  localStorage.removeItem('token')
   setuserToken(null)
   setuserData(null)
  navigate('/',{replace:true})
}

 

  return <>
   <HeroNav className="bg-sky-700">
      <NavbarBrand>
       <NavLink to='/Home'> <p className="font-bold text-inherit">Linked posts</p></NavLink>
      </NavbarBrand>

      <div className="flex justify-end gap-8">
      {userToken!=null? <NavbarContent as="div" justify="end">
        <NavbarItem>
          <NavLink to='./Home'color="foreground">
            Home
          </NavLink>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar isBordered as="button" className="transition-transform" color="secondary" name="Jason Hughes" size="sm" src={userData?.photo}/>
          </DropdownTrigger>
          <DropdownMenu aria-label="account Actions" variant="flat">
            <DropdownItem key="Profile" textValue="Home"><NavLink to="/Profile">Profile</NavLink></DropdownItem>
            <DropdownItem key="Setting" textValue="Setting"><NavLink to="/Setting">Setting</NavLink></DropdownItem>
            <DropdownItem onClick={LogOut} key="logout" textValue="LogOut" color="danger">Log Out,{userData?.name}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      :<NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to='./Register'color="foreground">
            Register
          </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink aria-current="page" to='/' color="secondary" >
            Login
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      }  
      
     </div>
    </HeroNav>
  
  
  
  </>
}






      