using AutoMapper;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProfessorAIAPI.Classes;
using System;

namespace ProfessorAIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string endpoint;
        private readonly string key;
        private readonly string modelname;
        public QuizController(IConfiguration configuration, IMapper mapper)
        {
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
            this._mapper = mapper;
        }

        private Question ParseQuestion(string content)
        {
            // Split the content into lines
            var lines = content.Split('\n');

            // Assume the first line is the question text
            var questionText = lines[0];

            // Assume the next four lines are the options
            var options = lines.Skip(1).Take(4).ToList();

            // Assume the last line is the correct answer
            var correctAnswer = lines.Last();

            return new Question
            {
                QuestionText = questionText,
                Options = options,
                CorrectAnswer = correctAnswer
            };
        }


        [HttpPost("getQuiz")]
        public async Task<ProfessorAIAPI.Classes.Response<List<Question>>> SendQuestion(List<Message> messages)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
                var response = client.GetChatCompletions(deploymentOrModelName: modelname, chatCompletionsOptions);

                List<Question> questions = new List<Question>();
                foreach (var choice in response.Value.Choices)
                {
                    // Parse the content of the choice into a Question object
                    Question question = ParseQuestion(choice.Message.Content);
                    questions.Add(question);
                }

                return new Classes.Response<List<Question>>("Success", questions, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<List<Question>>("Failed", null, false);
            }
        }

    }
}