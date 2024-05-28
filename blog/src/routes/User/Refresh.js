/* Refresh.js */

import 'bootstrap/dist/css/bootstrap.min.css';
import instance from '../Axios/AxiosConfig';

const Refresh = async() => {

    const reToken = {
      "refreshToken": localStorage.getItem('refresh_token')
    };
 
    try {
        const res = await instance.post(`/api/auth/refresh`, reToken, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return res.data.data;
      } catch (error) {
        console.log('API 호출 에러: ', error)
      }
};

export default Refresh;
