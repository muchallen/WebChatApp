const getReipientEmail = (users, userLoggedIn) =>(
    users?.filter(userToFilter=> userToFilter !== userLoggedIn.email)
)

export default getReipientEmail;