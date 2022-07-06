import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields = {
  loginEmail: 'spiderman@marvel.com',
  loginPassword: '0123456789'
};

const registerFormFields = {
  registerName: 'Bruce Wayne',
  registerEmail: 'batman@dc.com',
  registerPassword: '0123456789',
  registerPassword2: '0123456789',
};

export const LoginPage = () => {
  const {
    loginEmail, loginPassword, formState: loginFormState,
    onInputChange: onLoginInputChange,
  } = useForm( loginFormFields );

  const {
    registerName, registerEmail, registerPassword, registerPassword2,
    formState: registerFormState,
    onInputChange: onRegisterInputChange
  } = useForm( registerFormFields );

  const loginSubmit = ( event ) => {
    event.preventDefault();
    console.table({ loginEmail, loginPassword });
  };

  const registerSubmit = ( event ) => {
    event.preventDefault();
    console.table({ registerName, registerEmail, registerPassword, registerPassword2 });
  };

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
                type="text"
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
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
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