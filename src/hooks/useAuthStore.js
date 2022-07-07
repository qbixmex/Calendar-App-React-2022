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

      let errorMessage = error.response.data.msg;

      if (error.response.data.errors?.email) {
        errorMessage = error.response.data.errors.email.msg;
      }

      if (error.response.data.errors?.password) {
        errorMessage = error.response.data.errors.password.msg;
      }

      dispatch( onLogout(errorMessage) );

      setTimeout(() => {
        dispatch( onClearMessage() );
      }, 10);

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
