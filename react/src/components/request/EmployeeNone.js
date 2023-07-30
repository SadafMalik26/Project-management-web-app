import React, { useState, useEffect } from 'react';
import "../../App.css";

import {
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button
    , FormGroup, Label, Input, TextField
} from "reactstrap";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { useEmployee } from "../../hooks/employee";
import { useAuth } from '../../hooks/authentication';
import { useEditAdminSlot } from "../../hooks/admin";
import { useWithoutGroupEmployees } from '../../hooks/group';
export const EmployeeNone = (props) => {

    const slot = props.slot
    
    const { isSuccess, data: auth } = useAuth()

    const updateSlotStatus = useEditAdminSlot()

    const [modal, setModal] = useState(false);

    const [title, setTitle] = useState('')

    const [requirements, setRequirements] = useState('')
    const [proposal, setProposal] = useState('')
    const [defense, setDefense] = useState('')
    const [expanded, setExpanded] = useState(false);

    const { isSuccess: success, data: withoutGroup } = useWithoutGroupEmployees()

    // const { isSuccess:employeeSuccess, data: employees } = useEmployee()
    const [details, setDetails] = useState('');
    const [employee2, setEmployee2] = useState([])
    const [valueEmployee2, setValueEmployee2] = useState('')
   
  
    
    useEffect(() => {
        if (success && withoutGroup) {
            var id = auth.id
            const newArray = withoutGroup?.filter(item => item._id !== id);
            setEmployee2(newArray)

        }
    }, [auth, withoutGroup]);


    const selectEmployee2 = (id) => {
        setValueEmployee2(id)
    }


    const requestSlot = async (id, status) => {
        const edit = await updateSlotStatus.mutateAsync({ slot: { id, status }, group: { valueEmployee2 }, project: { title, details }, proposal })
        if (edit)
            setModal(!modal)
    }


    return (

        <> <FontAwesomeIcon title="Add Request" onClick={() => setModal(!modal)} icon={faCalendarPlus} color="green" size="xl" />

            <Modal isOpen={modal} toggle={() => setModal(!modal)} size='lg'>
                <ModalHeader toggle={() => setModal(!modal)}>Add Request Details</ModalHeader>
                <ModalBody>

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleSelect">
                                    Select Employee 2
                                </Label>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={(e) => selectEmployee2(e.target.value)}
                                >
                                    <option>--SELECT--</option>
                                    {employee2?.map((employee, index) => (
                                        <option value={employee._id}>
                                            {employee.username}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>


                    </Row>

                    <FormGroup>
                        <Label for="exampleEmail">
                            Title
                        </Label>
                        <Input
                            name="title"
                            placeholder="title"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormGroup>

                    <Row>
                        <Col>
                            <FormGroup >
                                <Label for="exampleText">
                                    Details
                                </Label>
                                <Input
                            name="title"
                            placeholder="title"
                            type="text"
                            onChange={(e) => setDetails(e.target.value)}
                        />


                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="exampleFile">
                                    Proposal
                                </Label>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                    onChange={(e) => setProposal(e.target.files[0])}

                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => requestSlot(slot._id, "pending")}>Add Request</Button>{' '}
                    <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </>
    )

}