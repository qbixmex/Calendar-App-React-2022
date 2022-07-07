import { useDispatch, useSelector } from "react-redux";
import calendarAPI from "../api/calendarAPI";
import { onChecking, onLogin, onLogout, onClearMessage } from "../store";

export const useAuthStore = () => {

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
      }, 100);

    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch( onChecking() );

    try {

      const { data } = await calendarAPI.post('/auth/new', {
        name,
        email,
        password
      });

      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {

      let errorMessage = error.response.data?.msg || '';

      if (error.response.data.errors?.name) {
        errorMessage = error.response.data.errors.name.msg;
      }

      if (error.response.data.errors?.email) {
        errorMessage = error.response.data.errors.email.msg;
      }

      if (error.response.data.errors?.password) {
        errorMessage = error.response.data.errors.password.msg;
      }

      dispatch( onLogout(errorMessage) );

      setTimeout(() => {
        dispatch( onClearMessage() );
      }, 100);

    }
  };

  const checkAuthToken = async () => {

    const token = localStorage.getItem('token');

    if ( !token ) return dispatch( onLogout() );

    try {

      const { data } = await calendarAPI.get('/auth/renew');

      localStorage.setItem('token', data.token );
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('token-init-date');
      return dispatch( onLogout() );
    }

  };

  const startLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
    dispatch( onLogout() );
  }

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
