import { useParams } from "react-router-dom";

import {ProfileDetails} from '../employee/ProfileDetails'

export function EmployeeDetails() {

  const { id } = useParams()
 

  return (
    <>
   
     <ProfileDetails id={id} />
     
    </>
  )
}