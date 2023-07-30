import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { useEmployee } from '../hooks/employee';
import { useAddGroup, useGroups } from '../hooks/group';

export const Group = () => {

    const [modal, setModal] = useState(false);
    
    const { data: groups } = useGroups()
    

    return (
        <Container>

            <h2  className="sub-heading" >List of Groups</h2>
            <Table responsive bordered style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Employee 2</th>
                        <th>Supervisor</th>
                        <th>Project Name</th>
                    </tr>
                </thead>
                <tbody>
                {groups?.map((group, index) => (

                    <tr >
                        <td>{group.employee2?.username}</td>
                        <td>{group?.supervisor?.username}</td>
                        <td>{group.project?.title}</td>

                    </tr>
                ))}
                </tbody>
            </Table>

        </Container>
    );
};

