import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Employee from './components/Employees';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewEmployee from './components/NewEmployee';
import EditEmployee from './components/EditEmployee';
import { useEffect, useMemo } from 'react';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path='/employee' element={<Employee></Employee>} />
        <Route path='/employee/new' element={<NewEmployee></NewEmployee>} />
        <Route path='/employee/edit' element={<EditEmployee></EditEmployee>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;