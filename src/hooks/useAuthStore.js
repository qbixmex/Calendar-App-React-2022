import { useDispatch, useSelector } from "react-redux";
import calendarAPI from "../api/calendarAPI";

export const useAuthStore = () => {
  // onChecking,
  // onLogin
  const { status, user, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    try {
      const response = await calendarAPI.post('/auth', {
        email,
        password
      });

      console.log(response);
    } catch (error) {
      console.error(error);
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
