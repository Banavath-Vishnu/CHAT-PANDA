import logo from "../assets/logo.png";
import bgm from "../assets/bgm.png";

import { useState, useContext, useRef, useEffect } from "react";
import authContext from "../context/authContext.js";

import { toast } from "react-toastify";
import Avatar from "react-avatar";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

import {
  profileSetup,
  imageSetUp,
  deleteImage,
  getUserDetails,
  deleteUser,
} from "../backendconnection/backendapi.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useContext(authContext);
  const navigate = useNavigate();
  const imageClickRef = useRef();

  const [hover, setHover] = useState(false);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const handleSetImageClick = () => {
    imageClickRef.current.click();
  };

  const handleInputFileImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("userProfileImage", file);
      const response = await imageSetUp(formData);
      toast.success(response.message);
      setUser((prev) => ({ ...prev, profilePic: response.profilePic }));
    }
  };

  const handleDeleteImageClick = async () => {
    const response = await deleteImage();
    console.log(response);
    toast.success(response.message);
    setUser((prev) => ({ ...prev, profilePic: response.profilePic }));
  };

  const handleBackClick = () => {
    if (user.profileSetup) {
      return navigate("/application");
    } else {
      return navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    const response = await deleteUser();
    toast.success(response.message);
    navigate("/");
  };

  const handleProfileBtn = async () => {
    const response = await profileSetup({ name: name, bio: bio });
    if (response.status === 200) {
      toast.success(response.data.message);
      setUser((prev) => ({
        ...prev,
        name: response.data.name,
        bio: response.data.bio,
      }));
      navigate("/application");
    }
  };
  useEffect(() => {
    setName(user.name);
    setBio(user.bio);
  }, [user]);

  useEffect(() => {
    const getProfilefromDBc = async () => {
      const response = await getUserDetails();

      if (response.status === 201) {
        toast.error(response.data.message);
        return navigate("/");
      }

      setUser((prev) => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio,
        profilePic: response.data.profilePic,
        profileSetup: response.data.profileSetup,
      }));
    };

    getProfilefromDBc();
  }, [setUser]);

  return (
    <>
      <div className="overflow-hidden absolute w-full h-screen object-contain blur-sm">
        <img src={bgm} alt="" className="w-full" />
      </div>

      <div className="flex justify-center items-center w-screen h-screen object-center relative z-10">
        <div className="container mx-auto my-4 px-4 lg:px-20 absolute">
          {/* {console.log(user)} */}
          <div className="w-full border-4 bg-slate-50  border-blue-100 p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-lg">
            <div className="flex justify-start items-center  gap-5">
              <IoArrowBackCircle
                size={50}
                onClick={handleBackClick}
                className="cursor-pointer"
              />
              <h1 className="font-semibold text-xl text-center">
                {!user.profileSetup
                  ? "Set Up your Profile"
                  : "Update Your Profile"}
              </h1>
            </div>
            <div className="my-6 flex justify-center items-center">
              <div
                className="flex justify-center items-center"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                <Avatar
                  name={user.name}
                  src={user.profilePic}
                  round={true}
                  color="#f5f5f5"
                  fgColor="black"
                  className=" shadow-lg"
                />
                {hover && (
                  <div className="absolute cursor-pointer bg-[#00000055] w-[100px] h-[100px] rounded-full p-4 flex justify-center items-center">
                    {!user.profilePic ? (
                      <CiCirclePlus
                        size={"80px"}
                        color="white"
                        onClick={handleSetImageClick}
                      />
                    ) : (
                      <MdDelete
                        size={"80px"}
                        color="white"
                        onClick={handleDeleteImageClick}
                      />
                    )}
                  </div>
                )}
              </div>
              <input
                type="file"
                name="profileImge"
                id="userProfileImage"
                accept=".png, .jpg, .jpeg, .svg"
                className="hidden"
                ref={imageClickRef}
                onChange={handleInputFileImage}
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg cursor-auto focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                readOnly
                value={user.email}
              />
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                id="bio"
                className="w-full bg-gray-100 resize-none text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                maxLength={"50"}
                rows={"2"}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>

            <div className="flex my-4 gap-4">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full hover:translate-y-1 transition-transform 
          focus:outline-none focus:shadow-outline"
                onClick={handleProfileBtn}
              >
                {!user.profileSetup ? "Set-up My Profile" : "Update"}
              </button>

              {user.profileSetup && (
                <button
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full hover:translate-y-1 transition-transform 
          focus:outline-none focus:shadow-outline"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
        <img
          src={logo}
          alt=""
          className="relative w-[500px] h-[500px] ml-[50%] p-4 bg-slate-100 shadow-xl border-slate-100  rounded-full border-4"
        />
      </div>
    </>
  );
};

export default Profile;
