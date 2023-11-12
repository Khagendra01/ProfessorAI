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

function sendQuiz(quizQuerry) {
  return instance
    .post("/api/quiz/getQuiz", quizQuerry)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { sendMessage, sendQuiz };
