import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'AUTH_INIT':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
        loading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // Assuming user profile context is simpler, wait to fetch real profile from API
          if (decoded.exp * 1000 < Date.now()) {
             dispatch({ type: 'LOGOUT' });
          } else {
             // We need to fetch the user profile really. For now decode token
             // Better implementation: Call API to get user profile on load
             dispatch({
               type: 'AUTH_INIT',
               payload: { user: { _id: decoded.userId }, isAuthenticated: true }
             });
          }
        } catch (error) {
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'AUTH_INIT', payload: { user: null, isAuthenticated: false } });
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: res.data, token: res.data.token },
    });
    return res.data;
  };

  const register = async (name, email, password, role) => {
    const res = await axios.post('/api/auth/register', { name, email, password, role });
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: res.data, token: res.data.token },
    });
    return res.data;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
