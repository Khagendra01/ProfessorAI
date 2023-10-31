using Azure.AI.OpenAI;

namespace ProfessorAIAPI.Classes
{
    public class Message
    {
        public string Role { get; set; } // backing field for _Role property
        public string Content { get; set; }
    }
}
