import {useMutation} from "react-query"
import axios from "../utils/axios"
import {useChatContext} from "../src/Context/ChatProvider"

export const useSignUp = (options) => {
    const {setUser} = useChatContext()
    return useMutation(
        async (values) => {
            const {data} = await axios.post('/user', values);
            return data;
        },
        {
            ...options,
            onSuccess: (data) => {
                console.log({RegisterResponse: data});
                setUser(data)
                axios.defaults.headers['Authorization'] = `Bearer ${data?.token}`
                options?.onSuccess?.(data);
            } 
        }
        )
    }
    
export const useLogin = (options) => {
        const {setUser} = useChatContext()
    return useMutation(
        async (values) => {
            const {data} = await axios.post('/user/login', values);
            return data;
        },
        {
            ...options,
            onSuccess: (data) => {
                console.log({LoginResponse: data});
                setUser(data)
                axios.defaults.headers['Authorization'] = `Bearer ${data?.token}`
                options?.onSuccess?.(data);
            } 
        }
    )
}