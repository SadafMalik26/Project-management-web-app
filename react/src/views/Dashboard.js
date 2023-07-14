import { Card, CardBody, CardTitle, CardText, Row, Col, CardSubtitle, Alert, CardFooter } from 'reactstrap';
import { useEmployeeCount } from '../hooks/employee';
import { Link } from 'react-router-dom';
import { usePendingTasks} from '../hooks/pendingtasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';



export function Dashboard() {
  
  
  const { data: employeeCount } = useEmployeeCount()
  const navigation = [
    {
      title: <span style={{ color: 'white' }}>Pending Tasks</span>,
      href: "/Dashboard/PendingTasks",
      icon: "bi bi-link",
    },
  ];
  
  return (
    <div className="container">
        
        <h2 style={{ fontSize: '40px', color: '#3273ab', fontWeight: 'bold' }}>
  <FontAwesomeIcon icon={faCog} style={{ marginRight:'10px' }} />
  Dashboard
</h2><br/>
    
    <Row>
    <Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Admin</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Members</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Categories</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card yee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Designtion</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
    </Row>
    <Row>
    <Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Project</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Task</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Completed Task</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
<Col className="col-md-3 mb-3">
  <Card className="custom-card employee-card">
    <h2>{employeeCount}</h2>
    <CardTitle tag="h4">Productivites</CardTitle> 
    <br/>
     <CardFooter style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', textAlign: 'center' }}>

    <Link to="/go/demo"   style={{ backgroundColor: 'rgba(67, 122, 185, 0.771)', color: 'white' }}>
      View demo
      <svg
        className="css-1k6cidy e1koaidd2"
        fill="none"
        viewBox="0 0 12 12"

        style={{marginLeft: '5px', width: '12px', height: '12px' }}
      >
        <path d="M6.26154.536743l-.85527.820367 3.84 3.97963H.676086v1.32655H9.24627l-3.84 3.97961.85527.8204 5.06186-5.28874v-.34909L6.26154.536743z"></path>
      </svg>
    </Link>

    </CardFooter>
      </Card>
</Col>
    </Row>
    
    <div>
      {navigation.map((item, index) => (
        <a key={index} href={item.href}>
          {item.title} <i className={item.icon}></i>
        </a>
      ))}
    </div>
    <Card className="ongoing-projects-card">
    <CardBody>
      
    <CardTitle tag="h5">Ongoing Projects</CardTitle>
    <div className="d-flex align-items-center mb-3">
      <CardSubtitle tag="h6" className="mb-0 ml-3">
    
    </CardSubtitle>
    </div>
    
      </CardBody>
      </Card>
      
      
      
      </div>
      )
    }