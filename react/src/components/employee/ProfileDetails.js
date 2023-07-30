import { useEmployeeQualificationDetails } from "../../hooks/employee";
import {
   Row,  Col, Spinner
} from "reactstrap";

export const ProfileDetails = (props) => {

  const { isLoading, data: employee } = useEmployeeQualificationDetails(props.id);

return(
    <>
       <div className="employee-details-container mb-4">
        {isLoading ? <Spinner /> :
          <Row>
            <Col xs={6} md={6}>
              <div className="employee-details-info">
                <h2>{employee?.username}</h2>
                <p>Email: {employee?.email}</p>
                <p>Qualification: {employee?.qualification}</p>
                <p>Interest: {employee?.interest}</p>
                <p>Jobtitle: {employee?.jobtitle}</p>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div className="employee-details-image-container">
                
              <img src={`data:image/jpeg;base64,${employee?.cover?.data}`} />
              </div>
            </Col>
          </Row>
        }
      </div>
    </>
)
}