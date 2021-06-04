import React from 'react'
import {Avatar} from '@material-ui/core'
import styled from 'styled-components'
import {auth, db} from '../firebase';
import getReipientEmail from '../utils/getReipientEmail';
import {useCollection} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useRouter} from 'next/router';

export default function Chat({id,users}) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getReipientEmail(users, user))
    
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const reciepientEmail = getReipientEmail(users, user);

    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }
    return (
        <Container onClick={()=>enterChat()}>
            {recipient ? (
                <UseAvatar  src={recipient?.photoURL}/>):(
                    <UseAvatar >{reciepientEmail[0]}</UseAvatar> 
                )}
                <p>{reciepientEmail}</p>
        </Container>
    )
}


const Container = styled.div`
display:flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background: color #e9eaeb;  
}
`;

const UseAvatar = styled(Avatar)`
margin: 5px;
margin-right : 15px;

`