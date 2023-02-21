import { useQuery } from "react-query";
import axios from '../utils/axios'

    
export const useSearch = (keyword = "", options) => {
    return useQuery({
        queryKey: ['search', keyword],
        queryFn: async () => {
            return await axios.get(`/user?search=${keyword}`)
        },
        ...options
    })
}