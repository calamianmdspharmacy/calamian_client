import { Oxygen } from 'next/font/google'
import React, { useState } from 'react'
import { TbKey, TbEye, TbArchive } from 'react-icons/tb'
import styles from "../../../styles/dashboard/manager/users/user.module.scss"
import UserEdit from './edit'
import DeleteUser from './delete'
import ResetPassword from './resetpassword'
import ProfileView from './profile/profileView'
const oxygen = Oxygen({
    weight: "400",
    subsets: [ "latin" ]
})

export default function UsersQuery({ userID, email, role, salary, createdAt, fullname, phone, firstname, lastname, birthday, myUserid }: any) {

    const [ profile, setProfile ] = useState(false)
    const [ edit, setEdituser ] = useState(false)
    const [ reset, setReset ] = useState(false)
    const [ uDelete, setUDelete ] = useState(false)


    const onHandleProfileView = () => {
        setProfile(() => !profile)
    }
    const onHandleEditClose = () => {
        setEdituser(() => !edit)
    }
    const onHandleResetPassword = () => {
        setReset(() => !reset)
    }
    const onHandleDeleteCLose = () => {
        setUDelete(() => !uDelete)
    }
    return (
        <tr key={userID}>

            <td className={oxygen.className}>{fullname}</td>
            <td className={oxygen.className}>{email}</td>
            <td style={{ textTransform: "uppercase" }} className={oxygen.className}>{role}</td>
            <td className={oxygen.className}>{phone.replaceAll("+63", "0")}</td>

            <td className={oxygen.className}>{Intl.NumberFormat("en-PH", { currency: "PHP", style: "currency" }).format(salary)}</td>
            <td className={oxygen.className}>
                {
                    reset ? <div className={styles.overlay2}>
                        <ResetPassword userID={userID} close={onHandleResetPassword} />
                    </div> : null
                }
                <button className={styles.resetPass} onClick={onHandleResetPassword}>
                    <TbKey size={23} />
                </button>
                {
                    edit ? <div className={styles.overlay2}>
                        <UserEdit userID={userID} close={onHandleEditClose} salary={salary} email={email} phone={phone} lastname={lastname} firstname={firstname} birthday={birthday} />
                    </div> : null
                }
                {
                    uDelete ? <div className={styles.overlay}>
                        <DeleteUser close={onHandleDeleteCLose} userID={userID} myUserid={myUserid} />
                    </div> : null
                }
                {
                    profile ? <div className={styles.overlay}>
                        <ProfileView userID={userID} close={onHandleProfileView} />
                    </div> : null
                }
                <button onClick={onHandleProfileView}>
                    <TbEye size={23} />
                </button>
                <button className={styles.deleteBtn} onClick={onHandleDeleteCLose}  >
                    <TbArchive size={23} />
                </button>

            </td>
        </tr>
    )
}
