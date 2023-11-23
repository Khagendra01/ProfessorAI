namespace ProfessorAIAPI.Classes
{
    public class Note
    {
        public string Id { get; set; }
        public string? NoteValue { get; set; }
        public string? NoteCanvas { get; set; }
        public string UserId { get; set; }
        public string SubjectId { get; set; }

        public virtual User User { get; set; }
        public virtual Subject SubjectDetails { get; set; }

        public Note()
        {
            this.Id = Guid.NewGuid().ToString();
        }

    }
    public class NoteDetail
    {
        public string? NoteValue { get; set; }
        public string? NoteCanvas { get; set; }
        public string UserId { get; set; }
        public string SubjectId { get; set; }

        public NoteDetail()
        {
            this.UserId = Guid.NewGuid().ToString();
            this.SubjectId = Guid.NewGuid().ToString();
        }

    }
    public class NoteListViewModel
    {
        public string Id { get; set; }
        public string? NoteValue { get; set; }

        public NoteListViewModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }

    public class NoteRequest
    {

        public string UserId { get; set; }
        public string SubjectId { get; set; }

        public NoteRequest()
        {
            this.UserId = string.Empty;
            this.SubjectId = string.Empty;
        }


    }
}
