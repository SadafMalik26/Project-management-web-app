import { AddSlot } from "../components/admin/AddSlot";
import { SlotList } from "../components/admin/SlotList";
import { AdminSlots } from "../components/admin/AdminSlots";
import { useAuth } from "../hooks/authentication";
import { useMySlots } from "../hooks/admin";
import { MyProject } from "./MyProject";

export function MySlots() {

    const { data: slots } = useMySlots()
    const { isSuccess, data: auth } = useAuth()

    return (
        <>
            {isSuccess && auth.type == "Admin" ? <> <AddSlot /> </>: ""}

            <SlotList slots={slots} />

            {isSuccess && auth.type == "Employee" ? <> <MyProject /> </>: ""}


        </>
    )
}