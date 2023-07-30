import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons'

import { useEmployee } from '../../hooks/employee';
import { useAuth, useDeleteUser } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from 'reactstrap';

export const All = () => {

    const navigate = useNavigate()

    const { data: employees } = useEmployee()
    const { data: auth } = useAuth()
    const deleteUser = useDeleteUser()

    const viewDetails = (id) => {
        navigate(`details/${id}`)
    }

    const edit = (id) => {
        navigate("/home/updateProfile", { state: { id } });
    }

    return (
        <>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Qualification</th>
                        <th>Interests</th>
                        <th>Jobtitle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees?.map((employee, index) => (
                        <tr key={index} className="border-top">
                            <td>
                                <div className="d-flex align-items-center p-2">

                                    <img
                                        src={`data:image/jpeg;base64,${employee?.cover?.data}`}
                                        className="rounded-circle"
                                        alt="avatar"
                                        width="45"
                                        height="45"
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0">{employee.username}</h6>
                                        <span className="text-muted">{employee.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{employee.Qualification}</td>
                            <td>{employee.Interest}</td>
                            <td>{employee.Jobtitle}</td>
                            <td>
                             {auth?.type == 'Manager' ?
                                    <>
                                        <Button onClick={() => edit(employee._id)} color="info"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                        <Button onClick={() => deleteUser.mutate(employee._id)} color="danger"><FontAwesomeIcon icon={faDeleteLeft} /></Button>{' '}
                                    </>
                                    : ""}

                                <Button color="warning"
                                    onClick={() => viewDetails(employee._id)}
                                ><FontAwesomeIcon icon={faEye} /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}