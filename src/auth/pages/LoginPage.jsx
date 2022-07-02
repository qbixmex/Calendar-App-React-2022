import './LoginPage.css';

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row g-4">

        <div className="col-lg-6 login-form-1">
          <h2>Login</h2>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
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
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
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