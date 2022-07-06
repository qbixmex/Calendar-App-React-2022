import { useDispatch, useSelector } from "react-redux";
import calendarAPI from "../api/calendarAPI";
import { onChecking, onLogin, onLogout, onClearMessage } from "../store";

export const useAuthStore = () => {
  // onChecking,
  // onLogin
  const { status, user, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {

    dispatch( onChecking() );

    try {

      const { data } = await calendarAPI.post('/auth', {
        email,
        password
      });

      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {

      dispatch( onLogout('Bad Credentials') );

      setTimeout(() => {
        dispatch( onClearMessage() );
      }, 100);

    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,    
  };
};
