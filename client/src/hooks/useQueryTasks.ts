import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { QRCode } from '../types'
import { useError } from '../hooks/useError'

export const useQueryTasks = () => {
    const { switchErrorHandling } = useError()
    const getTasks = async () => {
        const { data } = await axios.get<QRCode[]>(
            `${process.env.REACT_APP_API_URL}/qrcode/recent`,
            { withCredentials: true }
        )
        return data
    }
    return useQuery<QRCode[], Error>({
        queryKey: ['tasks'],
        queryFn: getTasks,
        staleTime: Infinity,
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message)
            } else {
                switchErrorHandling(err.response.data)
            }
        },
    })
}