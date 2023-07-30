import React, { useState,useEffect } from 'react';

import { useAuth } from "../../hooks/authentication";
import { useEditAdminSlot, useAdminSlots } from "../../hooks/admin";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faCheckCircle, faCheckSquare, faComment, faComments, faEye, faHandshake, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


import { Row,Col,Table, Button
} from "reactstrap";
import { EmployeeNone } from '../request/EmployeeNone';
import { AdminViewRequest } from '../request/AdminViewRequest';
import { useNavigate } from 'react-router-dom';

export const SlotList=(props)=>{
  
  const { data: auth } = useAuth()
  const navigate = useNavigate()
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const slots=props.slots
  
  return(
    <Row>
    <Col>
    <Table striped bordered responsive>
    <thead>
    <tr>
    <th>Date</th>
    <th>Time</th>
    <th>Availablity</th>
    
    <th>Action</th> 
    
    </tr>
    </thead>
    <tbody>
    {slots?.map((slot, index) => (
      
      <tr > 
        <td>{formatDate(slot.date)}</td>

      <td>{slot.time}</td>
      <td >{!slot.isBooked ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" size="xl" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} color="red" size="xl" />
          )}</td>
          
          <td>
          
          {(slot.status === 'none' && auth.type=='Admin' ) && (
            <EmployeeNone slot={slot} /> 
            )}
            
            {(slot.status === 'pending'  && auth.type=='Admin') && (
              <Button color='secondary'>  <FontAwesomeIcon icon={faHourglassHalf} size="xl" /> Pending </Button>
              )}
              
              {(slot.status === 'pending'  && auth.type=='Admin') && (
                < AdminViewRequest slot={slot} />
                )}
                
                {slot.status === 'accept' && (
                  <> <Button color='success'>  <FontAwesomeIcon icon={faCheckSquare} size="xl" /> Accepted </Button> {'     '}
                  
                  {( slot.group.employee2 == auth?.id) || (auth?.type == 'Admin') ? <>
                    <Button color='primary' onClick={()=>navigate(`/home/chat/${slot.group._id}`)}><FontAwesomeIcon  icon={faComments}  size="xl" /> Chat </Button> {'     '}
                    <Button color='danger'  onClick={()=>navigate(`/home/meeting/${slot.group._id}`)}> <FontAwesomeIcon icon={faHandshake} size="xl" /> Meetings </Button>
                   
                    </>:"" }
                    
                    
                    </>
                    )}
                    
                    </td>
                    
                    </tr>
                    ))}
                    </tbody>
                    </Table>
                    </Col>
                    </Row>
                    )
                  }