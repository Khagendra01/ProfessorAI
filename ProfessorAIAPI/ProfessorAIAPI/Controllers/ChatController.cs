using AutoMapper;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfessorAIAPI.Classes;
using ProfessorAIAPI.Database;
using System;
using System.Collections.Generic;

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

        private readonly ApplicationDBContext _dbContext;
        private readonly UserManager<User> _userManager;

        public ChatController(IConfiguration configuration, IMapper mapper, ApplicationDBContext dBContext, UserManager<User> userManager)
        {
            endpoint = configuration["OpenAIConfig:endpoint"];
            key = configuration["OpenAIConfig:apikey"];
            modelname = configuration["OpenAIConfig:modelname"];
            this._mapper = mapper;

            this._dbContext = dBContext;
            this._userManager = userManager;
        }

        private async void AddToDB( ChatRequest newRequest)
        {
            //var ifExisted = _dbContext.ChatTable.FirstOrDefaultAsync(chatDB =>  chatDB.SessionId == newRequest.SessionId);

            //if (ifExisted == null)
            {
                _dbContext.Add(newRequest);
            }
           // else
            {
                //update the current table where session ID matches
            }
        }

        private async Task<ProfessorAIAPI.Classes.Response<string>> getChatCompletion(List<Message> messages, ChatRequest newRequest)
        {
            try
            {
                List<ChatMessage> chatMessages = _mapper.Map<List<ChatMessage>>(messages);
                OpenAIClient client = new(new Uri(endpoint), new AzureKeyCredential(key));

                var chatCompletionsOptions = new ChatCompletionsOptions(chatMessages);

                var response =  client.GetChatCompletions(deploymentOrModelName: modelname, chatCompletionsOptions);

                newRequest.TotalToken = response.Value.Usage.TotalTokens;

                string msg = response.Value.Choices[0].Message.Content;

                return new Classes.Response<string>("Success", msg, true);
            }
            catch (Exception ex)
            {
                return new Classes.Response<string>("Failed", null, false);
            }
        }


        [HttpPost("send")]
        public async Task<ProfessorAIAPI.Classes.Response<ChatRequest>> SendMessage(ChatRequest newRequest)
        {
            try {

                if ( !await _userManager.Users.AnyAsync(user => user.Id == newRequest.UserId) )
                {
                    return new Classes.Response<ChatRequest>("No user found", null, false);
                }


            DateTime currentDateTime = DateTime.Now;
            string formattedDateTime = currentDateTime.ToString("yyyy-MM-dd HH:mm:ss");

            if (newRequest.SessionId == "null")
            {
                newRequest.SessionId = Guid.NewGuid().ToString();
                newRequest.CacheMessages.Add( new Message
                {
                    Role = "assistant",
                    Content = "Hello, How can I help you today? My name is ProfessorAI. And, professor K-gen made me."
                } );
                 newRequest.Messages.Clear();
                newRequest.Messages.Add( new MessageFormat
                {
                    Role = "assistant",
                    Content = "Hello, How can I help you today? My name is ProfessorAI. And, professor K-gen made me.",
                    DateTime = formattedDateTime
                } );                              
            }

            if (newRequest.TotalToken > 1000)
            {
                newRequest.CacheMessages.Add(
                    new Message
                    {
                        Role = "user",
                        Content = "can you summarize all the conversation we had till now, so that I can use it to continue the conversation in the same context"
                    });
                string? content = (await getChatCompletion(newRequest.CacheMessages, newRequest)).Result;

                newRequest.CacheMessages.Clear();

                newRequest.CacheMessages.Add(
                    new Message
                    {
                        Role = "assistant",
                        Content = content
                    });
                    newRequest.TotalToken = 0;
            }

            newRequest.CacheMessages.Add(
                    new Message
                    {
                        Role = "user",
                        Content = newRequest.LastMessage.Content
                    });

            newRequest.Messages.Add(newRequest.LastMessage);

            string? response = (await getChatCompletion(newRequest.CacheMessages, newRequest)).Result;

            newRequest.CacheMessages.Add(new Message
            {
                Role = "assistant",
                Content = response
            } );

            formattedDateTime = currentDateTime.ToString("yyyy-MM-dd HH:mm:ss");

            newRequest.Messages.Add(new MessageFormat
            {
                Role = "assistant",
                Content = response,
                DateTime = formattedDateTime
            });


           

            //AddToDB( newRequest );

                return new Classes.Response<ChatRequest>("Success", newRequest, true);
            }

            catch (Exception ex)
            {
                return new Classes.Response<ChatRequest>("Failed", null, false);
            }

        }


        [HttpGet("/api/chats")]
        public async Task<ProfessorAIAPI.Classes.Response<ChatHistory>> GetChatHistory([FromQuery] string userId)
        {
            try
            {
                ChatHistory getRequest = new ChatHistory();
                //ChatRequest retrieveRequest = await _dbContext.ChatTable.FirstOrDefaultAsync(userChat => userChat.Id == userId);
                ChatRequest retrieveRequest = null;
                if (retrieveRequest is not null)
                {
                    getRequest = _mapper.Map<ChatHistory>(retrieveRequest);
                }
                return new Classes.Response<ChatHistory>("Chat History successfully retrieived", getRequest, true);

            }
            catch (Exception ex)
            {
                return new Classes.Response<ChatHistory>("Something went wrong", null, false);
            }
            
        }

         [HttpGet()]
        public async Task<ProfessorAIAPI.Classes.Response<ChatRequest>> GetChat([FromQuery] string sessionId)
        {
            try
            {
                //ChatRequest retrieveRequest = await _dbContext.ChatTable.FirstOrDefaultAsync(userChat => userChat.SessionId == sessionId);
                ChatRequest retrieveRequest = new ChatRequest();
                if (retrieveRequest is not null)
                {
                }
                return new Classes.Response<ChatRequest>("Chat successfully retrieived", retrieveRequest, true);

            }
            catch (Exception ex)
            {
                return new Classes.Response<ChatRequest>("Something went wrong", null, false);
            }
        }


        [HttpDelete("{Id}")]

        public async Task<ProfessorAIAPI.Classes.Response<bool>> DeleteChat(string Id)
        {

            try
            {
               // var userChat = await _dbContext.ChatTable.FirstOrDefaultAsync(chatDB => chatDB.SessionId == Id);

               // if (userChat is not null)
                {
                 //   _dbContext.Remove(userChat);
                //    await _dbContext.SaveChangesAsync();
                }
                return new ProfessorAIAPI.Classes.Response<bool>("Chat deleted succesfully", true, true);
            }
            catch (Exception ex)
            {
                return new ProfessorAIAPI.Classes.Response<bool>(ex.Message, false, false);
            }
        }
    }
}