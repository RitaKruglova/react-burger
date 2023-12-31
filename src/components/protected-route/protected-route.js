import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loginRoute } from "../../constants/constants";

function ProtectedRoute({element: Component, ...props}) {
  const currentUser = useSelector(store => store.form.currentUser);

  const location = useLocation();

  return (
    <>
      {(currentUser.email && currentUser.name) || localStorage.getItem('refreshToken') ? <Component {...props} /> : <Navigate to={loginRoute} replace state={{ from: location.pathname}}/>}
    </>
  )
}

export default ProtectedRoute;