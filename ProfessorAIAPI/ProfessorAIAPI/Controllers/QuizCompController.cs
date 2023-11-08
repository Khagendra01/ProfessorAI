using Microsoft.AspNetCore.Mvc;
using Temp.Models;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Text;
using Microsoft.Azure.Cosmos;
using System.Text.RegularExpressions;

namespace Temp.Controllers
{
    [ApiController]
    [Route("/quiz")]
    public class QuizCompController : Controller
    {
        // To access the configuration
        private readonly IConfiguration _configuration;

        public QuizCompController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("getValidation")]
        public async Task<IActionResult> GetValidation([FromBody] UserTopicModel userModel)
        {
            if (userModel == null)
            {
                return BadRequest("Invalid Data");
            }

            string requestedTopic = userModel.userTopic;

            // Create a string to send as a message to the server.
            // This particular string asks if the user entered topic is valid. This validation is required to generate the quiz questions.
            string requestString = $"Do you recognize {requestedTopic} as a topic that quiz questions can be generated? Give me the response in json format with the property: \"valid\": . The \"valid\" property should be \"yes\" if the quiz questions can be generated related to this topic and \"no\" if you donot recognize the topic.";

            // New chat request.
            ChatRequest chatRequest = new ChatRequest()
            {
                Model = _configuration["OpenAI:Model"],
                Messages = new List<Message>()
                    {
                     new Message()
                      {
                      Role = "user",
                      Content = requestString
                      }
                    }
            };
            // response message from the server as a 'Message' object.
            Message gptResponse = await GetGPTResponse(chatRequest);

            if (gptResponse != null)
            {
                string responseMessage = gptResponse.Content;

                // Extract the json part from the message. This is the data we want to send to the frontend so that questions and options can be set.
                string jsonPart = extractJsonFromMessage(responseMessage);

                // Deserialize to match the frontend's expected format.
                var finalResponse = JsonConvert.DeserializeObject<ValidationModel>(jsonPart);

                return Ok(finalResponse);
            }
            else
            {
                return StatusCode(500, "Error while fetching the response.");
            }

        }

        [HttpPost]
        [Route("getQuestion")]
        public async Task<IActionResult> GetQuestion([FromBody] TopicModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid Data");  // 400 bad request
            }

            string topic = model.Topic;

            // Build the request string with the topic variable. This message is sent to the server for getting the questions and options.
            string requestString = $"Generate a quiz question on the topic {topic} with four options. Give me the response in json format with the properties: \"Question\": , \"a\": , \"b\": , \"c\": , \"d\": , \"correct\": . The \"correct\" property has the value \"a\",\"b\",\"c\",\"d\" depending on the correct answer option.";

            // New chat request.
            ChatRequest chatRequest = new ChatRequest()
            {
                Model = _configuration["OpenAI:Model"],
                Messages = new List<Message>()
                    {
                     new Message()
                      {
                      Role = "user",
                      Content = requestString
                      }
                    }
            };
            // response message from the server as a 'Message' object.
            Message gptResponse = await GetGPTResponse(chatRequest);

            if (gptResponse != null)
            {
                string responseMessage = gptResponse.Content;

                // Extract the json part from the message. This is the data we want to send to the frontend so that questions and options can be set.
                string jsonPart = extractJsonFromMessage(responseMessage);

                // Deserialize to match the frontend's expected format.
                var finalResponse = JsonConvert.DeserializeObject<ResponseModel>(jsonPart);

                return Ok(finalResponse);
            }
            else
            {
                return StatusCode(500, "Error while fetching the response.");
            }
        }

        private string extractJsonFromMessage(string responseMessage)
        {
            // Regualr expression matching to extract the json part of the response message.
            string pattern = @"\{[^{}]+\}";
            Match match = Regex.Match(responseMessage, pattern);

            if (match.Success)
            {
                return match.Value;
            }
            else
            {
                // Handle the case where no JSON object is found
                return null;
            }
        }


        // Method to obtain a GPT response by making an API call.
        private async Task<Message> GetGPTResponse(ChatRequest jsonBody)
        {
            // Initialize an HTTP client to interact with the GPT API.
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(_configuration["OpenAI:APIEndpoint"]);
            client.DefaultRequestHeaders.Accept.Clear();

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + _configuration["OpenAI:APIkey"]);

            // Prepare an HTTP request with the JSON body containing conversation history and the user's message.
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, client.BaseAddress);
            request.Content = new StringContent(JsonConvert.SerializeObject(jsonBody), Encoding.UTF8, "application/json");

            // Send the request and process the response.
            var response = await client.SendAsync(request).ConfigureAwait(false);
            var responseString = string.Empty;
            try
            {
                response.EnsureSuccessStatusCode();
                responseString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var responseJson = JObject.Parse(responseString);
                return JsonConvert.DeserializeObject<Message>(responseJson["choices"][0]["message"].ToString());
            }
            catch (HttpRequestException ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }

        }
    }
}
