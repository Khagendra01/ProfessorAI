import instance from "./instance";

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

export { sendExplore, sendExamPrep };