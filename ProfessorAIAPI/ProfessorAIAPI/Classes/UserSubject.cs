namespace ProfessorAIAPI.Classes
{
    public class UserSubject
    {
        public string Id { get; set; }    
        public string UserId { get; set; }
        public string SubjectId { get; set; }
        public virtual Subject SubjectDetails { get; set; }
        public virtual User User { get; set; }

        public UserSubject()
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }

    public class UserSubjectReq
    {
        public string UserId { get; set; }
        public string? SubjectValue { get; set; }
        public string? SubjectId { get; set; }

        public UserSubjectReq()
        {
            this.UserId = string.Empty; 
        }
    }
}
