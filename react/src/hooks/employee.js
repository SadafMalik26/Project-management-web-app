import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;
 
//get employee count
export const useEmployeeCount = () => {
    return useQuery({
        queryKey: ['CountEmployee'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/employee/count`)
                .then((res) => res.data.employeeCount)
    })
}
//get employee
export const useEmployee = () => {
    return useQuery({
        queryKey: ['Employees'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/employee/`)
                .then((res) => res.data.employees)
    })
}

//get single employee
export const useEmployeeQualificationDetails = (id) => {
    return useQuery({
        queryKey: ['EmployeeDetails'],
        queryFn: () => {

             return axios
                .get(`http://localhost:5001/employee/qualification/${id}`)
                .then((res) => res.data.employee)
        }

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
            queryClient.invalidateQueries({ queryKey: ['Employees'] })
        }
    })
}

