import profileStyles from './profile.module.css';
import ProfileNavigation from "../components/profile-navigation/profile-navigation";
import { Outlet } from "react-router-dom";
import { FC } from 'react';

const Profile: FC = () => {
  return (
    <section className={profileStyles.container}>
      <ProfileNavigation />
      <Outlet />
    </section>
  )
}

export default Profile;