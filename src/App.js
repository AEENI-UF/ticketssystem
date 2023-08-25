import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import Login_poc from "./Components/Login_poc";
import SignUp from "./Components/SignUp";
import ForgotPass from "./Components/ForgotPass";
import PrivateRoute from "./Components/PrivateRoute";
import About from "./Components/About";
import TicketDetails from "./Components/TicketDetails";
import Users from "./Components/Users";
import UserProfile from "./Components/UserProfile";
import Daily from "./scenes/Daily";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import Dashboard from "./Components/Dashboard";
import Monthly from "./scenes/Monthly";
import BreakDown from "./scenes/BreakDown";
import CreateNewTicket from "./Components/CreateNewTicket";
import UserDashboard from "./Components/UserDashboard";
import HomeLayout from "./Components/Layout/HomeLayout";
import Home from "./Components/Home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  localStorage.setItem("mode", "dark");
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  let theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return (
    //  <ThemeProvider theme={theme}>
    //  <CssBaseline />

    <div>
      <Routes>

        {/* Home DashBoard */}
        <Route element={<HomeLayout/>}>
          <Route path="/" element={ <Home/>} />
          <Route path="/login" element={<Login_poc onLogin={handleLogin} />} />
          <Route path="/create-new-ticket" element={<CreateNewTicket/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPass" element={<ForgotPass />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* user , agent & Admin */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute path='/dashboard' isLoggedIn={isLoggedIn}>
                {/* Dashboard */}
                <Dashboard/>
              </PrivateRoute>
            }
          />
          <Route
            path="/userdashboard"
            element={
              <PrivateRoute path='/userdashboard' isLoggedIn={isLoggedIn}>
                {/* User Dashboard */}
                <UserDashboard/>
              </PrivateRoute>
            }
          />

          {/* ticket Details */}
          <Route
            path="ticket/:ticketId"
            element={
              <PrivateRoute path="ticket/:ticketId" isLoggedIn={isLoggedIn}>
                <TicketDetails onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* users details */}
          <Route
            path="user/:userId"
            element={
              <PrivateRoute path="user/:userId" isLoggedIn={isLoggedIn}>
                <UserProfile onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Users */}
          <Route
            path="users"
            element={
              <PrivateRoute path="/users" isLoggedIn={isLoggedIn}>
                <Users onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Daily */}

          <Route
            path="daily"
            element={
              <PrivateRoute path="/daily" isLoggedIn={isLoggedIn}>
                <Daily onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Monthly */}

          <Route
            path="monthly"
            element={
              <PrivateRoute path="/monthly" isLoggedIn={isLoggedIn}>
                <Monthly onLogout={handleLogout} />
              </PrivateRoute>
            }
            />
          
          {/* User create Ticket */}
          <Route
            path="/createticket"
            element={
              <PrivateRoute path="/createticket" isLoggedIn={isLoggedIn}>
                <CreateNewTicket/>
              </PrivateRoute>
            }
          />
        </Route>        
      </Routes>
      {/* <Footer/> */}
    </div>
    // </ThemeProvider>
  );
}
