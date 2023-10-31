namespace ProfessorAIAPI.Classes
{
    public class RegisterInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string EmailAddress { get; set; }
        public string Password { get; set; }

        public RegisterInfo()
        {
            FirstName = string.Empty;
            LastName = string.Empty;   
            EmailAddress = string.Empty;
            Password = string.Empty;
        }

    }
}
