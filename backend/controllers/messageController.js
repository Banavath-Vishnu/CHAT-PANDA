import NewUser from "../schemas/userSignupschema.js";
import conversations from "../schemas/messageSchema.js";

export const addAllContacts = async (req, res) => {
  const searchedContact = req.query.q;
  try {
    if (searchedContact === "") {
      return;
    }
    const querySearch = await NewUser.find({
      email: { $regex: searchedContact, $options: "i" },
    }).select("-password");
    //    console.log(querySearch)
    return res.status(201).json(querySearch);
  } catch (err) {
    console.log("Error in addallContacts from messageController.js\n", err);
  }
};



export const getMessageFromDb = async (req, res) => {

    const {sender, reciever} = req.params

    try {
   
const messages = await conversations.find({$or: [
  { $and: [{ sender: sender }, { reciever: reciever }] },
  { $and: [{ sender: reciever }, { reciever: sender }] }
]})

 res.status(200).json(messages)


     } catch (err ) {
       console.log("error getting conversation from DB check getMsgsfromDb \n", err)
     }
}



export const getDirectContacts = async (req, res) => {
  try {
    const email = req.email;

    const userEmail = email;

   const contacts = await conversations.aggregate([
    [
      {
      $match: {
        $or:[{
          sender:userEmail
        },{
          reciever:userEmail
        }]
      }
    }, {
      $group: {
        _id: {
                $cond: {
                  if: { $eq: ["$sender", userEmail] },
                  then: "$reciever",
                  else: "$sender"
      }
    }
      }
      }, 
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'email',
          as: 'Contacts'
        }
      },
      {
        $unwind: {
          path: '$Contacts'
        }
      }, 
      {
        $project: {
          _id:0,
          email:'$Contacts.email',
          name:'$Contacts.name',
          profilePic:'$Contacts.profilePic',
          bio:'$Contacts.bio',
          createdAt:'$Contacts.createdAt'
        }
      }, 
      {$sort: {
        timestamp: 1
      }}
    ]
   ])

    res.status(200).json(contacts);
  } catch (err) {
    console.log('Error in getDirectContacts from messageController.js\n', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
