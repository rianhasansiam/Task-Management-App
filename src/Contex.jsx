import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./Security/Firebase"; // Ensure this path is correct

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
export const contextData = createContext();

const Contex = ({ children }) => {
  const [user, setUser] = useState('');

  console.log(user); // Only log if `user` is not null
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Login',
          text: 'login successful!',
          showConfirmButton: false,  // Show the confirm button
          timer: 1000,              // Disable automatic close
          allowOutsideClick: false, // Prevent closing by clicking outside
          allowEscapeKey: false,    // Prevent closing by pressing the Escape key
        });
        

      })
      .catch((error) => {

        console.error("Error during login:", error); // Handle errors
        alert("Login failed. Please try again.");
      });
  };



  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)
        setUser(user)
       




      } else {

        console.log('user nai')
        setUser('')

      }
    });

    return () => {
      unsubscribe();
    };
  }, []);








  




  const info = {
    user, // Share user state in the context as well
    handleLogin, // Expose handleLogin function to the context
    
  };

  return (
    <contextData.Provider value={info}>
      {children}
    </contextData.Provider>
  );
};

export default Contex;
