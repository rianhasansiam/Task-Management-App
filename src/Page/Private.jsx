import React, { useContext } from 'react'
import { contextData } from '../Contex';
import { Navigate, useNavigate } from 'react-router-dom';

const Private = ({children}) => {

  const {  user } = useContext(contextData);
// const navigate= useNavigate()

if (user) {
  return children;
}




return <Navigate to="/" />;
};

export default Private



