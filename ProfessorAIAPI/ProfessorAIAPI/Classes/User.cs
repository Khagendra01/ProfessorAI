using Microsoft.AspNetCore.Identity;

namespace ProfessorAIAPI.Classes
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<UserSubject> Subjects { get; set; }
        public ICollection<Note> Notes { get; set; }

        public User()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
        }

    }

}
