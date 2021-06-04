import styled from 'styled-components'
import {Avatar, IconButton, Button,Input} from '@material-ui/core'
import ChatIcons from '@material-ui/icons/Chat'
import SearchIcon from '@material-ui/icons/Search'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as EmailValidator from 'email-validator'
import {auth, db } from '../firebase'
import { useAuthState}  from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from './Chat'


function Sidebar() {
 const [user] = useAuthState(auth)
 const userChatRef = db.collection('chats').where('users', 'array-contains', user?.email)
 const [chatsSnapshot] =useCollection(userChatRef)
  
 const createChat = () => {
    const input = prompt("Please enter email address for the user you wish to chat with ");

    if(!input) return; null;

    if(EmailValidator.validate(input) && !chatsAlreadyExists(input) && input !== user.email ) {
      // We need to add the chat into the DB 'chats' collection
      db.collection('chats').add({
        users: [user.email, input]
      })

    }
  }
    const chatsAlreadyExists = (recipientEmail) =>{
      !!chatsSnapshot?.docs.find(
        (chat)=>
        chat.data().users.find((user)=>user === recipientEmail)?.length > 0
      );
    }


  

    return (
        <Container>
          <Header>
            <UseAvatar src={user.photoURL} onClick={()=>auth.signOut()} />

            <IconsContainer>
                <IconButton><ChatIcons/></IconButton>
                <IconButton><MoreVertIcon/></IconButton>
            </IconsContainer>
          </Header>
          <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats "/>
          </Search>

          <SideButton onClick={()=>createChat()}>Start a new chat</SideButton>

          { /* List of chats */ }
          {chatsSnapshot?.docs.map((chat)=>(<Chat key={chat.id} id={chat.id} users={chat.data().users}/>))}
        </Container>
    )
}



export default Sidebar

const Container = styled.div`
`;
const Header = styled.div`
display: flex;
justify-content:space-between;  
position: sticky;
background-color: white;
top: 0;
z-index: 1;
align-items:center;
padding:15px;
height:80px;
border-bottom: 1px solid whitesmoke;
`;
const UseAvatar = styled(Avatar)`
cursor: pointer;
:hover{
  opacity:0.8
}
`;
const IconsContainer = styled.div``;
const Search = styled.div`
display: flex;
align-items: center;
padding:20px;
border-radius:2px;

`;
const SearchInput = styled(Input) `
outline-width:0;
border : none;
flex : 1;

`;

const SideButton = styled(Button)`
width:100%;

&&&{
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
}
`
