import { Avatar, Button, Dropdown, Navbar ,TextInput } from "flowbite-react";
import { Link ,useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai"; 
import {FaMoon,FaSun} from 'react-icons/fa';
import { useSelector ,useDispatch} from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSile';


export default function Header() {
  const path = useLocation().pathname;
  const {currenUser} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const dispatch = useDispatch();
  return (
    <Navbar className="border-b-2">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ">
            <span className="text-white px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-lg">Affiliate VvE</span>
            Blog
        </Link>
        <form >
          <TextInput 
            className="hidden lg:inline "
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}>
          </TextInput>
        </form>
  
        <Button className=" lg:hidden w-12 h-10" color="gray" pill><AiOutlineSearch/></Button>
        <div className="flex gap-2 md:order-2 rounded-full">
          <Button className="w-12 h-10 sm:inline hidden" color="gray" pill onClick={()=>{dispatch(toggleTheme())}}>
            {theme==='light'?<FaSun />:<FaMoon />}
        
          </Button>
          {currenUser?
            (<Dropdown arrowIcon={false}
            inline
            label={<Avatar alt="user"   rounded img={currenUser.profilePicture}></Avatar>}>
              <Dropdown.Header>
                <span className="block m-x text-sm ">{currenUser.username}</span>
                <span className="block m-x text-sm truncate">{currenUser.email}</span>
              </Dropdown.Header>
                <Link to='/dashboard?tab=profile'>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item>Sign Out</Dropdown.Item>
                
            </Dropdown>):
            (<Link className="flex gap-2 md:order-2">
              <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
            </Link>)
          }
   
          <Navbar.Toggle />
        </div>
  
        <Navbar.Collapse>
          <Navbar.Link active={path==="/"} as={'div'}>
              <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/about"} as={'div'}>
              <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path==='/projects'} as={'div'}>
              <Link to='/projects' >Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
