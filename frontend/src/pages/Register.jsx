import {useState} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
   const [formData, setFormdata] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   })

   // Destructuring
   const {name, email, password, password2} = formData

   const onChange = (e) => {
      setFormdata((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }))
   }

   return (
      <>
         <section className="heading">
            <h1>
               <FaUser /> Register
            </h1>
            <p>Please create an account</p>
         </section>

         <section className="form">
            <form>
               <div className="form-group">
                  <input 
                  type="text" 
                  className='form-control' 
                  id='name' 
                  name = 'name'
                  value={name} 
                  onChange={onChange} 
                  placeholder='Enter your name' />
               </div>
               <div className="form-group">
                  <input 
                  type="email" 
                  className='form-control' 
                  id='email' 
                  name = 'email'
                  value={email} 
                  onChange={onChange} 
                  placeholder='Enter your email' />
               </div>
               <div className="form-group">
                  <input 
                  type='password'
                  className='form-control' 
                  id='password' 
                  name = 'password'
                  value={password} 
                  onChange={onChange} 
                  placeholder='Enter password' />
               </div>
            </form>
         </section>
      </>
   )
}

export default Register