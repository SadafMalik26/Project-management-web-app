import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft}  from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Form, FormGroup, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAddPendingTask, usePendingTasks ,useDeletePendingTask} from '../hooks/pendingtasks';
import { useAuth } from '../hooks/authentication';


    export const PendingTasks = () => {
        const {data:auth} = useAuth()
        const [title,setTitle]=useState("")
        const [supervisorname,setSupervisorname]=useState("")
        const [membersname,setMembersname]=useState("")
        const [description,setDescription]=useState("") 
        const [url,setUrl]=useState("")
        const [inyear,setInyear]=useState("")
        const deletePendingTask = useDeletePendingTask()
        const addPendingTask = useAddPendingTask()
        const {data:PendingTasks}=usePendingTasks()
         
        const [modal, setModal] = useState(false);
        
        const toggleModal = () => {
            setModal(!modal);
        };
        
        const add = async() => {
            const pendingtask= await addPendingTask.mutateAsync({title,supervisorname,membersname,description,inyear,url})
            if(pendingtask)
            {
                toggleModal()
                setTitle("")
                setSupervisorname('')
                setMembersname('')
                setDescription("")
                setInyear('')
                setUrl("")
            }
        }
      
        const handleChange = (event) => {
            const year = new Date(event.target.value).getFullYear();
            setInyear(year.toString().slice(-4));
          };
        return (
             
            <div>
        {auth?.type=="Teacher" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> <strong>Add Past Endeavors</strong></Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={toggleModal}>Add PendingTask</ModalHeader>
            <ModalBody>
            <Form >
            <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" placeholder="Enter Title"  />
            </FormGroup>
            <FormGroup>
            <Label for="supervisorname">Supervisor Name</Label>
            <Input type="supervisorname" onChange={(e) => setSupervisorname(e.target.value)} value={supervisorname} name="Supervisorname" id="supervisorname" placeholder="Enter Supervisor Name"  />
            </FormGroup>
            <FormGroup>
            <Label for="membersname">Members Name</Label>
            <Input type="membersname"  onChange={(e) => setMembersname(e.target.value)} value={membersname} name="Membersname" id="membersname" placeholder="Enter Group Member Name's"  />
            </FormGroup>

            <FormGroup>
    <Label for="Description">Description</Label>
    <textarea type="text"  onChange={(e) => setDescription(e.target.value)}  name="description"id="description"
  placeholder="Enter Description" rows="3"  cols="50" spellcheck="false" autocapitalize="off" autocorrect="off"
  /></FormGroup>

            
            <FormGroup><Label for="url">Github URL</Label>
            <Input type="url" name="url"  onChange={(e) => setUrl(e.target.value)} value={url} id="url" placeholder="Enter Github url"  />
            </FormGroup>
            <FormGroup>
            <Label for="inyear">In Year</Label>
             <Input type="inyear" name="inyear" id="inyear"  onChange={handleChange} value={inyear} required placeholder="Enter year"  />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={()=>add()} >Add Link</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
            <h2 style={{ fontSize: "30px" }}>Past Endeavors</h2><br></br>
            
            <Table>
            <thead>
            <tr >
            <th><strong>Title</strong></th>
            <th><strong>Supervisor Name</strong></th>
            <th><strong>Group Member Name's</strong></th>
            <th><strong>Description</strong></th>
            <th><strong>Github Link</strong></th>
            <th><strong>In Year</strong></th>
             {auth?.type=="Admin" ? 
        <th><strong>Actions</strong></th>
        : "" }
          
            </tr><br></br>
            </thead>
            <tbody>
            {PendingTasks?.map((pendingtask, index) => (
                
                <tr   key={index} className="border-top">
                <td>{pendingtask.title}</td>
               <td>{pendingtask.supervisorname}</td>
               <td>{pendingtask.membersname}</td>
               <td>{pendingtask.description.split('\n')}</td>
               <td><a href={pendingtask .url} target="_blank" rel="noopener noreferrer">Go to Past Endeavors </a></td>
               <td>{pendingtask.inyear}</td> 
               <td> 
               {auth?.type=="Teacher" ? 
            <>
            
                <Button color="danger"  onClick={()=>deletePendingTask.mutate(pendingtask._id)}><FontAwesomeIcon icon={faDeleteLeft} /></Button>{' '}
                </>
            : "" }  </td>
               </tr>
                ))}
                </tbody>
                </Table>
                
                </div>
                );
            };
            
            