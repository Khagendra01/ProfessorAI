using Azure.AI.OpenAI;
using System.ComponentModel.DataAnnotations;

namespace ProfessorAIAPI.Classes
{
    public class Message
    {
        [Key]
        public string Content { get; set; }
        public string Role { get; set; } 
        
    }

    public class MessageFormat
    {
        public string Role { get; set; } 
        public string Content { get; set; }
        [Key]
        public string? DateTime { get; set; }
    }
}
