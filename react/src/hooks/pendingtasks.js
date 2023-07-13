import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

//get PendingTask
export const usePendingTasks = () => {
    return useQuery({
         queryKey: ['PendingTasks'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/pendingtask/`)
                .then((res) => res.data.PendingTasks)
    })
}

//add PendingTasks
export const useAddPendingTask = () => {
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/pendingtask/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['PendingTasks'] })
        }
    })
}

//updatePendingTasks
export const useUpdatependingtask= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/pendingtask/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['pendingtask'] })
        }
    })
}
//delete PendingTask
export const useDeletePendingTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => { 
            return axios
                .delete(`http://localhost:5001/pendingtask/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['PendingTasks'] })
        }
    })
}