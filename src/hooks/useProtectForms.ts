import { useEffect } from 'react';
import { useAppSelector } from '../utils/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { mainRoute } from '../constants/constants';
import { getCurrentUser } from '../utils/selectors';

export function useProtectForms(): void {
  const currentUser = useAppSelector(getCurrentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if ((currentUser.email && currentUser.name) || localStorage.getItem('refreshToken')) {
      navigate(mainRoute);
    }
  }, []);
}