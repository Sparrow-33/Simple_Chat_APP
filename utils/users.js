//Join patient chat

const users =[]
function userJoin(id, username){
    const user = { id, username};

    users.push(user);

    return user;
}

// Get current User

function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//get users
function getUsers(userName){
    return users.filter(user=>user.username === userName);
}

module.exports = {
    userJoin,
    getCurrentUser,
    getUsers
}