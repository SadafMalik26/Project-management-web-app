import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter
    , InputGroup,Alert } from 'reactstrap';
    import '../employee.css';
import {  useAddEmployee } from '../hooks/employee';
import { All } from '../components/employee/All';
import { useAuth } from '../hooks/authentication';



export function Employee() {
    
    const addEmployee = useAddEmployee()
    
    const {data:auth} = useAuth()

    
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [date, setDate] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    
    
    const [modal, setModal] = useState(false);
    
    const handleUserEmail = (email) => {
        let isEmailValid = email.match(/^([\w.%+-]+)@(gmail.com)/i);
        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }
    
    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let add = await addEmployee.mutateAsync({ username, email, password,phone,adress,date,selectedImage })
        setUserName('')
        setEmail('')
        setPassword('')
        setPhone('')
        setAdress('')
        setDate('')
        setModal(!modal)
    };
    
    return (
        <>
        <Container >
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</link>
<h1 class="admin-heading">
  <i class="fas fa-star"></i>
  Admin
</h1>
<br/>


        <Container className='content-header'>

        <Row>
        
        {(addEmployee.isSuccess) ?
            <Alert className='alert'>Employee Added!</Alert> : "" }
            <Col lg={12}>
            {auth?.type=="Admin" ? 
            <Button className="float-end" style={{ backgroundColor: '#3273ab' }} onClick={()=>setModal(!modal)}><i class="bi bi-plus">  </i>   Add New</Button> : "  " }
            
            
            <Modal isOpen={modal} toggle={() => setModal(!modal)} size="xl">
  <ModalHeader toggle={() => setModal(!modal)}>
    
    <b style={{fontSize:"26px"}}>Add Employee Details</b>
  </ModalHeader>
  <ModalBody>


            {(addEmployee.isError) ?
                <Alert style={{ Color: '#3273ab' }} >{addEmployee.error.response.data.message}</Alert> : "" }
                
                <Form onSubmit={handleSubmit}><Form onSubmit={handleSubmit}>
  <Row className="form-row">
    <Col>
    <FormGroup className="form-group">
      <Label className="label">Username</Label>
      <Input
        className="input"
        placeholder="Enter Employee name"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
    </FormGroup></Col>
    <Col>
    <FormGroup className="form-group">
      <Label className="label">Email</Label>
      <Input  className="input"
        type="email"
        name={email}
        value={email}
        valid={emailError}
        invalid={!emailError}
        onChange={(e) => handleUserEmail(e.target.value)}
      />
    </FormGroup></Col>
  </Row>
</Form>
<Row><Col>
                <FormGroup>
                <Label className="label">Phone Number</Label>
                <Input className="input"
                placeholder=" Enter a valid Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} />
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                <Label className="label">Home Address</Label>
                <Input className="input"
                
                placeholder=" Enter Your Home Address"
                value={adress}
                onChange={(e) => setAdress(e.target.value)} />
                </FormGroup>
                </Col></Row>

                <FormGroup>
                
                <Label className="label">Date of Creation</Label>
                <Input className="input"
                type="date"
                name="date"
                value="date"
                onChange={(e) => setDate(e.target.value)} />
                </FormGroup>
                

                <FormGroup >
                <Label
               className="label"
                >
                Cover
                </Label>
                <Input className="input2"
                id="image"
                name="image"
                type="file"
                onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                }}
                />
                
                </FormGroup>
                
                <FormGroup>
                <Label className="label">
                Password
                </Label>
                <InputGroup>
                <Input className="input"
                id="examplePassword"
                name={password}
                value={password}
                valid={passwordError}
                invalid={!passwordError}
                onChange={(e) => handleUserPassword(e.target.value)}
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                />
                <Button
                onClick={() => setShowPassword(!showPassword)}
                >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
                </InputGroup>
                </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Add Employee</Button>{' '}
                <Button color="secondary" onClick={()=>setModal(!modal)}>Cancel</Button>
                </ModalFooter>
                </Modal>
                
                <All />
                
                </Col>
                </Row>
                </Container>
                </Container>
                </>
                )
            }