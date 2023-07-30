import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useAddEmployee } from '../hooks/employee';
import '../employee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { All } from '../components/employee/All';
import { useAuth } from '../hooks/authentication';

export function Employee() {


    const addEmployee = useAddEmployee()
    const { data: auth } = useAuth()

    const [username, setUserName] = useState('');
    const [qualification, setQualification] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [interest, setInterest] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    

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

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let add = await addEmployee.mutateAsync({ username, email, password,selectedImage, qualification,interest,
            jobtitle})
        
        setUserName('')
        setEmail('')
        setPassword('')
        setQualification('')
        setInterest('')
        setJobtitle('')
        toggleModal();
    };


    return (
        <>
            <Container >
               
                <h1 class="manager-heading">
                      < i color="primary" class="bi bi-person-fill"></i>
                     Employee
                </h1>
                <br />
                <Container className='content-header'>
                    <Row>

                        {(addEmployee.isSuccess) ?
                            <Alert color='success'>Employee Added!</Alert> : ""}

                        <Col lg={12}>
                            {auth?.type == 'Manager' ?
                                <Button className="button" onClick={() => setModal(!modal)}><i class="bi bi-plus">  </i>   Add New</Button> : "  "}
                            <Modal isOpen={modal} toggle={() => setModal(!modal)} size="xl">
                                <ModalHeader className="underline" toggle={() => setModal(!modal)}>

                                    <b style={{ fontSize: "26px" }}>Add Employee Details</b>
                                </ModalHeader>
                                <ModalBody>
                                    {(addEmployee.isError) ?
                                        <Alert color='danger'>{addEmployee.error.response.data.message}</Alert> : ""}

<Form onSubmit={handleSubmit}>
           
           <Row><Col> <FormGroup>
            <Label className="label">Username</Label>
            <Input className="input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter employee's name"
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
           </Row>


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
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
                            
                            <h2 className="sub-heading">List of Employees</h2>
                           
                            <All />

                        </Col>
                    </Row>
                </Container>
            </Container>

        </>
    )
}