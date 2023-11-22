import instance from "./instance";

function addNoteToSubject(NoteInfo) {
  return instance
    .post(`/api/note`, NoteInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
function getNotes(NoteInfo) {
  return instance
    .post(`/api/notes`, NoteInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function getNote(id) {
  return instance
    .get(`/api/note/$${id}`,)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function removeNote(NoteInfo) {
  return instance
    .post(`/api/Note/remove`, NoteInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { addNoteToSubject, getNotes, getNote, removeNote };
