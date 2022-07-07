import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);

  if ( status === 'checking' ) {
    return (
      <div className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {
        ( status === 'not-authenticated' )
         ? <Route path="/auth/*" element={ <LoginPage /> } />
         : <Route path="*" element={ <CalendarPage /> } />
      }
      <Route path="*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  );
};
