import axios from 'axios';

const axiosIntance = axios.create({
    baseURL: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosIntance;
