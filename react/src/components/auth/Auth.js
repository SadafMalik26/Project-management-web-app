import {
    Card,Container
} from 'reactstrap';


import { Outlet } from 'react-router-dom';

export function Auth() {

    return (
        <Container
            className=" center"
            fluid
            style={{
                backgroundColor:"lightgrey",
            }}
        >
            <Card
                style={{
                    width: '30rem'
                }}>

                <Outlet />

            </Card>
        </Container>
    )
}