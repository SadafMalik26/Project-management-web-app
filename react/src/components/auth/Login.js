import { useState } from 'react';

import {
    CardBody,
    Button,
    Form,
    FormGroup,
    span,
    Input,
    Alert,
    InputGroup
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '../../employee.css';
import logo1 from '../../images/logo1.jpg'

import { useNavigate, useParams } from 'react-router-dom';

import { useLogin } from '../../hooks/authentication';

export function Login() {

    //react query hook
    const signIn = useLogin()

    const navigate = useNavigate()
    const { type } = useParams()

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleUserEmail = (email) => {
       
        let isEmailValid
        let pattern
        if (type == 'Manager')
        pattern = /^(manager+)@(manager.com)/i
        else if (type == 'Admin')
        pattern = /^([\w.%+-]+)@(admin.com)/i
        else
        pattern = /^([\w.%+-]+)@(gmail.com)/i
       

        isEmailValid = email.match(pattern)


        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }

    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }

    const login = async () => {
        let loggedIn = await signIn.mutateAsync({ email, password, type })
        if (loggedIn)
            navigate('/home');
    }

  
    return (
        
        <div>
           
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</link>
            {type == "Manager" && (
                <h1 className='main-heading '>
                    <i style={{ color: 'primary',marginRight: '10px' }} className="fas fa-user-cog"></i>
                        Login as Manager <br /><br /></h1>)}
            {type == "Admin" && (
                <h1 className='main-heading '>
                      <i style={{ color: 'primary', marginRight: '10px' }} className="fas fa-user-tie"></i>
                    Login as Administrator<br /><br /></h1>)}
            {type == "Employee" && (
                <h1 className='main-heading ' >
                    <i style={{ color: 'primary',marginRight: '10px' }} className="fas fa-user"></i>
                    Login as Employee<br /><br /></h1>)}
            <CardBody >
                <div className='text-center'>
                    <img alt='logo1' src={logo1} width={250} />
                </div>
                <br />
                {signIn.isError ? (
                    <Alert color="danger">
                        Invalid Credentials
                    </Alert>
                ) : null}
                <Form>
                    <FormGroup>
                        <Input
                            id="email"
                            name={email}
                            value={email}
                            valid={emailError}
                            invalid={!emailError}
                            onChange={(e) => handleUserEmail(e.target.value)}
                            placeholder="Enter Email"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <Input
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
                                onClick={() => setShowPassword(!showPassword)} style={{ backgroundColor: 'white' }}
                            >
                                <FontAwesomeIcon style={{ backgroundColor: 'black' }} icon={showPassword ? faEye : faEyeSlash} />
                            </Button>
                        </InputGroup>
                        <div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <input type="checkbox" id="rememberMe" />
      <label htmlFor="rememberMe">Remember Me</label>
    </div>
    <label htmlFor="forgotPassword">
      <a href="#">Forgot Password?</a>
    </label>
  </div>
</div>

                    </FormGroup>

                </Form>

                <Button
                    className='float-end'
                    backgroundColor='primary'
                    block
                    style={{ borderRadius: '20px', height: '40px' }}
                    disabled={(emailError && passwordError) ? false : true}
                    onClick={() => login()}
                > Login
                </Button>
                <br /><br />
            </CardBody>
        </div>

    )
}