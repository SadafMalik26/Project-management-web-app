import React, { useState } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useAddAdminSlot } from "../../hooks/admin";

export function AddSlot() {
  const addAdminSlot = useAddAdminSlot();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const add = async () => {
    // Do something with the date and time values
    const slot = await addAdminSlot.mutateAsync({ date, time });
  };

  return (
    <>
      <Form>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md="5">
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                type="time"
                name="time"
                id="time"
                min="08:00"
                max="14:00"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md="2" className="mt-4 pt-2">
            <Button color="primary" onClick={() => add()}>
              Add Slot
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
