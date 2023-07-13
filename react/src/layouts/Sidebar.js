import { Alert, Button, Col, Nav, NavItem, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/authentication";

const navigation = [
 
  {
    title: "Dashboard",
    href: "/home/",
    icon: "bi bi-house",
  },
  {
    title: "Admins",
    href: "/home/teacher",
    icon: "bi bi-person-fill",
  },
  {
    title: "Categories",
    href: "/home/mySlots",
    icon: "bi bi-bookmark-fill",
  },
  {
    title: "Employee",
    href: "/home/employee",
    icon: "bi bi-person-fill",
  },

  {
    title: "Designations",
    href: "/home/groups",
    icon: "bi bi-people",
  },
  {
    title: "Project",
    href: "/home/projects",
    icon: "bi bi-kanban",
  },
  {
    title: "Pending Tasks",
    href: "/home/PendingTasks",
    icon: "bi bi-link",
  },
  {
    title: "Completed Tasks",
    href: "/home/FacultyProjects",
    icon: "bi bi-link",
  },
  {
    title: "Reports",
    href: "/home/timelines",
    icon: "bi bi-calendar2-week",
  },
  {
    
    title: "Templates",
    href: "/home/template",
    icon: "bi bi-file-earmark-break-fill",
  },
  {
    title: "Setting",
    href: "/home/links",
    icon: "bi bi-link",
  },
  {
    title: "Notice Board",
    href: "/home/notice",
    icon: "bi bi-card-checklist",
  },
  {
    title: "Notification",
    href: "/home/notification",
    icon: "bi bi-bell",
  }
]; 

const Sidebar = () => {

  const {data:auth} = useAuth()
  
// Filter navigation items based on user type and permissions
const filteredNavigation = navigation?.filter(item => {
  // Assuming you have a function to check if a user has permission for a given item
  return hasPermission(auth?.type, item);
});

// Function to check if a user has permission for a given navigation item
function hasPermission(userType, item) {
  // Define the mapping between user types and permissions
  const userTypePermissions = {
    Admin: ["Dashboard","Admins","Categories","Employee","Designations","Project","Pending Tasks","Completed Tasks","Reports","Templates","Setting"],
    // Teacher: ["Home", "Bookings", "Project", "Past Endeavors", "Faculty Projects", "Timelines", "Templates", "Important Links", "Notice Board"],
    Employee:  ["Home", "Teacher", "Bookings", "Past Endeavors", "Faculty Projects", "Timelines", "Templates", "Important Links", "Notice Board","Notification"]
    // Add more user type-permission mappings as needed
  };
 
  // Check if the user type has permission for the item
  const allowedPermissions = userTypePermissions[userType] || [];
  return allowedPermissions.includes(item.title);
}

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">

        {auth?.type =='Employee' && auth?.meet?.absenceCount > 2 ? <Row>
        <Col >
         <Alert color='danger' className='float-end'>
        You have missed 3 or more meetings.
          </Alert>
        </Col>
      </Row> : "" }  

          {filteredNavigation?.map((navi, index) => (

            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
