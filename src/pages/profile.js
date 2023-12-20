import profileStyles from './profile.module.css';
import ProfileNavigation from "../components/profile-navigation/profile-navigation";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <section className={profileStyles.container}>
      <ProfileNavigation />
      <Outlet />
    </section>
  )
}

export default Profile;