import axios from 'axios'

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_FLY_ENDPOINT}/api`,
})
   
export default instance