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

    public class ExploreController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string endpoint;
        private readonly string key;
        private readonly string modelname;
        public ExploreController(IConfiguration configuration, IMapper mapper)
        {
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
            this._mapper = mapper;
        }

        private Explore ParseResponse(string response)
        {
            Explore fact = new Explore();

            // Split the response into lines
            string[] lines = response.Split('\n');

            foreach (string line in lines)
            {
                // Split each line into key and value
                string[] parts = line.Split(':');
                if (parts.Length == 2)
                {
                    string key = parts[0].Trim();
                    string value = parts[1].Trim();

                    // Assign values to the Explore object based on the key
                    switch (key)
                    {
                        case "Title":
                            fact.Title = value;
                            break;
                        case "Content":
                            fact.Content = value;
                            break;
                            // Add more cases for additional keys if needed
                    }
                }
            }

            return fact;
        }

        [HttpPost("send")]
        public async Task<ProfessorAIAPI.Classes.Response<Explore>> SendExplore(List<Message> messages)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
                var response = client.GetChatCompletions(deploymentOrModelName: modelname, chatCompletionsOptions);

                
                Explore exploreInfo = ParseResponse(response.Value.Choices[0].Message.Content);


                return new Classes.Response<Explore>("Success", exploreInfo, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<Explore>("An error occurred while processing the request.", null, false);
            }
        }

    }
}
