import React,{useState} from 'react'
import { auth , googleProvider , db } from '../firebaseConfig'
import { createUserWithEmailAndPassword , signInWithPopup } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { collection ,addDoc , doc, setDoc } from 'firebase/firestore'

const Signup = () => {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setusername] = useState('')

    
async function signUp(e) {
e.preventDefault()
        
await createUserWithEmailAndPassword(auth,email,password).then(async (res)=>{
  
  const docRef = doc(db,'Users',res.user.uid);
  await setDoc(docRef,{name:username,email:email,test:[],missed:[]}).then(()=>{
    localStorage.setItem('authenticated',true)
    window.location.href ='/home'
  }).catch((err)=>alert(err))


}).catch((err)=>{
  alert(err)
})

}
async function signUpGoogle(e){
  e.preventDefault()
  await signInWithPopup(auth , googleProvider).then(async(res)=>{

    const docRef = doc(db,'Users',res.user.uid);
  await setDoc(docRef,{name:username,email:email,test:[],missed:[]}).then(()=>{
    localStorage.setItem('authenticated',true)
    window.location.href ='/home'
  }).catch((err)=>alert(err))


  }).catch((err)=>alert(err))


}




return (
    <div>
     
       <form className='loginform' onSubmit={(e)=>signUp(e)} >
        <div>
        <h1 style={{fontSize:'25px'}}>Create your account </h1>
        </div>

      {/* form body starts here */}
     <div className='form-body'>
     <div>
       <label htmlFor="">name :</label>
        <input value={username} type="text" onChange={(e)=>setusername(e.target.value)}/>
      </div>

      <div>
       <label htmlFor="">Email :</label>
        <input value={email} type="text" onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <div>
        <label htmlFor="">Password :</label>
        <input value={password} type="text" onChange={(e)=>setPassword(e.target.value)} />
      </div>

     <div>
    <button className='login-btn' >Sign Up</button>
     </div>

         <div>
            <h3>or</h3>
         </div>
    
    <div> 
        <button className='google-btn' onClick={(e)=>signUpGoogle(e)}> 
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />    
             Google Sign up
            </button>
    </div>
    
    {/* <div>
       <button className='facebook-btn' >
        <img src="https://png.pngtree.com/png-clipart/20190419/ourmid/pngtree-facebook-social-media-icon-png-image_955750.jpg" />
          Facebook Sign up</button>
    </div> */}
    
    </div>


     <div>
        <p> have an account?<Link to='/'>Log in</Link></p>
     </div>

      </form>

     

       

    </div>
  )
}

export default Signup
