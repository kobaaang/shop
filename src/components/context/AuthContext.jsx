import { createContext, useState, useEffect, useContext } from "react";
import { onUserStateChanged, login, logout, } from "../../api/firebase";

const AuthContext = createContext()

//료이치 텐카이
export function AuthContextPorvider({children}){
//<AuthContext.Provider value={AuthContext}> 모든 childern 컴포넌트에서 사용가능하게 만들어줌
   
   const [user, setUser] = useState();

   //화면이 mount(reload)될 때 로그인여부 확인하는 함수 호출 
   useEffect(()=>{
      onUserStateChanged((user)=>{
         setUser(user)
         console.log('user',user)
      });
   },[])

   return(
      //loginL:login, logout:logout 앞은 내 맘대로 작명(맘대로):뒤에는 함수를 가져오기 때문에 변경X
      //provider로 전체 context에 적용 가능하게 만듦
      <AuthContext.Provider value={{user, uid:user && user.uid, login:login, logout:logout}}>
         {children}
      </AuthContext.Provider>
   )
}

//useContext 를 import말고 함수로 사용할 것임
export function useAuthContext(){
   return useContext(AuthContext)
}
