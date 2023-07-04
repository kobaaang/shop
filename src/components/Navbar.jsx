import { Link } from 'react-router-dom';
import { HiPencilAlt } from "react-icons/hi";
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';
import CartStatus from './CartStatus';


export default function Navbar() {
   //구조분해해서 AuthContext.jsx안에 있는 useAuthContext함수 사용할 것임
   const { user, login, logout } = useAuthContext()

   // const [user, setUser] = useState();

   // //화면이 mount(reload)될 때 로그인여부 확인하는 함수 호출 
   // useEffect(()=>{
   //    onUserStateChanged((user)=>{
   //       setUser(user)
   //       console.log('user',user)
   //    });
   // },[])


   // //로그인 함수
   // const handleLogin = () => {
   //    //login().then(setUser)
   //    login()
   // }
   // const handleLogout = () => {
   //    //logout().then(setUser)
   //    logout()
   // }

   return (
      <div className='border-b border-slate-300 fixed w-full z-10 bg-white'>
         <div className='w-full max-w-screen-2xl m-auto'>
            <header className='flex justify-between items-center p-4'>
               <Link to='/'>
                  <h1 className='md:text-3xl text-xl font-semibold font-logoFont tracking-normal'>WOOYOUNGMI</h1>
               </Link>
               
               <nav className='flex items-center md:gap-4 gap-2 text-sm md:text-base '>
                  <Link to='/products'>Product</Link>
                  {user && <Link to='/cart'><CartStatus /></Link>}


                  {user && user.isAdmin && (<Link to='/products/new'><HiPencilAlt /></Link>)}
                  {user && <User user={user} />}
                  {user && <Button onClick={logout} text={'logout'}>logout</Button>}
                  {!user && <Button onClick={login} text={'login'}>login</Button>} {/* user가 없을 때 실행*/}
                  {/* user값이 있으면 logout으로 표시 없으면 login표시*/}
               </nav>
            </header>
         </div>
      </div>
   )
}
