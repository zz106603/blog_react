import React from 'react';
import { Redirect } from 'react-router-dom';

const ErrorPage = () => {
  // 인증 페이지로 리디렉션
  return <Redirect to="/login" />;
};

export default ErrorPage;
