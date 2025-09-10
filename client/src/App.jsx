// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Signup from './components/authentication/Signup';
import Login from './components/authentication/login';
import UserDashboard from './components/user/UserDashboard';
import ProfilePage from './components/agent/profile';
import AgentSelect from './components/user/AgentSelect';
import AgentDashboard from './components/agent/AgentDashboard';
import UserProfilePage from './components/user/UserProfilePage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path='/selectCarrier' element={<AgentSelect/>}/>
        <Route path='/agentDashboard' element={<AgentDashboard/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/userProfile' element={<UserProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;