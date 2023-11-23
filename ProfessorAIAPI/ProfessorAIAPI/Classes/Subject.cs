namespace ProfessorAIAPI.Classes
{
    public class Subject
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<UserSubject> UserSubjects { get; set; }
        public virtual ICollection<Note> Notes { get; set; }

        public Subject()
        {
            this.Name = string.Empty;
        }
    }

    public class SubjectViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public SubjectViewModel()
        {
            this.Name = string.Empty;
        }
    }
}
