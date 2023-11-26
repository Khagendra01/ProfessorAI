import instance from "./instance";

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

  export { sendQuiz };