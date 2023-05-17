import React,{useState , useEffect} from 'react'
import { getDoc , doc  } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { auth,db  } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import ListItems from './ListItems';


const Undone = () => {
const [Item, setItem] = useState([])
const [user,setUser] = useState(null)


useEffect(()=>{

  onAuthStateChanged(auth,(currentUser)=>{
     setUser(currentUser)
  })
 
const getDocument = async () =>{
   

  const docRef =  doc(db,'Users',user.uid)
    

  const docSnapShot = await getDoc(docRef).catch(err=>alert(err))

 try {
    if (docSnapShot?.exists()) {
     const snapData = docSnapShot?.data();
    setItem(snapData?.test);

  } else {
   
    alert("No such document!");
  }
}
  catch(error){

  alert(error)
  }


}

if(user){
getDocument()
}

},[user])






  
return (
<>
  {
  Item.length === 0? <>
  <div className='Loader'>   
     <Box sx={{ display: 'flex' }}  >
      <CircularProgress color='primary'/>
    </Box>
    
  </div>
  <h2 style={{textAlign:'center',marginTop:'20px'}}>No tasks avaliable</h2>
  </>
  :<>
   {
    Item.map((item,index)=><ListItems  key={index} title={item.title} description={item.description} time={item.time} id={item.id}/>)
   }
  
  </>
  
  }
  
     
</>
  )
}

export default Undone
