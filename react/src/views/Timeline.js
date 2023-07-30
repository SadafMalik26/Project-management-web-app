import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../timeline.css';
import { useEditTimeline, useTimeline } from '../hooks/timeline';
import dateFormat from "dateformat";
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from 'date-fns';

export function Timeline() {
  
  const {data:timelines} = useTimeline()
  const update = useEditTimeline()
  
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [id, setId] = useState('');
  
  const updateTimeline = (timeline) => {
    setUpdatedTitle(timeline.title);
    setId(timeline._id);
    setUpdatedDate(timeline.date);
    setUpdatedDescription(timeline.description);
    setModalOpen(true);
  };
  
  const handleModalSubmit = async() => {
    var date = new Date(updatedDate).toLocaleDateString();
  const edit = await update.mutateAsync({id,date,updatedDescription})
  if(edit)
  setModalOpen(false);
    
    // Close the modal after the update is complete
  };
  
  return (
    <Container>
    <Row>
    <Col xs="9" lg={9} md={9} sm={9}>
    <div className="timeline mt-4">
    {timelines?.map((timeline, index) => (
      <div key={index} className="timeline-item">
      <div className="timeline-item-content">
      <h2>{timeline?.title}</h2>
      <p>{timeline?.description}</p>
      
      </div>
      <div className="timeline-item-date">
      <i className="bi bi-pen" onClick={()=>updateTimeline(timeline)}></i>
      <p>{dateFormat(timeline?.date, "ddd, mmmm dS, yyyy")}</p>
      
      </div>
      </div>
      ))}
      </div>
      </Col>
      </Row>
      
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
      <ModalHeader toggle={() => setModalOpen(false)}>Update Timeline</ModalHeader>
      <ModalBody>
      <h4>{updatedTitle}</h4>
      <FormGroup>
      <Label>Date</Label>
      <DatePicker
      className='form-control'
      selected={new Date(updatedDate)}
      onChange={(date) => setUpdatedDate(date)}
      dateFormat="yyyy-MM-dd"
      />
      </FormGroup>
      <FormGroup>
      <Label>Description</Label>
      <Input
      type="textarea"
      value={updatedDescription}
      onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      </FormGroup>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={handleModalSubmit}>Update</Button>{' '}
      <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
      </ModalFooter>
      </Modal>
      
      </Container>
      )
    }
    
    