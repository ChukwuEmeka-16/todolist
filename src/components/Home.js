import React,{ useState,useRef,useEffect} from 'react'
import { signOut  } from 'firebase/auth'
import { auth,db } from '../firebaseConfig'
import {  doc , updateDoc, arrayUnion  } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Undone from './Undone'
import uuid from 'react-uuid'
import Missed from './Missed'


const Home = () => {

  

  useEffect(()=>{
   if (!localStorage.getItem('authenticated')) {
    window.location.href = '/'
   }

  },[])



  // modal states
 const [title, setTitle] = useState('')
 const [description, setDescription] = useState('')
 const [time, setTime] = useState('')


 // router state
   const [view, setview] = useState('first')
   
   
let date = new Date()
let formatted = `${date.toDateString()}`
let modalref = useRef()


const showModal = async () =>{
  
  modalref.current.classList.toggle('dismissmodal')
}

const  logout = async () =>{
  await signOut(auth).catch((err)=>{
    alert(err)
  }).then(()=>{
    localStorage.removeItem('authenticated')
    window.location.href='/'
  })
}
const addTask = async (e) =>{
  e.preventDefault()
  let docref  = doc(db,'Users',auth?.currentUser?.uid)
  await updateDoc(docref,{test:arrayUnion({title:title,description:description,time:time,id:uuid()})})
  .then(()=>{
    alert('done')
    window.location.reload()
  })
  .catch((err)=>alert(err))
   

}




return (
<div className='Home'>
  <header className='Home-header'>
    <div>
     <h1>Today  </h1>
    <h6 className='text-secondary'> {formatted} </h6>
    </div>
    <div>
     <FontAwesomeIcon type='button' size='xl' icon='calendar' color='grey'/>
    </div>
    <div>
      <button onClick={(e)=>logout(e)}>Sign out</button>
    </div>
 </header>

 <nav className='Home-nav'>
    <input style={{backgroundColor:'white'}} type="search" placeholder='Search' />  
 </nav>

  <nav className='Home-nav2'>
    <ul className='Home-nav2-list'>
        <li  onClick={()=>setview('first')}> Undone</li>
        
        <li onClick={()=>setview('second')} > Missed</li>
    </ul>
  </nav>

{/*  body starts here */}
   <section className='List'>
     { view ==='first' && <Undone  /> }
   
    {view ==='second' && <Missed/>}
   </section>
   

{/*  modal starts here */}

   <div className='add-todo  dismissmodal' ref={modalref}>
    <header>
     <h1 onClick={showModal} >Add item</h1>
     <FontAwesomeIcon type='button' icon='x' size='xl' onClick={showModal} />
      </header>
      <form action="" >
         <div>
          <label htmlFor="">Title :</label>
          <input type="text" placeholder='Breakfast' value={title} onChange={(e)=>setTitle(e.target.value)}/>
         </div>
         <div>
          <label htmlFor="">Description :</label>
          <input type="text" placeholder='pack a lunchbox' value={description}  onChange={(e)=>setDescription(e.target.value)}/>
         </div>
         <div>
          <label htmlFor="">Time :</label>
          <input type="text" placeholder='9:00 AM ' value={time} onChange={(e)=>setTime(e.target.value)} />
         </div>
         <button onClick={addTask}>Add Task</button>
      </form>


      </div>
</div>
  )
}

export default Home
