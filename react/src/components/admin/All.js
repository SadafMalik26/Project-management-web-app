import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons'

import { useAdmin } from '../../hooks/admin';
import { useAuth, useDeleteUser } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';

import { Table, Button, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';


export const All = () => {

  const navigate = useNavigate()

  const { data: admins } = useAdmin()
  const { data: auth } = useAuth()
  const deleteUser = useDeleteUser()

  const viewDetails = (id) => {
    navigate(`details/${id}`)
  }

  const edit = (id) => {
    navigate("/home/updateProfile", { state: { id } });
  }

  return (


    <div className="card-container">

      {admins?.map((admin, index) => (
        <Card key={index} className="mb-3 card-admin">
          {/* Image on top */}
          <div className="admin-details-image-container">
            <img
              src={`data:image/jpeg;base64,${admin?.cover?.data}`}
              className="admin-image"
              alt="avatar"

            />
          </div>
          <CardBody className="card-content">
            <div className="card-text">
              <div className="d-flex align-items-center mb-2">
                <div className="ms-3">
                  <br/>
                 <hr></hr>
                  <CardTitle tag="h3">{admin.username}</CardTitle>
                  <CardSubtitle tag="h4" className="mb-2 text-muted">
                    {admin.email}
                  </CardSubtitle>
                </div>
              </div>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>

              </Table>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <tbody>
                  <tr>
      

                    <td>
                      {auth?.type === 'Manager' && (
                        <>
                          <Button onClick={() => edit(admin._id)} color="info">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button onClick={() => deleteUser.mutate(admin._id)} color="danger">
                            <FontAwesomeIcon icon={faDeleteLeft} />
                          </Button>{' '}
                        </>
                      )}
                      <Button color="warning" onClick={() => viewDetails(admin._id)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};