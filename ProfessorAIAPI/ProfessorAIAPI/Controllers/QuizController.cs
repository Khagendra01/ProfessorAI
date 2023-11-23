using AutoMapper;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ProfessorAIAPI.Classes;
using System;
using System.Collections.Generic;

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

       private List<Question> ParseQuestion(string content)
{
    List<Question> questions = new List<Question>();

    // Split the content into individual questions
    string[] questionBlocks = content.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

    foreach (string block in questionBlocks)
    {
        // Split each question block into lines
        string[] lines = block.Split('\n');

        // Extract question text and answer
        string questionText = lines[0].Trim();
        string correctAnswer = lines[lines.Length - 1];
        correctAnswer  = correctAnswer.Replace("Answer: ", "");

                // Extract options
                List<string> options = new List<string>();
        for (int i = 1; i < lines.Length - 1; i++)
        {
          string optionText = lines[i].Trim();
          options.Add(optionText);
        }

        // Add the question to the list
        questions.Add(new Question(questions.Count + 1, questionText, options, correctAnswer));
    }

    return questions;
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

                List<Question> questions = new List<Question>(); // Parse the content of the choice into a Question object
                questions = ParseQuestion(response.Value.Choices[0].Message.Content);


                return new Classes.Response<List<Question>>("Success", questions, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<List<Question>>(ex.Message, null, false);
            }
        }

    }
}