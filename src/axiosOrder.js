import  axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-2020-ec51e-default-rtdb.firebaseio.com/'
});

export default instance;