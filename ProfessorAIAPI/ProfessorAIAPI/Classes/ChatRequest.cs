using Newtonsoft.Json;

namespace Temp.Models
{
    public class ChatRequest
    {

        [JsonProperty("model")]

        public string? Model { get; set; }     // Property to store the AI model used for conversation.

        [JsonProperty("messages")]

        public List<Message> Messages { get; set; }
    }

    // Define a class named Message to represent a single message in a conversation.
    public class Message
    {
        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("content")]

        public string Content { get; set; }
    }

    public class  TopicModel
    {  
    public string Topic { get; set; }
    }

    public class UserTopicModel
    {
        public string userTopic { get; set; }
    }

    public class ValidationModel
    {
        public string valid { get; set; }
    }

    public class ResponseModel
    {
        public string Question { get; set; }

        public string a { get; set; }

        public string b { get; set; }
        public string c { get; set; }
        public string d { get; set; }
        public string correct { get; set; }
    }

}
