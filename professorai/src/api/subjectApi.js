import instance from "./instance";

function addSubjectToProfile(subjectInfo) {
  return instance
    .post(`/api/subject`, subjectInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
function getAllSubjects(userId) {
  return instance
    .get(`/api/subjects?userId=${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function removeSubject(subjectInfo) {
  return instance
    .post(`/api/subject/remove`, subjectInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { addSubjectToProfile, getAllSubjects, removeSubject };
