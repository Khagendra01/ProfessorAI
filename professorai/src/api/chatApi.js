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

function sendExplore(quizQuerry) {
  return instance
    .post("/api/explore/send", quizQuerry)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendExamPrep(quizQuerry) {
  return instance
    .post("/api/examprep/send", quizQuerry)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}


export { sendMessage, sendQuiz, sendExplore, sendExamPrep };
