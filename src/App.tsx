import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router';
import NotFoundPage from './pages/not-found';
import Login from './pages/login';
import UsersComponent from './pages/home';
import Navbar from './components/navbar';
import { checkAuthState } from './store/actions/auth-actions';
import { useNavigate } from "react-router";
import { useAppSelector } from './hooks/reduxHook';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch: AppDispatch = useDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

// Check authentication state when the component mounts
useEffect(() => {
  dispatch(checkAuthState());
}, [dispatch]);
    
// Handle navigation when authentication state changes
useEffect(() => {
  if (!isAuthenticated) {
  navigate('/login'); 
}
}, [navigate, isAuthenticated]);

  return (
    <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              index
              path="/" 
              element={user ? <UsersComponent /> : <Navigate to="/login"/> } 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="*" 
              element={<NotFoundPage/>} 
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;
