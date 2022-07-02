import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {

  const mainRoutes = ( authStatus = 'not-authenticated' ) => {
    switch (authStatus) {
      case 'not-authenticated':
        return (<Route path="/auth/*" element={ <LoginPage /> } />);
      case 'authenticated':
        return (<Route path="*" element={ <CalendarPage /> } />);
      default:
        return;
    }
  };

  return (
    <Routes>
      { mainRoutes('authenticated') }
      <Route path="*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  );
};
