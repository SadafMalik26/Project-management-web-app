import { useEmployeeDetails } from "../../hooks/employee";
import {
   Row, Col, Spinner
} from "reactstrap";

export const ProfileDetails = (props) => {

  const { isLoading, data: employee } = useEmployeeDetails(props.id);

return(
    <>
       <div className="employee-details-container mb-4">
        {isLoading ? <Spinner /> :
          <Row>
            <Col xs={6} md={6}>
              <div className="employee-details-info"> 
                <h2 style={{ fontSize: "30px" }}>{employee?.username}</h2><br></br>
                <p style={{ fontSize: "20px" }}><strong>Email:</strong> {employee?.email}</p>
                {/* <p style={{ fontSize: "20px" }}><strong>Qualification:</strong> {teacher?.qualification}</p> */}
               
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