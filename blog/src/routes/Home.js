import React from 'react'

const BoardList = () => {

    const backgroundImageStyle = {
        backgroundImage: 'url(/sky.jpg)', // 여기에 이미지 경로를 입력하세요
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return(
        <div style={backgroundImageStyle}>
            <div className="container text-center">
            </div>
        </div>
    );
};

export default BoardList;