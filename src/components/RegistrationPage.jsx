import React, { useState } from "react";
import RegistrationBackground from "../assets/Background.svg";
import Dino from "../assets/Dino.svg";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../firebase/useSignup";
import { doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../firebase/useAuthContext";
import { db } from "../firebase/config";
import { useLogin } from "../firebase/useLogin";
import { useLogout } from "../firebase/useLogout";
import { ws } from "../websocket";
import ButtonClick from "../assets/Sounds/clickbutton.mp3";
function RegistrationPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const {error_signup,signup}= useSignup()
  const {error_login, login}= useLogin()
  
import { getDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ws } from "../websocket";
function RegistrationPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { error_signup, signup } = useSignup();
  const { error_login, login } = useLogin();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const auth = getAuth();

  async function createUser(){
    const ref=doc(db,'users',name)
    await setDoc(ref,{
      name: name,
      score:[-1,-1,-1,-1,-1,-1],

    })
  }
  async function signUsersUp(email) {
    try {
      signup(email, "password");
      console.log("User signed up");
      await createUser();
      console.log("User created in Firestore");
      navigate("/MapPage");
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Unable to sign up. Please try again later.");
    }
  };
  async function signUsersIn(email) {
    try {
      await signInWithEmailAndPassword(auth, email, "password");
      console.log("User signed in: ", auth.currentUser.uid);
      // Get the name of the user from their email
      const name = email.split("@")[0];
      setName(name);
      navigate("/MapPage");
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Invalid email or password.");
      signUsersUp(email);
    }
  };

  // async function signUsersIn(email) {
  //   login(email, "password");
  //   error_login ? alert("no user") : navigate("/MapPage");
  //   console.log("user not found");
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    var email = `${name}@gmail.com`;
    //signUsersUp(email)

    signUsersIn(email)
    new Audio(ButtonClick).play();

  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${RegistrationBackground})`,
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-12 rounded-lg w-3/4 h-1/3 bg-[#F9F4CC] border-8 border-white relative z-0 ">
          <div
            className="bg-cover bg-center absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1/3"
            style={{ backgroundImage: `url(${Dino})`, top: "100px" }}
          ></div>
          <div className="rounded-lg absolute top-[-75px] left-1/2 transform -translate-x-1/2 w-3/4 h-1/5 bg-[#3693C7] border-8 border-white z-10">
            <div className="welcome-text">Welcome</div>
          </div>
          <div className="rounded-lg absolute inset-4 border-dashed border-4 border-[#E7C69F]">
            <div className="flex flex-col items-center justify-center h-full mt-12">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center h-full"
              >
                <label
                  htmlFor="name"

                  className="text-xl font-bold mb-2 text-[#704F3D] rounded-md py-10"
                  style={{ fontSize: "40px" }}


                >
                  Please enter your name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border-2 border-gray-400 p-2.5 rounded-lg w-11/12"
                  onChange={handleChange}
                  value={name}
                  placeholder="Name"
                />
                <button
                  type="submit"
                  className="continue-text bg-[#B5D76E] hover:bg-[#B5D76E] text-white font-bold py-2 px-4 rounded-full mt-4 border-8 border-white border-solid"
                  style={{ marginTop: "50%", width: "75%" }}
                >
                  Continue
                </button>
                {error_login && <p>{error_login}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
