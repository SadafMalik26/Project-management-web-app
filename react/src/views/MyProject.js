import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormText, Alert, Badge } from 'reactstrap';
import '../ProjectDescription.css';
import { useAddProject, useMyProjects, useUpdateProject } from '../hooks/project';
import DownloadPdf from '../utils/DownloadPDF';
import '../project.css'
import { arrayBufferToBase64 } from '../common/utils';
export const MyProject = () => {
    
    const addProject = useAddProject()
    const {isSuccess:myProjSuccess,data:group}=useMyProjects()

    const updateProject = useUpdateProject()
    
    const [selectedFile, setSelectedFile] = useState('')
    
    
    const updateDoc = async(status) =>{
       const update=await updateProject.mutateAsync({id:group?.project?._id,status,selectedFile})
    }
    console.log(group?.project)
    
    return (
        
        
        <Container className='prjectContainer'>
        
        {/* <Row className="project-header">
        <Button className="project-button" onClick={() => setModal(!modal)}>Add Project Details</Button>
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Add Project Details</ModalHeader>
        <ModalBody>
        
        <FormGroup>
        <Label for="exampleEmail">
        Title
        </Label>
        <Input
        name="title"
        placeholder="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        />
        </FormGroup>
        
        <FormGroup>
        <Label for="exampleText">
        Details
        </Label>
        <Input
        id="exampleText"
        name="text"
        type="textarea"
        onChange={(e) => setDetails(e.target.value)}
        />
        </FormGroup>
        
        <FormGroup>
        <Label for="exampleFile">
        Requirements
        </Label>
        <Input
        id="exampleFile"
        name="file"
        type="file"
        onChange={(e) => setRequirements(e.target.files[0])}
        
        />
        </FormGroup>
        <FormGroup>
        <Label for="exampleFile">
        Proposal
        </Label>
        <Input
        id="exampleFile"
        name="file"
        type="file"
        onChange={(e) => setProposal(e.target.files[0])}
        
        />
        </FormGroup>
        <FormGroup>
        <Label for="exampleFile">
        Defense
        </Label>
        <Input
        id="exampleFile"
        name="file"
        type="file"
        onChange={(e) => setDefense(e.target.files[0])}
        
        />
        </FormGroup>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={() => submitProject()}>Add Project</Button>{' '}
        <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
        </ModalFooter>
        </Modal>
    </Row> */}
    {myProjSuccess ? group ? <>
        <Row>
        <Col className="project-header">
        <h1>{group?.project?.title}</h1>
        </Col>
        </Row>
        <Row>
        <Col xl={8} sm={8} md={8} className="project-section">
        <h2>Details</h2>
        <p>{group?.project?.details}</p>
        
        </Col>
        <Col xl={4} sm={4} md={4} className="project-section ">
        {group?.project?.requirement_document ? <> Requirement Document   <DownloadPdf fileName='requirement' buffer={group.project?.requirement_document?.data.data} />
        </> : "" }
        {group?.project?.proposal_document ? <> Proposal Document <DownloadPdf fileName='proposal' buffer={group.project?.proposal_document?.data} />
        </> :""}
        {group?.project?.defense_document ? <> Defense Document <DownloadPdf fileName='defense' buffer={group.project?.defense_document?.data.data} />
        </>  :""}
        {group?.project?.mid_document ? <> Mid Document <DownloadPdf fileName='mid' buffer={group.project?.mid_document?.data.data} />
        </>  :""}
        {group?.project?.final_document ? <>  Final Document <DownloadPdf fileName='final' buffer={group.project?.final_document?.data.data} />
        </> :""}
        
        </Col>
        </Row>
        
        <Row>
        <Col className="project-section">
        <h2>Group Members</h2>
        <ul>
        
        <li key='requirement'>{group?.employee2?.username}</li>
       </ul>
        </Col>
        </Row>
        {group?.supervisor ? 
            <Row>
            
            <Col className="project-section">
            <h2>Supervisor</h2>
            <div className="supervisor-info">
            <div>
            
            <img  className="supervisor-avatar" src={`data:image/jpeg;base64,${arrayBufferToBase64(group?.supervisor?.cover?.data?.data)}`} />
            
            </div>
            <div className="supervisor-details">
            <h3>{group?.supervisor?.username}</h3>
            <p>{group?.supervisor?.email}</p>
            </div>
            </div>
            </Col>
            </Row> : <Alert color='info'>You're not assigned any supervisor yet!</Alert>}
            </> : "" : ""}
            
            <hr />
            
            <Badge bg='yellow' className='m-2'>{group?.project?.status}</Badge>
            
            {group?.project?.status != 'completed' ? <>
            <FormGroup>
            <Input
            id="exampleFile"
            name="file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            </FormGroup>
            </> : "All docs Submitted!" }
            
            {group?.project?.status == 'accepted' ? <>
            <Button onClick={()=>updateDoc('requirement')}>Update</Button>
            </> : ""}

            {group?.project?.status == 'requirement' ? <>
            <Button onClick={()=>updateDoc('defense')}>Update</Button>
            </> : ""}
            
            {group?.project?.status == 'defense' ? <>
            <Button onClick={()=>updateDoc('mid')}>Update</Button>
            </> : ""}

            {group?.project?.status == 'mid' ? <>
            <Button onClick={()=>updateDoc('completed')}>Update</Button>
            </> : ""}

            </Container>
            
            
            );
        };
        
        