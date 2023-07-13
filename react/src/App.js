import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter, Routes,Route} from "react-router-dom";

import FullLayout from './layouts/FullLayout';
import { Dashboard } from './views/Dashboard'
import { Employee } from './views/Employee';

import { PendingTasks} from './views/PendingTasks';
import { Auth } from './components/auth/Auth';
import { Login } from './components/auth/Login';
import { PreLogin } from './components/auth/PreLogin';

import { Profile } from './views/Profile';
import { EditProfile } from './views/EditProfile';
import { ForgetPassword } from './components/auth/ForgetPassword';

import { PasswordResetPage } from './components/auth/PasswordResetPage';


const queryClient = new QueryClient({});

function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>

      <Routes>

        {/* nested routing */}
        <Route path="/" element={<Auth />}>
          <Route path="" element={<PreLogin />} />
          <Route path=":type" element={<Login />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="Resetpassword" element={<PasswordResetPage/>} />
        </Route>

        {/* nested routing */}
        <Route path="/home" element={<FullLayout />}>
          <Route path="" element={<Dashboard />} />

          <Route path="editProfile" element={<Profile />} />
          <Route path="updateProfile" element={<EditProfile />} />
          <Route path="employee" element={<Employee />} />
          <Route path="PendingTasks" element={<PendingTasks />} />
       </Route>

      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
