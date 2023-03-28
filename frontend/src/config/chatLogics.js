export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser?._id ? users[1] : users[0] 
}

export const isLastMessageFromSender = (messages, i, me, chat) => {
    return chat?.isGroup && messages[i]?.sender?._id !== me?._id && messages[i+1]?.sender?._id !== messages[i]?.sender?._id
}

export const isFirstMessageFromSender = (messages, i, me, chat) => {
    return chat?.isGroup && messages[i]?.sender?._id !== me?._id && messages[i-1]?.sender?._id !== messages[i]?.sender?._id
}