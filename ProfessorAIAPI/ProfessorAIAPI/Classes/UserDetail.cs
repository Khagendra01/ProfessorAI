namespace ProfessorAIAPI.Classes
{
    public class UserDetail
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string EmailAddress { get; set; }

        public string AccessToken { get; set; }

        public UserDetail()
        {
            this.Id = string.Empty; 
            this.FirstName = string.Empty;
            this.LastName = string.Empty;
            this.EmailAddress = string.Empty;
            this.AccessToken = string.Empty;
        }

    }
}
