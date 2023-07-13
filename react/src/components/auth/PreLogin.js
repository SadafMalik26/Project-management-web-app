import {
    CardBody,
    Button,
} from 'reactstrap';

import logo1 from '../../images/logo1.jpg'

import { useNavigate } from 'react-router-dom';

export function PreLogin() {

    const navigate = useNavigate()

    const login = (type) => {
        navigate(`/${type}`);
    }

    return (

        <CardBody
        className='loginBG text-center justify-content-between'
        style={{ backgroundColor: 'white' }}
>
            <div>
                <img alt='logo1' src={logo1} width={200} />
            </div>
             <br/><br/>
            <h4>Login As</h4>

            <Button
                className='m-2'
                color='danger'
                onClick={() => login('Admin')}>
                Admin
            </Button>

            {/* <Button
                className='m-2'
                color='primary'
                onClick={() => login('Teacher')}>
                Teacher
            </Button> */}

            <Button
                className='m-2'
                color='warning'
                onClick={() => login('Employee')}>
                Employee
            </Button>

        </CardBody>

    )
}