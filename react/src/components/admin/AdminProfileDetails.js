import { useAdminQualificationDetails } from "../../hooks/admin";
import { Row, Col, Spinner } from "reactstrap";

export const AdminProfileDetails = (props) => {
  const { isLoading, data: admin } = useAdminQualificationDetails(props.id);

  return (
    <div className="admin-details-container2 mb-4">
    {isLoading ? (
      <Spinner />
    ) : (
      <Row>
        <Col xs={12} md={8}>
          <div className="admin-details-info">
            <h2>{admin?.username}</h2>
            <p>
              <strong>Email:</strong> {admin?.email}
            </p>
            <p>
              <strong>Qualification:</strong> {admin?.Qualification}
            </p>
            <p>
              <strong>Interest:</strong> {admin?.Interest}
            </p>
            <p>
              <strong>Jobtitle:</strong> {admin?.Jobtitle}
            </p>
            <p>
              <strong>Experience:</strong> {admin?.Experience}
            </p>
            <p>
              <strong>Role:</strong> {admin?.Role}
            </p>
            <p>
              <strong>Phoneno:</strong> {admin?.Phoneno}
            </p>
            <p>
              <strong>Joiningdate:</strong> {admin?.Joiningdate}
            </p>
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div className="image-frame">
            <img
              src={`data:image/jpeg;base64,${admin?.cover?.data}`}
              alt="Admin Cover"
              className="admin-image"
            />
            <div className="image-overlay">
              <h3>{admin?.username}</h3>
            </div>
          </div>
        </Col>
      </Row>
    )}
  </div>
  
  );
};
