import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useAddAdmin} from '../hooks/admin';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faAdd} from '@fortawesome/free-solid-svg-icons'
import { All } from '../components/admin/All';
import { useAuth } from '../hooks/authentication';

export function Admin() {
    
    
    const addAdmin = useAddAdmin()
    const { data: auth } = useAuth()
    
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [qualification, setQualification] = useState('');
    const [interest, setInterest] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [experience, setExperience] = useState('');
    const [role, setRole] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [joiningdate, setjoiningdate] = useState('');
    
    const [modal, setModal] = useState(false);
    
    const handleUserEmail = (email) => {
        let isEmailValid = email.match(/^([\w.%+-]+)@(admin.com)/i);
        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }
    
    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }
    
    const toggleModal = () => {
        setModal(!modal);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let add = await addAdmin.mutateAsync({ username, email, password,selectedImage, qualification,interest,
            jobtitle,experience,role,phoneno,joiningdate })
        
        setUserName('')
        setEmail('') 
        setPassword('')
        setQualification('')
        setInterest('')
        setJobtitle('')
    setExperience('')
    setRole('')
    setPhoneno('')
    setjoiningdate('')
        toggleModal();
    };
    
    
    
    return (
        <>
         <Container >
               
               <h1 class="manager-heading">
                     < i color="primary" class="bi bi-star-fill"></i>
                    Admin
               </h1> <br />
        <Container className='content-header'>
        <Row>
        
        {(addAdmin.isSuccess) ?
            <Alert color='success'>Admin Added!</Alert> : "" }

        <Col lg={12}>
        {auth?.type == 'Manager' ?
       <Button className="button" onClick={() => setModal(!modal)}><i class="bi bi-plus">  </i>   Add New</Button> : "  "}

        <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader className="underline" toggle={toggleModal}>
        <b style={{ fontSize: "26px" }}>Add Admin Details</b>
        </ModalHeader>
        <ModalBody> 

        {(addAdmin.isError) ?
            <Alert color='danger'>{addAdmin.error.response.data.message}</Alert> : "" }
            
            <Form onSubmit={handleSubmit}>
           
           <Row><Col> <FormGroup>
            <Label className="label">Username</Label>
            <Input className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter admin's name"
            value={username}
            onChange={(e) => setUserName(e.target.value)} />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
            <Label className="label">Email</Label>
            <Input className="input"
            type="email"
            name={email}
            value={email}
            valid={emailError}
            invalid={!emailError}
            onChange={(e) => handleUserEmail(e.target.value)} />
            </FormGroup>
            </Col></Row> 

            <Row><Col>
            <FormGroup>
            <Label className="label">Job Title</Label>
            <Input className="input"
            type="text"
            name="jobtitle"
            id="jobtitle"
            placeholder="E.g MERN Stack Developer"
            value={jobtitle}
            onChange={(e) => setJobtitle(e.target.value)} />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
            <Label className="label">Years of Experience</Label>
            <Input className="input"
            type="text"
            name="experience"
            id="experience"
            placeholder="E.g 2,3,4 years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)} />
            </FormGroup>
            </Col></Row>


            <Row><Col>
            <FormGroup>
            <Label className="label">Qualification</Label>
            <Input className="input"
            type="text"
            name="qualification"
            id="qualification"
            placeholder="Enter admin's qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)} />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
            <Label className="label">Interests</Label>
            <Input className="input"
            type="text"
            name="interest"
            id="interest"
            placeholder="Enter admin's interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)} />
            </FormGroup>
            </Col></Row>


            <Row><Col>
            <FormGroup>
            <Label className="label">Role</Label>
            <Input className="input"
            type="textarea"
            name="role"
            id="role"
            placeholder="Enter admin's Role"
            value={role}
            onChange={(e) => setRole(e.target.value)} />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
            <Label className="label">Phone Number</Label>
            <Input className="input"
            type="text"
            name="phoneno"
            id="phoneno"
            placeholder="Enter admin's Phone Number"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)} />
            </FormGroup>
            </Col></Row>

           <Row><Col>
            <FormGroup >
            <Label
            className="label" 
            >
            Date Of Joining
            </Label>
            <Input
                  type="date"
                  name="date"
                  id="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={joiningdate}
                  onChange={(e)=>setjoiningdate(e.target.value)}
                />
             
            </FormGroup>
            </Col> <Col>
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
            </Col></Row>
            
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
            <Button color="primary" onClick={handleSubmit}>Add Admin</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
            <h2 className="sub-heading">List of Admins</h2>
            
            <hr className="hr1"></hr>
            <br/>
            <All />
            
            </Col>
            </Row>
            </Container></Container>
            </>
            )
        }