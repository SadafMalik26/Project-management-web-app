import { useProjects } from "../hooks/project"
import { Badge, Table } from "reactstrap"

export const Projects = () => {
    const {data:groupProjects} = useProjects()
    return(
        <>
        <h2 className="sub-heading">List of Projects</h2>
        <Table responsive bordered style={{ textAlign: 'center' }}>
        <thead>
        <tr>
        <th>Project Name</th>
        <th>Group</th>
        <th>Supervisor</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {groupProjects?.map((groupProject, index) => (
            <tr >
            <td>{groupProject?.project?.title}</td>
            <td>
                <h5><Badge color="info" className="m-2">{groupProject?.employee2?.username}</Badge>
           </h5></td>
            <td>{groupProject?.supervisor?.username}</td>
            <td><Badge color="warning">{groupProject?.project?.status}</Badge></td>
            
            </tr>
            ))}
            </tbody>
            </Table>
            </>
            )
            
        }