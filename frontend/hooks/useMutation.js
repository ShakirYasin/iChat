import {useMutation} from "react-query"
import axios from "../utils/axios"

export const useSignUp = (options) => {
    return useMutation(
        async (values) => {
            const {data} = await axios.post('/user', values);
            return data;
        },
        {
            ...options,
            onSuccess: (data) => {
                console.log({RegisterResponse: data});
                axios.defaults.headers['Authorization'] = `Bearer ${data?.token}`
                options?.onSuccess?.(data);
            } 
        }
    )
}

export const useLogin = (options) => {
    return useMutation(
        async (values) => {
            const {data} = await axios.post('/user/login', values);
            return data;
        },
        {
            ...options,
            onSuccess: (data) => {
                console.log({LoginResponse: data});
                axios.defaults.headers['Authorization'] = `Bearer ${data?.token}`
                options?.onSuccess?.(data);
            } 
        }
    )
}