import React,{useState} from 'react';
import './Entry.css'; 
import ShowModal1 from './ShowModal1';
import ShowModal2 from './ShowModal2';
import Header from './Header';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Entry = ()=>{
    
const navigate = useNavigate();
const OpenChatRoomComponent = () => {
  navigate(`/chatroom?loggedInUser=${encodeURIComponent(loggedInUser)}&selectedUser=${encodeURIComponent(selectedUser)}`);
};
    const [modal1,setModal1] = useState(false);
    const [modal2,setModal2] = useState(false);

    const [loggedInUser,setValue] = useState(null);
    
    const [selectedUser,setValue1] = useState(null);

    const toggleCreate = () =>{  
        setModal1(true);
    };

    const toggleJoin = () =>{
        setModal2(true);
    };

    const onClose = ()=>{   
        setModal1(false);
    };

    const onClose1 = ()=>{   
        setModal2(false);
    };

    return(
        <>
        
        <Header />
        <input type="number" value={loggedInUser} placeholder='type your userid' onChange={(e)=>setValue(e.target.value)}></input>

        <input type="number" value={selectedUser} placeholder='type user userid' onChange={(e)=>setValue1(e.target.value)}></input>
        
        <div className="entry-container">

            <div className="entry">

            <button id="button" onClick={OpenChatRoomComponent}>
                    Enter For One to One Chat
                </button>

                <button id="button" onClick={toggleCreate}>
                    Create Room
                </button>

                <button id="button" onClick={toggleJoin}>
                    Join Room
                </button>
            </div>

            {modal1 && (
                <ShowModal1 onClose={onClose} />
            )
            }

{modal2 && (
    <ShowModal2 onClose1={onClose1} loggedInUser={loggedInUser}/>
)

            }

        </div>
        </>
    );
};

export default Entry;