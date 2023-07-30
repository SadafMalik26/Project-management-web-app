import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
} from "reactstrap";
import "../Meet.css"; // Import the CSS file for styling
import { useAttendees } from "../hooks/group";
import { useParams } from "react-router-dom";

import { useAddMeeting, useMeetingPercenatge, useMeetings } from "../hooks/meeting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/authentication";

export const Meeting = () => {

    const { id } = useParams()
    const { data: auth } = useAuth()
    const addMeeting = useAddMeeting()
    const { data: meets } = useMeetings()
    const [modal, setModal] = useState(false);
    const { data: employees } = useAttendees(id)
    const toggleModal = () => setModal(!modal);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { isSuccess, data: percenatgeEmployees } = useMeetingPercenatge(id)
    console.log(percenatgeEmployees)

    const [attendees, setAttendees] = useState([]);
    const currentDate = new Date().toLocaleDateString();

    // Check if today's date is present in any meeting object
    const isDatePresent = meets?.some(
     (meeting) => meeting.currentDate === currentDate
    );

    useEffect(() => {
    // Set initial state of attendees with all employees and false attendance
     const initialAttendees = employees?.map((employee) => ({
     employee: employee._id,
     present: false,
        }));
     setAttendees(initialAttendees);
    }, [employees]);

    const addToArray = (e, employeeId) => {
    const isChecked = e.target.checked;

   setAttendees((prevAttendees) => {
    const updatedAttendees = prevAttendees.map((attendee) => {
        if (attendee.employee === employeeId) {
         return { ...attendee,
                        present: isChecked,
                    };
                }
                return attendee;
            });

            // If employee not found in attendees, add them to the array
            if (!prevAttendees.some((attendee) => attendee.employee === employeeId)) {
                updatedAttendees.push({ employee: employeeId, present: isChecked });
            }

            return updatedAttendees;
        });
      };

    const add = async () => {

        const addMeet = await addMeeting.mutateAsync({ attendees, id, currentDate, title, description })
        if (meets)
            
        setTitle('')
        setDescription('')
        toggleModal();
    }


    return (

        <div className="meet-add-container">


            <Row>
                {isSuccess ? Object.values(percenatgeEmployees).map((employee) => (
                    <Col className="col-md-4 mb-3">


                        <Card
                            className={`employee-card ${employee?.percentage < 75 ? 'alertAttendance' : ''}`}
                        >
                            <CardBody>
                                <CardTitle>{employee?.employee?.username}</CardTitle>
                                <h2>{employee?.percentage}%</h2>
                            </CardBody>
                        </Card>
                    </Col>

                )) : ""}
            </Row>


            {isDatePresent ? "" : auth?.type == 'Admin' ?
                <>
                    <h2>Add Meeting</h2>
                    <Card className="custom-card">
                        <CardBody>
                            <CardTitle tag="h5" className="custom-card-title">
                                {currentDate} - Meeting Details
                            </CardTitle>
                            {employees?.map((employee) => (
                                <FormGroup key={employee._id} check className="employee-item">
                                    <FormGroup>
                                        <Label className="label">Title</Label>
                                        <Input className="input" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} required placeholder="Enter Title" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="label" for="Description">Description</Label>
                                        <br />
                                        <textarea className="input" 
                                        type="text"
                                         onChange={(e) => setDescription(e.target.value)}
                                         name="description" 
                                         id="description"
                                            placeholder="Enter Description" 
                                            rows="10" 
                                            cols="20" 
                                            spellcheck="false" 
                                            autocapitalize="off"
                                             autocorrect="off"
                                        /></FormGroup>
                                    <Label check className="custom-checkbox">
                                        <Input
                                            type="checkbox"
                                            onChange={(e) =>
                                                addToArray(e, employee._id)
                                            }
                                        />{" "}
                                        <b>{employee.username} </b> <small>( {employee.email} )</small>
                                    </Label>
                                </FormGroup>
                            ))}
                            <Button color="primary" onClick={() => add()} className="custom-button float-end">
                                Add
                            </Button>
                        </CardBody>
                    </Card></> : ""
            }

            {meets?.map((meet) => (
                <Card className="custom-card2">
                    <CardBody>
                        
       
                        <CardTitle tag="h5" className="custom-card-title">
                            {meet.currentDate} - Meeting Details
                            <br/><br/><br/>
                            <h3 >Topic:</h3> 
                            <p>{meet.title}</p>
                            <br/>
                           <h3 >Task to do:</h3>
                           <div>
      {meet.description.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </div>
    </CardTitle>
         {meet.attendees?.map((attendee) => (
            <FormGroup key={attendee.employee._id}
                check className="employee-item"
                 >
             <Label check className="custom-checkbox">
             <b>{attendee.employee.username} </b>
              {attendee.present ? (
             <FontAwesomeIcon icon={faCheckCircle} color="green" />
              ) : (
             <FontAwesomeIcon icon={faTimesCircle} color="red" />
               )}
               </Label></FormGroup>
           ))}
             </CardBody>
            </Card>
            ))}
        </div>
    );
};

