import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useNavigationHistory() {
  const location = useLocation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, location.pathname]);
  }, [location]);

  const previousPath = history.length > 1 ? history[history.length - 2] : null;

  return { history, previousPath };
}

export default useNavigationHistory;
