import { useEffect } from 'react';
import { useForm, useAuthStore } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {

  const { startLogin, startRegister, errorMessage } = useAuthStore();
  
  const {
    loginEmail, loginPassword, onInputChange: onLoginInputChange,
  } = useForm( loginFormFields );

  const {
    registerName, registerEmail, registerPassword, registerPassword2,
    onInputChange: onRegisterInputChange
  } = useForm( registerFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({
      email: loginEmail,
      password: loginPassword
    });
  };

  const registerSubmit = ( event ) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2 ) {
      Swal.fire('Error de registro', 'Las contraseñas no coinciden', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword
    });
  };

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [ errorMessage ]);

  return (
    <div className="container login-container">
      <div className="row g-4">

        <div className="col-lg-6 login-form-1">
          <h2>Login</h2>
          <form onSubmit={ loginSubmit }>
            <div className="form-group mb-2">
              <input
                id="login-email"
                name="loginEmail"
                type="email"
                className="form-control"
                placeholder="Correo"
                value={ loginEmail }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="form-group mb-4">
              <input
                id="login-password"
                name="loginPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={ loginPassword }
                onChange={ onLoginInputChange }
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btnSubmit"
              >Login</button>
            </div>
          </form>
        </div>

        <div className="col-lg-6 login-form-2">
          <h2>Register</h2>
          <form onSubmit={ registerSubmit }>
            <div className="form-group mb-2">
              <input
                id="register-name"
                name="registerName"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={ registerName }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                id="register-email"
                name="registerEmail"
                type="email"
                className="form-control"
                placeholder="Correo"
                value={ registerEmail }
                onChange={ onRegisterInputChange }
              />
            </div>
            <div className="form-group mb-2">
              <input
                id="register-password"
                name="registerPassword"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={ registerPassword }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="form-group mb-4">
              <input
                id="register-password-2"
                name="registerPassword2"
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={ registerPassword2 }
                onChange={ onRegisterInputChange }
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btnSubmit"
              >Create Account</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};