import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();  // useNavigate로 변경

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        const loginId = params.get('loginId');

        if (accessToken && refreshToken && loginId) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('id', loginId);

            navigate('/');  // 성공 후 홈 페이지로 리다이렉트

            // const previousPage = window.document.referrer;
            // const signupPagePattern = /\/user\/signup$/;
            // if (previousPage && !signupPagePattern.test(previousPage)) {
            //  window.history.back(); // 이전 페이지로 이동
            // }else{
            //  window.location.href = "/"
            // }
        } else {
            alert('로그인 처리 중 문제가 발생했습니다.');
        }
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
