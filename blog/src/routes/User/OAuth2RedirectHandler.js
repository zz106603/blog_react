import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();  // useNavigate로 변경

    useEffect(() => {
        navigate('/');  // 성공 후 홈 페이지로 리다이렉트
    }, [navigate]);

    return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
