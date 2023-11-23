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

function getNote(noteId) {
  return instance
  .get(`/api/notes?noteId=${noteId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function removeNote(noteId) {
  return instance
    .delete(`/api/Note/${noteId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { addNoteToSubject, getNotes, getNote, removeNote };
