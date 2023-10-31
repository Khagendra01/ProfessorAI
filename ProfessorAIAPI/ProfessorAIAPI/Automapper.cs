using AutoMapper;
using Azure.AI.OpenAI;
using ProfessorAIAPI.Classes;

namespace ProfessorAIAPI
{
    public class Automapper : Profile

    {
        public Automapper() : base()
        {
            CreateMap<Message, ChatMessage>()
                .ForMember(dest => dest.Role, src => src.MapFrom(src => new ChatRole(src.Role)));
            CreateMap<User, UserDetail>()
                .ForMember(dest => dest.EmailAddress, src => src.MapFrom(src => src.Email)).ReverseMap();
            CreateMap<RegisterInfo, User>()
                .ForMember(dest => dest.Email, src => src.MapFrom(src => src.EmailAddress))
                .ForMember(dest => dest.UserName, src => src.MapFrom(src => src.EmailAddress));
        }
    }
}
