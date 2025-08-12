// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Signup from './components/authentication/Signup';
import Login from './components/authentication/login';
import UserDashboard from './components/user/UserDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CarrierSelect from './components/user/CarrierSelect';
import CarrierDashboard from './components/Carreier/CarrierDashboard';
import ProfilePage from './components/Carreier/profile';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path='/selectCarrier' element={<CarrierSelect/>}/>
        <Route path='/carrierDashboard' element={<CarrierDashboard/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;