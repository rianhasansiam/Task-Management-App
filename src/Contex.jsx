import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useState } from "react";
import auth from "./Security/Firebase"; // Ensure this path is correct

export const contextData = createContext();

const Contex = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log(user); // Only log if `user` is not null
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user.displayName); // Successfully logged in, set user
      })
      .catch((error) => {
        console.error("Error during login:", error); // Handle errors
        alert("Login failed. Please try again.");
      });
  };

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
