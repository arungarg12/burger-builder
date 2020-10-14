import axios from 'axios';

const instance = axios.create({
    baseURL:'https://create-sim-burger.firebaseio.com/'
})

export default instance;