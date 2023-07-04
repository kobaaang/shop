import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContextPorvider } from './components/context/AuthContext';
import {
   QueryClient,
   QueryClientProvider
} from '@tanstack/react-query'

   const queryClient = new QueryClient()

function App() {
   
   return (
      <QueryClientProvider client={queryClient}>
         <AuthContextPorvider>
            <Navbar />
            <Outlet />
         </AuthContextPorvider>
      </QueryClientProvider>
   );
}

export default App;
