import React, { useState , useRef  } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';
import '../ChatLayout.css'; // Import the custom CSS file
import { useGroupChat, useSendMessage } from '../hooks/group';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/authentication';
import { useEffect } from 'react';
import { arrayBufferToBase64 } from '../common/utils';

export const Chat = () => {

  const bottomEl = useRef(null);

  const {id} = useParams()

  const {data:auth} = useAuth()

  const {data:chats}=useGroupChat(id)
  const send = useSendMessage()

  const [message, setMessage] = useState('');


  const sendMessage =async () => {
    const sendChat = await send.mutateAsync({message,id})
    if(sendChat){
      scrollToBottom()
      setMessage('')
    }
  }

  const scrollToBottom = () => {
  };
  
 
  
  return (
    <Container className="chat-container">
    <Row>
    <Col >
    <Card  className="chat-card">
    <CardBody>
    <div  ref={bottomEl} className="message-bubble">
    {chats?.map((msg, index) => (
      <div
      key={index}
      className={`message ${msg.userType === 'Admin' ? 'Admin' : 'Employee'} ${
        msg.sender._id === auth.id ? 'right-align' : 'left-align'
      }`}
      >
         <img  className="rounded-circle m-1" width="45" height="45" src={`data:image/jpeg;base64,${arrayBufferToBase64(msg.sender?.cover?.data?.data)}`} />

         
      <span className="sender">{msg.sender?.username}:</span>
      <span className="text">{msg.message}</span>
      </div>
      ))}
      </div>
      </CardBody>
      </Card>
      <div  className="message-form">
      
      {auth?.type != "Manager" ? 
      <Row >
      <Col xl={11}>
      <FormGroup>
      <Input
      type="textarea"
      name="message"
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      placeholder="Type your message..."
      />
      </FormGroup>
      </Col>
      <Col>
      
      <Button onClick={()=>sendMessage()} color="primary" type="submit">
      Send
      </Button>
      
      </Col>
      </Row> : "" }
      
      </div>
      </Col>
      </Row>
      </Container>
      );
    };
    
    