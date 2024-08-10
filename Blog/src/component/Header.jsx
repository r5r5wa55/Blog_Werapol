import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSile';
import { signoutSuccess } from "../redux/user/userSilce";
import { useEffect, useState } from "react";


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currenUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



  console.log(location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  console.log(searchTerm);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {

        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ">
        <span className="text-white px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-700 rounded-lg">Blog</span>
        Werapol
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          className="hidden lg:inline "
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
        </TextInput>
      </form>

      <Button className=" lg:hidden w-12 h-10" color="gray" pill><AiOutlineSearch /></Button>
      <div className="flex gap-2 md:order-2 rounded-full">
        <Button className="w-12 h-10 sm:inline hidden" color="gray" pill onClick={() => { dispatch(toggleTheme()) }}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}

        </Button>
        {currenUser ?
          (<Dropdown arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded img={currenUser.profilePicture}></Avatar>}>
            <Dropdown.Header>
              <span className="block m-x text-sm ">{currenUser.username}</span>
              <span className="block m-x text-sm truncate">{currenUser.email}</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>

          </Dropdown>) :
          (<Link to='/sign-in' className="flex gap-2 md:order-2">
            <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
          </Link>)
        }

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/content'} as={'div'}>
          <Link to='/content' >Contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
