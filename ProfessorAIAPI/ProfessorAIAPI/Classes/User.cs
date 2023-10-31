using Microsoft.AspNetCore.Identity;

namespace ProfessorAIAPI.Classes
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public User()
        {
            FirstName = string.Empty;
            LastName = string.Empty;
        }

    }

}
