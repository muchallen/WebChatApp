import styled from 'styled-components'
import {auth,db} from '../firebase'
import {useRouter} from 'next/router'
import {useState, useRef} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {Avatar,IconButton} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import firebase from 'firebase'
import TimeAgo from 'timeago-react'
import Message from '../components/Message'
import getReipientEmail from '../utils/getReipientEmail'

function ChatScreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const endofMessageRef = useRef()
    const [input, setInput] = useState("")
    const [chatsSnapshot] = useCollection(db.collection("chats").doc(router.query.id));
    const [messageSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('message').orderBy('timestamp', "asc"));
    

    const showMessages = () => {

        if(messageSnapshot){
            return messageSnapshot.docs.map((message) => (
                <Message key = {message.id} user={message.data().user} message = {{...message.data(), timestamp: message.data().timestamp?.toDate().getTime(),}} />
            ))
        }

    }
    const [reciepientSnapshot] = useCollection(db.collection("users").where("email" , "==", getReipientEmail(chat.users, user)))

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {
                merge : true
            }
        
        )
        db.collection("chats").doc(router.query.id).collection("message").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        });

        setInput("");
        scrollToBottom();

    }

    const scrollToBottom= () => {
        endofMessageRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start"
        })
    }
    const recipient = reciepientSnapshot?.docs?.[0]?.data();
    const reciepientEmail = getReipientEmail(chat.users, user)


    return (
        <Container>
            <Header>
               {recipient ? (
                   <Avatar src={recipient?.photoURL}/>
               ):(<Avatar >{reciepientEmail[0]}</Avatar>)}

                <HeaderInfomation>
                    <h3>{reciepientEmail}</h3>
                    <p>
                        Last active: {" "}
                        {recipient?.lastSeen?.toDate() ? (<TimeAgo datetime={recipient?.lastSeen?.toDate()} />) : "unavailable"}
                    </p>
                </HeaderInfomation>
                <HeaderIcons>
                    <IconButton >
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton >
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {/* show message */}
                {showMessages()}
                <EndOfMessage ref={endofMessageRef} />
            </MessageContainer>
            <inputContainer>
            <InsertEmoticonIcon />
            <Input  value={input} onChange={e=>setInput(e.target.value)} />
            <button  disabled ={!input} onClick={(e)=>sendMessage(e)}> Send Message</button>
            </inputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
top: 0;

`;
const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top:0px;
display:flex;
padding: 11px;
height:87px;
align-items: center;
border-bottom: 1px solid whitesmoke;


`;

const HeaderInfomation = styled.div`
margin-left: 15px;
flex:1;
align-items: center;

 >h3 {
     margin-bottom: 3px;
 }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
min-height: 90vh;
margin-bottom:20px;
background-color:whitesmoke;
z-index:0;

`;

const EndOfMessage = styled.div``;

const Input = styled.input`
flex: 1;
outline: 0;
border: none;
border-radius: 10px;
background-color:whitesmoke;
padding: 20px;
margin-left: 15px;
margin-right: 15px;
`;

const InputContainer  = styled.form`
display: flex;
align-items: center;
padding : 10px;
position : sticky;
bottom: 0;
margin-bottom:40px;
background-color :white;
z-index: 1000;
`;
