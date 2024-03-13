import './home.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLoginContext } from "../context/ContextProvider";
import { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();

  interface Inputs {
    [key: string]: string;
  }
  const currURL = window.location.href
  const baseUrl = currURL.substring(0, currURL.indexOf('?'));
  const status = currURL.slice(currURL.indexOf('?')+1)

  console.log(status)
  const { account, setAccount } = useLoginContext();

  const [isLoading, setIsLoading] = useState(false)
  const [inputs, setinputs] = useState<Inputs>({
    productName: '',
    amount: '',
    email: ''
  })

  useEffect(() => {
    if(status === 'success'){
      alert(`Payment successful`)
      navigate('/allTransactions')
    }else if(status === 'failed'){
      alert(`Payment Failed`)
    }
  }, [status] )


  const handleChange = (e :any) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    Object.keys(inputs).forEach(key => {
      if(inputs[key] === ''){
        return alert(`${key} is required`)
      }
    })

    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://vasu-gambhir-stripe-payment-backend.vercel.app/create-checkout-session",
        {
          ...account, inputs
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsLoading(false)
      console.log(res.data)
      if(res.status !== 201)
      {
        alert("Error : somwthing went wrong")
      }else{
        const url = res.data.url
        if(url){
          window.location.replace(url)
          // window.open(url, '_blank');
        }
        else{
          alert("Error : somwthing went wrong")
        }
      }
    } catch (error:any) {
        console.log(error);
    }
  }


console.log(inputs)
  return (
    <main>
      <div className='home'>
        <div className='headline'>
          <h1>Welcome To Stripe Application</h1>
          <h5>Better Way for payments</h5>
        </div>
        <div className="stripe-payment-container">
          <div className='stripe-payment-container-inner'>
            <div className='stripe-payment-header'>
              <div className='stripe-payment-image-container'>
                <img src='./images/logo-dark.png' alt=""  className="stripe-payment-image"/>
              </div>
              <div className="stripe-payment-heading">
                Stripe Payment
              </div>
            </div>
            <div className="stripe-payment-inputs" >
              <TextField type="text" name="productName" id="outlined-basic" label="Product name" variant="outlined" onChange={handleChange}/>
              <TextField type="number" name="amount" id="outlined-basic" label="Amount(in cents)" variant="outlined" onChange={handleChange} />
              <TextField type="email" name="email" id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} />
            </div>
            <div className='stripe-payment-button-container'>
              <Button disabled={isLoading} variant="outlined" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate adipisci quas. Quaerat, alias obcaecati cumque, dolores repudiandae iure repellat nemo earum voluptates exercitationem aperiam nulla odio tempora. Officia, hic!</p>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Home;