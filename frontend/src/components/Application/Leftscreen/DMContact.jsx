import React, { useContext } from "react";
import authContext from "../../../context/authContext.js";
import Avatar from "react-avatar";

const DMContact = ({ contact, selectedDm }) => {
  const { user, selectedContact, setSelectedContact } = useContext(authContext);

  return (
    <div className="relative">
      <div
        className={`w-full h-20 p-2 rounded-lg my-2 transition-all  shadow-md cursor-pointer flex justify-start items-center shadow-slate-500 ${
          selectedContact.email === contact.email
            ? 'after:content-[""] bg-slate-50 after:absolute after:h-full  after:bg-slate-800 after:w-[2px] ml-1 after:-ml-5'
            : "bg-slate-100"
        }`}
        onClick={() => setSelectedContact(contact)}
      >
        <div className="">
          <Avatar
            src={contact.profilePic}
            color="white"
            name={contact.name}
            fgColor="black"
            size="60"
            className="rounded-full shadow-md"
          />
        </div>
        <div className="ml-4">
          <p className="font-bold">{contact.name}</p>
          <p className="text-xs">{contact.bio.substring(0, 30) + "..."}</p>
        </div>
      </div>
    </div>
  );
};

export default DMContact;
