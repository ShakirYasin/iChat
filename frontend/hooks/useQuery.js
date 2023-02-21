import { useQuery } from "react-query";
import axios from '../utils/axios'

    
export const useSearch = (keyword = "", options) => {
    return useQuery({
        queryKey: ['search', keyword],
        queryFn: async () => {
            const {data} = await axios.get(`/user?search=${keyword}`)
            return data
        },
        ...options
    })
}
    
export const useFetchChats = (options) => {
    return useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const {data} = await axios.get(`/chat`)
            return data
        },
        refetchOnWindowFocus: false,
        ...options
    })
}