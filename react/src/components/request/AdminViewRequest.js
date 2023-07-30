import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {
    Modal, ModalBody, ModalFooter, ModalHeader, Button,
    Card, CardText, CardBody, CardTitle
} from 'reactstrap';
import './ProjectCard.css'; // Import the custom CSS file
import { useEditAdminSlot } from '../../hooks/admin';

export const AdminViewRequest = (props) => {

    const slot = props.slot
    const [modal, setModal] = useState(false);
    const updateSlotStatus = useEditAdminSlot()

    const acceptRequest = async (status) => {
        const accept = await updateSlotStatus.mutateAsync({ slot: { id: slot._id, status } })
        if (accept)
            setModal(!modal)
    }
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <FontAwesomeIcon onClick={() => setModal(!modal)} icon={faEye} color="green" size="xl" />

            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Request Details</ModalHeader>
                <ModalBody>

                    <Card className="unique-card">
                        <CardBody>
                            <CardTitle tag="h3">Group Members:</CardTitle>
                            <div className="group-members">
                                <span className="member">{slot.group?.employee2?.username}</span>
                            </div>
                        </CardBody>
                        <CardBody>
                            <CardTitle tag="h3">Project Name:</CardTitle>
                            <CardText>{slot.group?.project?.title}</CardText>
                        </CardBody>
                        <CardBody>
                            <CardTitle tag="h3">Status:</CardTitle>
                            <CardText>{slot.status}</CardText>
                        </CardBody>
                        <CardBody>
                            <CardTitle tag="h3">Project Details:</CardTitle>
                            <CardText>{slot.group?.project?.details}</CardText>
                        </CardBody>
                        <CardBody>
                            <CardTitle tag="h3">Documents:</CardTitle>
                        </CardBody>
                    </Card>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => acceptRequest("accept")}>
                        Confirm it.
                    </Button>{' '}
                    <Button color="danger" onClick={() => acceptRequest("reject")}>
                        Delete it.
                    </Button>



                </ModalFooter>
            </Modal>

        </>
    )
}