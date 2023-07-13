import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get Employee user
export const useEmployeeCount = () => {
    return useQuery({
        queryKey: ['CountEmployee'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/employee/count`)
                .then((res) => res.data.employeeCount)
    })
}


//get single employee
export const useEmployeeDetails = (id) => {
    return useQuery({
        queryKey: ['EmployeeDetails'],
        queryFn: () => {

            return axios
                .get(`http://localhost:5002/employee/details${id}`)
                .then((res) => res.data.employee)
        }

    })
}
//get Employee
export const useEmployee = () => {
    return useQuery({
        queryKey: ['employees'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/employee/`)
                .then((res) => res.data.employees)
    })
}

//add Employee
export const useAddEmployee = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/employee/`, data, {
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
            queryClient.invalidateQueries({ queryKey: ['employees'] })
        }
    })
}
