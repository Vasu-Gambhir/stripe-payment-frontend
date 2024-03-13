import { useState } from 'react';
import axios from 'axios';
import './login-register.css';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { NavLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert/Alert';
import AlertTitle from '@mui/material/AlertTitle/AlertTitle';

const SignUp = () => {

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  function formUpdate(e: any) {
    const {name, value} = e.target;

    setSignUpInfo(function() {
      return {
        ...signUpInfo,
        [name]: value
      }
    })
  }

  const [errorMessage, setErrorMessage] = useState<any>([]);
  const navigate = useNavigate();

  async function sendData(e:any) {
    e.preventDefault();
    const { name, mobile, email, password, cpassword } = signUpInfo;

    try {
      const res = await axios.post('http://localhost:8000/register', { 
        name, mobile, email, password, cpassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res)
      setSignUpInfo(function() {
        return {
          ...signUpInfo,
          name: "", mobile: "", email: "", password: "", cpassword: ""
        }
      });

      //@ts-ignore
      document.querySelector(".error-alert").style.display = "none";
      //@ts-ignore
      document.querySelector(".success-alert").style.display = "flex";

      setTimeout(function() {
        navigate('/login');
      }, 1000)

    } catch(error :any) {
      if(error) {
        console.log(error)
        //@ts-ignore
        document.querySelector(".success-alert").style.display = "none";
        //@ts-ignore
        document.querySelector(".error-alert").style.display = "flex";
        const errors = error.response.data.message;
        const temp = [];
        
        for (let i = 0; i < errors.length; i++) {
          temp.push(errors[i].msg)
        }
        setErrorMessage(temp);
      }
    }

  }

  return (
    <div className='signin signup'>
      <NavLink to='/' className='logo'>
        <img src='images/logo-dark.png' alt='logo' />
      </NavLink>

      <Alert variant="outlined" severity="warning" className='alert error-alert'>
        <AlertTitle className='alert-title'>There were some errors</AlertTitle>
        <ul>
          { 
            errorMessage.map(function(error:string, index:number) {
              return (
                <li key={index}> {error} </li>
              )
            })
          }
        </ul>
      </Alert>

      <Alert variant="outlined" className='alert success-alert'>Registered successfully! Please <NavLink to='/login'>login</NavLink></Alert>
   
      <div className='form-details'>
        <h3>Create Account</h3>
        <form method='POST' onSubmit={ sendData }>
          <label htmlFor='name'>Your name</label>
          <input type='text' name='name' id='name' placeholder='First and last name' onChange={ formUpdate } value={ signUpInfo.name } required />
          <label htmlFor='mobile'>Mobile number</label>
          <div className='mobile-number'>
            
            <input type='text' name='mobile' id='mobile' placeholder='Mobile number' onChange={ formUpdate } value={ signUpInfo.mobile } required />
          </div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' placeholder='Email Address' onChange={ formUpdate } value={ signUpInfo.email } required />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' placeholder='Password (At least 6 characters)' onChange={ formUpdate } value={ signUpInfo.password } required />
          <label htmlFor='cpassword'>Confirm Password</label>
          <input type='password' name='cpassword' id='cpassword' placeholder='Confirm Password' onChange={ formUpdate } value={ signUpInfo.cpassword } required />
          <button type='submit' id='submit'>Register</button>
        </form>

      </div>
      <div className='new-to-Stripe'>
        <p><span>Already registered at Stripe?</span></p>
        <NavLink to='/login'>
          <button>Login With Your Account</button>
        </NavLink>
      </div>
    </div>
  )
}

export default SignUp;