import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get admin count
export const useAdminCount = () => {
    return useQuery({
         queryKey: ['CountAdmin'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/admin/count`)
                .then((res) => res.data.adminCount)
    })
}

//get admin slots
export const useAdminSlots = (id) => {
    return useQuery({
        queryKey: ['Slots'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/admin/slots/${id}`)
                .then((res) => res.data.slots)
    })
}

//get admin slots Count
export const useAdminSlotsCount = (id) => {
    return useQuery({
        queryKey: ['SlotCount'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/admin/slots/count/${id}`)
                .then((res) => res.data)
    })
}

//get my slots
export const useMySlots = (id) => {
    return useQuery({
        queryKey: ['MySlots'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/admin/slots/`)
                .then((res) => res.data.slots)
    })
}

//get admin
export const useAdmin = () => {
    return useQuery({
        queryKey: ['Admins'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/admin/`)
                .then((res) => res.data.admins)
    })
}
 
//get single admin
export const useAdminQualificationDetails = (id) => {
    return useQuery({
        queryKey: ['AdminDetails'],
        queryFn: () => {

            return axios
                .get(`http://localhost:5001/admin/qualification/${id}`)
                .then((res) => res.data.admin)
        }

    })
}

//add Admin
export const useAddAdmin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/admin/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        },
        onSuccess: async (res) => {

            return { 'message': 'success' }
        },
        onError: () => {

            return { 'message': 'error' }
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Admins'] })
        }
    })
}

//add Admin Slot
export const useAddAdminSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/admin/slots/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.data)
        },
        onSuccess: async (res) => {

            return { 'message': 'success' }
        },
        onError: () => {

            return { 'message': 'error' }
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['MySlots'] })
            queryClient.invalidateQueries({ queryKey: ['Slots'] })
        }
    })
}

//update Admin Slot
export const useEditAdminSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/admin/slots/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        }, onError: (res) => {
            return { 'message': res }
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Slots'] })
            queryClient.invalidateQueries({ queryKey: ['MySlots'] })
        }
    })
}


