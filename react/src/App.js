import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import FullLayout from './layouts/FullLayout';
import { Dashboard } from './views/Dashboard'
import { Admin } from './views/Admin';
import { Employee } from './views/Employee';
import { PendingTasks } from './views/PendingTasks';
import { Timeline } from './views/Timeline';
import { Notice } from './views/Notice';
import { Template } from './views/Template';
import { ImportantLinks } from './views/ImportantLinks';

import { Auth } from './components/auth/Auth';
import { Login } from './components/auth/Login'
import { PreLogin } from './components/auth/PreLogin';
import { EmployeeDetails } from './components/employee/EmployeeDetails';
import { AdminDetails } from './components/admin/AdminDetails';

import { MySlots } from './views/MySlots';
import { Group } from './views/Group';
import { Projects } from './views/Projects';
import { Chat } from './views/Chat';
import { Meeting } from './views/Meeting';
import { Profile } from './views/Profile';
import { EditProfile } from './views/EditProfile';
import { ForgetPassword } from './components/auth/ForgetPassword';
import { Notification } from './views/Notification';

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
          </Route>

          {/* nested routing */}
          <Route path="/home" element={<FullLayout />}>
            <Route path="" element={<Dashboard />} />

            <Route path="editProfile" element={<Profile />} />
            <Route path="updateProfile" element={<EditProfile />} />

            <Route path="admin" element={<Admin />} />
            <Route path="admin/details/:id" element={<AdminDetails />} />


            <Route path="employee" element={<Employee />} />
            <Route path="employee/details/:id" element={<EmployeeDetails />} />
            <Route path="PendingTasks" element={<PendingTasks />} />

            <Route path="mySlots" element={<MySlots />} />

            <Route path="chat/:id" element={<Chat />} />
            <Route path="meeting/:id" element={<Meeting />} />

            <Route path="projects" element={<Projects />} />
            <Route path="groups" element={<Group />} />
            <Route path="timelines" element={<Timeline />} />
            <Route path="notice" element={<Notice />} />
            <Route path="template" element={<Template />} />
            <Route path="links" element={<ImportantLinks />} />

            <Route path="notification" element={<Notification />} />

          </Route>

        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
