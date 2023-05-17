import React,{useState  } from 'react'
import { auth , googleProvider} from '../firebaseConfig'
import { signInWithEmailAndPassword , signInWithPopup  } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')



async function signIn(e) {
  e.preventDefault()

  
await signInWithEmailAndPassword(auth,email,password).then(()=>{
     localStorage.setItem('authenticated',true)
        window.location.href='/home'

    }).catch((error)=>{

    alert(error)
  })
  
}



async function signInGoogle(e){
  e.preventDefault()
  await signInWithPopup(auth , googleProvider).then((res)=>{
    localStorage.setItem('authenticated',true)

    window.location.href='/home'
  }).catch((err)=>alert(err))


}


  return (
    <div>
     
  
       <form className='loginform'  >
        <div>
        <h1 >Welcome </h1>
        </div>

      {/* form body starts here */}
     <div  className='form-body'>
    
      <div>
       <label htmlFor="">Email :</label>
        <input   value={email} type="text" onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <div>
        <label htmlFor="">Password :</label>
        <input value={password} type="text" onChange={(e)=>setPassword(e.target.value)} />
      </div>

     <div>
    <button className='login-btn' onClick={(e)=>signIn(e)} >Log in</button>
     </div>

         <div>
            <h3>or</h3>
         </div>
    
    <div> 
        <button className='google-btn' onClick={(e)=>signInGoogle(e)}> 
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />    
             Google login
            </button>
    </div>

    {/* <div>
       <button className='facebook-btn'>
        <img src="https://png.pngtree.com/png-clipart/20190419/ourmid/pngtree-facebook-social-media-icon-png-image_955750.jpg" />
          Facebook login</button>
    </div> */}
    
    </div>


     <div>
        <p>dont have  an account?  <Link to='/signup' >Sign up</Link></p>
     </div>

      </form>

    


    </div>
  )
}

export default Login
