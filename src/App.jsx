import Layout from './component/Layout/Layout';
import { RouterProvider, createBrowserRouter,createHashRouter} from 'react-router-dom';
import Home from './pages/Home';
import Singlepost from './pages/SinglePost';
import Notfound from './component/Notfound/Notfound';
import { HeroUIProvider } from '@heroui/react';
import { CounterContextProvider } from './Context/CounterContext';
import Navbar from './component/Navbar/Navbar';
import { AuthContextProvider } from './Context/AuthContext';
import ProtectRoutes from './pages/ProtectRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TokenContextProvider from './Context/tokenContext';
import { lazy, Suspense } from 'react';
import Spinner from './Spinner/Spinner';

const Login = lazy(() => import('./auth/Login/Login'));
const Register = lazy(() => import('./auth/Register/Register'));
const profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Setting')); // مثال آخر

const queryClient = new QueryClient()

const router = createHashRouter([
  {path: "/",element: <Layout />,children: [
    {index: true, element: <Suspense fallback={<Spinner/>}><Login /></Suspense>},
    {path: "/Register", element: <Suspense fallback={<Spinner/>}><Register /></Suspense>},
    {path: "/Home", element: <ProtectRoutes><Home /></ProtectRoutes>},
    {path: "/Profile", element: <ProtectRoutes><Suspense fallback={<Spinner/>}><Profile /></Suspense></ProtectRoutes>},
    {path: "/Setting", element: <ProtectRoutes><Suspense fallback={<Spinner/>}><Setting /></Suspense></ProtectRoutes>},
    {path: "/Singlepost/:id", element: <ProtectRoutes>< Singlepost/></ProtectRoutes>},
    {path:  "*" ,element: <Notfound />}
    ]}
])

function App() {

  return ( 
  <>

    <HeroUIProvider>
    <AuthContextProvider>
      <TokenContextProvider>
    <QueryClientProvider client={queryClient}>
    <CounterContextProvider>
              <RouterProvider router={router} />
    </CounterContextProvider>
     <ReactQueryDevtools/>
    </QueryClientProvider>
    </TokenContextProvider>
    </AuthContextProvider>
      </HeroUIProvider>
    </>
  )
}

export default App; 
