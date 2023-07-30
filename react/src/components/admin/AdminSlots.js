import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { useAdminSlots, useAdminSlotsCount } from "../../hooks/admin";
import { SlotList } from "./SlotList";


export const AdminSlots = (props) => {

  const id=props.id
  const { isSuccess,data: slots } = useAdminSlots(id)
  const {data:slotCount}=useAdminSlotsCount(id)
  
    return (
      <Card>
        <CardBody>
          <CardTitle>Admin Slots</CardTitle>
          <Row>
            <Col>
              <h5>Total Slots</h5>
              <p>{slotCount?.totalCount}</p>
            </Col>
            <Col>
              <h5>Available Slots</h5>
              <p>{slotCount?.availableCount}</p>
            </Col>
            <Col>
              <h5>Booked Slots</h5>
              <p>{slotCount?.bookedCount}</p>
            </Col>
          </Row>
  
          <SlotList slots={slots} />
  
        </CardBody>
      </Card>
    );
  
 
};

