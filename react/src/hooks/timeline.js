import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get timeline
export const useTimeline = () => {
    return useQuery({
        queryKey: ['timeline'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/timelines/`)
                .then((res) => res.data.timelines)
    })
}

//update timelines
export const useEditTimeline = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/timelines/`, data,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['timeline'] })
        }
    })
}