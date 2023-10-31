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
    public class ChatController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly string endpoint;
        private readonly string key;
        private readonly string modelname;
        public ChatController(IConfiguration configuration, IMapper mapper)
        { 
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
            this._mapper = mapper;
        }

        [HttpPost("send")]
        public async Task<ProfessorAIAPI.Classes.Response<Message>> SendMessage (List<Message>messages)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));
                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);
                var response = client.GetChatCompletions(
        deploymentOrModelName: modelname,
        chatCompletionsOptions);

                Message chat = new Message { Role = response.Value.Choices[0].Message.Role.ToString(), Content = response.Value.Choices[0].Message.Content };

                return new Classes.Response<Message>("Success", chat, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<Message>("Failed", null, false);
            }
        }
    }
}