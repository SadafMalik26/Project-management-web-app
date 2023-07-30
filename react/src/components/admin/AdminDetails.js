import { useParams } from "react-router-dom";

import '../../admin.css'
import { AdminSlots } from "./AdminSlots";
import { AdminProfileDetails } from "../../components/admin/AdminProfileDetails"

export function AdminDetails() {
  const { id } = useParams()


  return (
    <>
   
     <AdminProfileDetails id={id} />

     <AdminSlots id={id}  />
     
    </>
  )
}