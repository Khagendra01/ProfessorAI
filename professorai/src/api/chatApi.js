import instance from "./instance";

function sendMessage(messages) {
  return instance
    .post("/api/chat/send", messages)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getChatHistory(id) {
  return instance
  .get(`/api/chats?userId=${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function getChat(sessionId) {
  return instance
  .get(`/api/chat?sessionId=${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function deleteChat(sessionId) {
  return instance
  .delete(`/api/chat?sessionId=${sessionId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}



export { sendMessage, getChatHistory, getChat, deleteChat };
