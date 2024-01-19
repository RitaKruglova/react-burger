import { useEffect } from 'react';
import { useAppSelector } from '../utils/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { mainRoute } from '../constants/constants';

export function useProtectForms(): void {
  const { currentUser } = useAppSelector(store => ({
    currentUser: store.form.currentUser
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if ((currentUser.email && currentUser.name) || localStorage.getItem('refreshToken')) {
      navigate(mainRoute);
    }
  }, []);
}