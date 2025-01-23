import { Route, Routes } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Login from './TMS/Login';
import Register from './TMS/Register';
import Dashboard from './TMS/Dashboard';
import Task from './TMS/Task';
import Profile from './TMS/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/task' element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
