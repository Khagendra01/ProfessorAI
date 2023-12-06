using System.ComponentModel.DataAnnotations;

namespace ProfessorAIAPI.Classes
{
    public class ChatRequest
    {
        [Key]
        public string SessionId { get; set; }
        public string? Title { get; set; }
        public MessageFormat? LastMessage { get; set; }
        public List<Message>? CacheMessages { get; set; }
        public List<MessageFormat>? Messages { get; set; }
        public int? TotalToken { get; set; }
        public string UserId { get; set; }
        

        public ChatRequest() {
            this.SessionId = Guid.NewGuid().ToString();
        }

    }

    public class ChatHistory
    {
        public string? SessionId { get; set; }
        public string? Title { get; set; }

    }
}
