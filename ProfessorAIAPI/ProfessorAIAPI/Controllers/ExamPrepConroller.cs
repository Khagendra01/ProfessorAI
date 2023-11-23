using AutoMapper;
using Azure.AI.OpenAI;
using Azure;
using Microsoft.AspNetCore.Mvc;
using ProfessorAIAPI.Classes;
using System.Text.RegularExpressions;

namespace ProfessorAIAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class ExamPrepController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string endpoint;
        private readonly string key;
        private readonly string modelname;
        public ExamPrepController(IConfiguration configuration, IMapper mapper)
        {
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
            this._mapper = mapper;
        }

        private List<Explore> ParseResponse(string response)
        {
            List<Explore> noteList = new List<Explore>();

            // Split the response into sections
            string[] sections = response.Split(new string[] { "\n\n" }, StringSplitOptions.None);

            foreach (string section in sections)
            {
                // Split each section into title and content
                string[] parts = section.Split(new string[] { "\nContent: " }, StringSplitOptions.None);

                // Create a new Explore object
                Explore note = new Explore();
                note.Title = parts[0].Substring(parts[0].IndexOf("Title: ") + "Title: ".Length); // Remove "Title: " prefix
                note.Content = parts[1];

                // Add the new object to the list
                noteList.Add(note);
            }

            return noteList;
        }

        [HttpPost("send")]
        public async Task<ProfessorAIAPI.Classes.Response<List<Explore>>> SendExplore(List<Message> messages)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
                var response = client.GetChatCompletions(deploymentOrModelName: modelname, chatCompletionsOptions);


                List<Explore> exploreInfo = ParseResponse(response.Value.Choices[0].Message.Content);


                return new Classes.Response<List<Explore>> ("Success", exploreInfo, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<List<Explore>> ("An error occurred while processing the request.", null, false);
            }
        }

    }
}
