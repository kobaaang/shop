import React from 'react'
import { useAuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children, requireAdmin}) {
   const {user} = useAuthContext()
   console.log('user??', user)
   /*
      조건에 맞지 않으면 홈으로 돌아가게
      user가 없으면 홈으로돌아가게
      requireAdmin 이 Admin(관리자)이 아닐때랑 user가 없을 때 cart로 들어갈 수 없고 홈으로 가진다 
   */ 
   if(!user || (requireAdmin && !user.isAdmin)){
      return <Navigate to='/' replace />
          // replace - 히스토리에 넣지 않음(뒤로 가기 불가능) 
   }


   //if에 해당사항이 없으면(로그인을 했으면) Cart로 들어갈 수 있음
   return children
}
/*
   로그인한 사용자가 있는지 확인
   그 사용자가 admin(관리자)인지 확인
*/