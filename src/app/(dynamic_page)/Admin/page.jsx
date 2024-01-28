"use client"
import SidebarAdmin from '@/app/components/SidebarAdmin/SidebarAdmin'
import styles from "./page.module.css"
import Image from 'next/image'
import pencil from "@/Images/pencil-alt.png"
import trash from "@/Images/trash.png"
import eye from "@/Images/bi_eye.png"
import { useRef,useState } from 'react'
import { Users } from './data'
import Dialog from '@/app/Elements/Dialog/Dialog'

export default function Admin() {
  const[Person,setPerson]=useState(Users);
  const [dialog,setDialog]= useState({
    message:'',
    isLoading:false,
  })
  const idProductRef=useRef();
  const handleDialog=(message,isLoading)=>{
    setDialog({message,isLoading})
  }
  
  const handleDelete=(id)=>{
    handleDialog("Are you Sure You Want to Delet?",true);
    idProductRef.current=id;
  }
  const areUSureDelete=(choose)=>{
    if(choose){
      setPerson(Person.filter(p=>p.id !==idProductRef.current));
      handleDialog("",false)
    }else{
      handleDialog("",false)
    }
  }
  const handleEdit=()=>{
    window.location.href="/Admin/Link"
  }
  return (
    <div className={styles.container}>
      <SidebarAdmin/>
      <div className={styles.right}>
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>Name</td>
              <td>Profile</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          {Person.map((user)=>( <tbody key={user.id} >
            <tr>
              <td>{user.id}</td>
              <td>{user.Name}</td>
              <td className={styles.profile}>{user.Profile}
                <Image
                src={eye}
                width={20}
                height={20}
                alt='eye'
                />
              </td>
              <td>{user.Status}</td>
              <td className={styles.Action}>
                <Image className={styles.pencel}
                src={pencil}
                width={20}
                height={20}
                alt='pen'
                onClick={handleEdit}
                />
                <Image
                src={trash}
                width={20}
                height={20}
                alt='trash'
                onClick={()=>handleDelete(user.id)}
                />
              </td>
            </tr>
          </tbody>))}
        </table>
        {dialog.isLoading && <Dialog onDialog={areUSureDelete} message={dialog.message}/> }
      </div>
    </div>
  )
 }
