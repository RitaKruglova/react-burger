import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { mainRoute } from '../constants/constants';

export function useProtectForms() {
  const { currentUser } = useSelector(store => ({
    currentUser: store.form.currentUser
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if ((currentUser.email && currentUser.name) || localStorage.getItem('refreshToken')) {
      navigate(mainRoute);
    }
  }, []);
}