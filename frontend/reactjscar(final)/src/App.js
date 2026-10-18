import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for global notifications
import AdminDashboard from './Components/AdminDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import UpdatePassword from './Components/UpdatePassword';
import AddBrand from './Components/AddBrand';
import AddModel from './Components/AddModel';
import AddVariant from './Components/AddVariant';
import UserDashboard from './Components/UserDashboard';
import UpdateProfile from './Components/UpdateProfile';
import CarCompare from './Components/CarCompare';
import CarComparisonPage from './Components/CarComparisonPage';
import AddSpecifications from './Components/AddSpecifications';
import CarComparison from './Components/CarComparison';

export default function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                
             
                <Route path="/adminDashboard" element={<AdminDashboard />}>
                <Route path="addbrand" element={<AddBrand/>} />
                <Route path="addModel" element={<AddModel />} />
                <Route path="addVariant" element={<AddVariant />} />
                <Route path="AddSpecifications" element={<AddSpecifications />} />
                <Route path='carComparison' element={<CarComparison/>}/>
                <Route path="updatePassword" element={<UpdatePassword />} />
                    
                </Route>
                
              
                <Route path="/userDashboard" element={<UserDashboard />}>
                <Route path="carCompare" element={<CarCompare/>} />
                <Route path="carComparePage" element={<CarComparisonPage />} />
                <Route path="updateProfile" element={<UpdateProfile />} />

                   
                </Route>
                
            </Routes>
            </BrowserRouter>
    </div>
  );
}
