import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { CounterComponent } from "./useState"
import { TimerComponent } from "./useEffect"
import { ThemeProvider } from "./useContextProvider";
import { ThemeToggler } from "./useContext";
import { FocusInputExample } from "./useRef";
import { PreviousStateExample } from "./useRef";

export const Home = ({user}) => {
  // state to store email and password. initialize as empty string, then include the setemail / pass function in input to add to it
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  // state for sign up
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  // this will swtich the state to true or false when it's called
  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  }

  //signup function
  const handleSignUp = () => {
    //return if empty
    if(!email || !password) return;

     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
     })
  }

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Sign in function
  const handleSignIn = () => {
    // same function as sign up
    if(!email || !password) return;

     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
     })
  }

  if(user) {
    return <Navigate to='/private'></Navigate>
  }
  return(
    <section>
      <h2>Homepage</h2>
      <form>
        {/* below changes when clicking 'log in' */}
        { isSignUpActive && <legend>Sign Up</legend>}
        { !isSignUpActive && <legend>Sign In</legend>}
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={handleEmailChange} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handlePasswordChange} />
            </li>  
          </ul>
          {isSignUpActive && <button type="button" onClick={handleSignUp} >Sign Up</button>}
          {!isSignUpActive && <button type="button" onClick={handleSignIn} >Sign In</button>}
        </fieldset>
        {isSignUpActive && <a onClick={handleMethodChange}>Login</a>}
        {!isSignUpActive && <a onClick={handleMethodChange}>Create an accout</a>}
      </form>
      
      <h4>useState practice below</h4>
      <CounterComponent/>

      <h4>useEffect practice below</h4>
      <TimerComponent/>

      <h4>useContext practice below</h4>
      <ThemeProvider>
        <div>
          <ThemeToggler/>
        </div>
      </ThemeProvider>

      <h4>useRef practice below</h4>
      <FocusInputExample />

      <h6>useRef example 2</h6>
      <PreviousStateExample />
    </section>
  )
}