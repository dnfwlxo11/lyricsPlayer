import axios from 'axios'

const httpInstance = () => {
    const instance = axios.create();

    return instance
}

const Api = httpInstance();

export default Api;