import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 py-3 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt me-2"></i>
        <b>{ user.name }</b>
      </span>
      <button
        id="logout-button"
        className="btn btn-outline-danger"
        onClick={ startLogout }
      >
        <span className="fw-bold me-2">Salir</span>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </div>
  );
};
