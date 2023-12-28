import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginRoute } from "../../constants/constants";

function ProtectedRoute({element: Component, ...props}) {
  const currentUser = useSelector(store => store.form.currentUser);
  return <>
    {(currentUser.email && currentUser.name) || localStorage.getItem('refreshToken') ? <Component {...props} /> : <Navigate to={loginRoute} replace />}
  </>
}

export default ProtectedRoute;