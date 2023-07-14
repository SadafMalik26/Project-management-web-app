import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDeleteLeft , faEye} from '@fortawesome/free-solid-svg-icons';
import { useEmployee } from '../../hooks/employee';
import { Table,Button } from 'reactstrap';
import { arrayBufferToBase64 } from '../../common/utils';
import { useAuth,useDeleteUser } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';

export const All = () => {
    const { data: employees } = useEmployee();
    const { data: auth } = useAuth();
    const deleteUser = useDeleteUser();
    const navigate = useNavigate();
    const [sortedEmployees, setSortedEmployees] = useState([]);
  
    const sortEmployeesAscending = () => {
      const sortedArray = [...employees].sort((a, b) => a.email.localeCompare(b.email));
      setSortedEmployees(sortedArray);
    };
  
    const sortedList = sortedEmployees.length > 0 ? sortedEmployees : employees;
  
    const viewDetails = (id) => {
      navigate(`details/${id}`)
  }
  
    const edit = (id) => {
      navigate("/home/updateProfile", { state: { id } });
    };
  
    return (
      <>
        <h2 style={{ fontSize: "30px" }}>
          <strong>List of Employees</strong>
         <Button className='float-end' color="primary" onClick={sortEmployeesAscending}>Sort Ascending</Button> 
        </h2> 
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th>
                <strong>Employee</strong>
              </th>
              {auth?.type === "Admin" && (
                <th>
                  <strong>Actions</strong>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedList?.map((employee, index) => (
              <tr key={index} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={`data:image/jpeg;base64,${arrayBufferToBase64(
                        employee.cover?.data?.data
                      )}`}
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
                <td>
                  {auth?.type === "Admin" && (
                    <>
                      <Button onClick={() => edit(employee._id)} color="info">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => deleteUser.mutate(employee._id)}
                      >
                        <FontAwesomeIcon icon={faDeleteLeft} />
                      </Button>{" "}
                    </>
                  )}
                  
                  <Button color="warning"
                                    onClick={() => viewDetails(employee._id)}
                                ><FontAwesomeIcon icon={faEye} /></Button>
                        
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  