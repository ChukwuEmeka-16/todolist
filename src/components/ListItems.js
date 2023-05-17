import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { arrayRemove, updateDoc,doc,getDoc } from 'firebase/firestore'
import React,{useRef ,useState} from 'react'
import { auth,db } from '../firebaseConfig'


const ListItems = ({title , description , time , display ,id }) => {

  // modal states
const [Title, setTitle] = useState(title)
const [Description, setDescription] = useState(description)
const [Time, setTime] = useState(time)


// id state
const [Id,setId] = useState(id)




const aref = useRef()

const toggle =() =>{
  aref.current.classList.toggle('displayNone')
 


}


const deleteTask = async() =>{
  let docRef = doc(db,'Users',auth.currentUser.uid)
 await updateDoc(docRef,{test:arrayRemove({title:title,description:description,time:time,id:Id})}).then(()=>{
  alert('done')
  window.location.reload()

 }).catch((err)=>alert(err))
}

const updateTask = async (e)=>{


 e.preventDefault()
  const docRef =  doc(db,'Users',auth.currentUser.uid)
  const docSnapShot = await getDoc(docRef).catch(err=>alert(err))

 
     const snapData = docSnapShot.data();
     let Item = snapData.test

     
    Item.forEach((item,index)=>{
       if (item.id === Id) {
        Item[index] = {title:Title,description:Description,time:Time, id:Id}
       }
    })
  
    await updateDoc(docRef,{test:[...Item]}).then(()=>window.location.reload()).catch(err=>alert(err))
} 
  
 










  return(
   <>
    <li  className='ListItem' >

       <div>
          <h1>{title}</h1>
          <small style={{color:'grey'}} >{description}</small>
       </div>

       <div>
        <h4>{time} </h4>
        <button onClick={deleteTask} >remove</button>
        <button onClick={toggle} className={display}>Edit</button>
       </div>
    </li>


    {/* modal code  */}
    <section ref={aref}   className="Modal displayNone">
      <header>
        <h1>Update task</h1>
        <FontAwesomeIcon icon='x' size='xl' onClick={toggle} />
      </header>
      <form action="">
         <div>
          <label htmlFor="">Title :</label>
          <input type="text"   placeholder='Breakfast' value={Title} onChange={(e)=>setTitle(e.target.value)}/>
         </div>
         <div>
          <label htmlFor="">Description :</label>
          <input type="text" placeholder='pack a lunchbox' value={Description}  onChange={(e)=>setDescription(e.target.value)}/>
         </div>
         <div>
          <label htmlFor="">Time :</label>
          <input type="text" placeholder='9:00 AM ' value={Time} onChange={(e)=>setTime(e.target.value)} />
         </div>
          
      </form>

       <footer>
       <button onClick={(e)=>updateTask(e)}>Save</button>
       <button onClick={toggle}  >Cancel</button>
       </footer>
       
    </section>
    
   


    </>

    
  )
}

export default ListItems
