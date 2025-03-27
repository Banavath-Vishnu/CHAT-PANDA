import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import authContext from '../context/authContext.js';
import { toast } from 'react-toastify';

import logo from "../assets/logo.png";
import { userLogin, userSignUp } from '../backendconnection/backendapi.js';

import { useState } from "react";

const Login = () => {

  const {setUser, user} = useContext(authContext)
  const navigate = useNavigate();
    

  const [loginComponent, setLoginComponent] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleClick = async () => {
    if (loginComponent) {
      if (email === "" || password === "") {
        toast.error("email or password is required");
        return;
      }
    

    const response = await userLogin({
        email: email,
          password: password,
       });

       if(response.status === 200){
        toast.success(response.data.message);
        setUser(response.data)

        if(response.data.profileSetup) {
navigate('/application')
        } else {
          navigate("/profile");
        }

       }else{
        toast.error(response.data.message);
       }

    } else {
      if (
        email === "" ||
        password === "" ||
        name === "" ||
        confirmPassword === ""
      ) {
        toast.error("all fields are required");
        return;
      } else if (password !== confirmPassword) {
        toast.error("Password and confirm password should match" );
        return
      }

     let signUpUser = await  userSignUp({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      
      if (signUpUser.status === 201 ) {
        toast.success(signUpUser.data.message);
        return 
      }
      toast.success(signUpUser.data.message)
      user && navigate('/profile');
      setUser(signUpUser.data);

    }
  };




  return (
    <div className="login-component w-full h-screen bg-slate-200 flex flex-row select-none">
      <div className=" left-syle-login w-1/2 h-full flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-3xl text-center">
          Welcome to chat panda
        </h1>
        <p className="text-sm font-semibold text-center">
          Login or Signup to continue
        </p>
        <img
          src={logo}
          alt=""
          className="w-3/6 p-2  shadow-2xl border-slate-600 rounded-full"
        />
      </div>

      <div className="right-syle-login w-1/2 h-full p-4">
        <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl shadow-2xl"></div>
            <div className="relative px-4 py-10 shadow-xl bg-white  sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {loginComponent
                      ? "Welcome back Dear,"
                      : "Welcome to Chat Panda"}
                  </h1>
                  <span
                    className={`text-sm font-semibold ${
                      loginComponent ? "hidden" : ""
                    }`}
                  >
                    Sign up to continue
                  </span>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className={`${loginComponent && "hidden"} relative`}>
                      <input
                        autoComplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-zinc-600 text-sm"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Your Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-zinc-600 text-sm"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-zinc-600 text-sm"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        password
                      </label>
                    </div>
                    <div className={`${loginComponent && "hidden"} relative`}>
                      <input
                        autoComplete="off"
                        id="confirm password"
                        name="confirm password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-zinc-600 text-xs"
                        placeholder="confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                      />
                      <label
                        htmlFor="confirm password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm hover:translate-y-1 transition-transform"
                        onClick={handleClick}
                      >
                        {loginComponent ? "Login" : "SignUp"}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-sm relative">
                  {loginComponent
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <span
                    className="cursor-pointer ml-1 text-slate-900 hover:text-blue-500 font-semibold"
                    onClick={() => setLoginComponent((prev) => !prev)}
                  >
                    {loginComponent ? "SignUp" : "Login"}
                  </span>{" "}
                  .{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
