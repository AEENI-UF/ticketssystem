import * as React from 'react';
import { useState ,useEffect} from 'react';
import { Routes , Route ,Navigate} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Login_poc from './Components/Login_poc';
import SignUp from './Components/SignUp';
import ForgotPass from './Components/ForgotPass';
import Profile from './Components/Profile';
import PrivateRoute from './Components/PrivateRoute';
import About from './Components/About';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
    };


  return (
    <div>
       <Header/>
      <Routes>
          <Route
            path='/profile'
            element={
              <PrivateRoute path="/profile" isLoggedIn={isLoggedIn} >
                <Profile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        <Route path="/" element={<Login_poc onLogin={handleLogin} />}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/ForgotPass" element={<ForgotPass/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
    
 );
}


