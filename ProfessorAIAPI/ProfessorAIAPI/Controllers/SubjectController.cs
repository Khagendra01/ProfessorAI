using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfessorAIAPI.Classes;
using ProfessorAIAPI.Database;

namespace ProfessorAIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public SubjectController(ApplicationDBContext dBContext, IMapper mapper)
        {
            this._dbContext = dBContext; 
            this._mapper = mapper;
        }
        [HttpPost()]
        public async Task<Response<bool>> AddSubjectToProfile(UserSubjectReq userSubjectReq)
        {
            try
            {
                Subject? subject = await _dbContext.SubjectTable.FirstOrDefaultAsync(subject => subject.Name.ToLower() == userSubjectReq.SubjectValue.ToLower());
                if(subject is null)
                {
                    subject = new Subject
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = userSubjectReq.SubjectValue.ToLower(),
                    };                    
                    _dbContext.Add(subject);
                    await _dbContext.SaveChangesAsync();
                }
                
                if(await _dbContext.UserSubjectRelationTable.AnyAsync(userSubject => userSubject.SubjectId == subject.Id && userSubject.UserId == userSubjectReq.UserId))
                {
                    return new Response<bool>("Subject already exists on profile", false, false);
                }
                UserSubject userSubject = new UserSubject
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = userSubjectReq.UserId,
                    SubjectId = subject.Id,
                };

                _dbContext.Add(userSubject);
                await _dbContext.SaveChangesAsync();
                return new Response<bool>("Subject successfully added to the profile", true, true);

            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }

        [HttpGet("/api/subjects")]
        public async Task<Response<List<SubjectViewModel>>> GetSubjectsForUser([FromQuery] string userId)
        {
            try { 
                List<SubjectViewModel> subjectViewModel = new List<SubjectViewModel>();   
                List<UserSubject> userSubjects = await _dbContext.UserSubjectRelationTable.Where(userSubject => userSubject.UserId == userId).Include(userSubject => userSubject.SubjectDetails).ToListAsync();
                if (userSubjects.Any())
                {
                    List<Subject>subjects = userSubjects.Select(userSubject => userSubject.SubjectDetails).ToList();
                    subjectViewModel = _mapper.Map<List<SubjectViewModel>>(subjects);

                }
                return new Response<List<SubjectViewModel>>("Subjects successfully retrieived", subjectViewModel, true);
            }
            catch (Exception ex)
            {
                return new Response<List<SubjectViewModel>>(ex.Message, null, false);
            }
        }

        [HttpPost("remove")]

        public async Task<Response<bool>> RemoveSubjectForUser(UserSubjectReq userSubjectReq)
        {

            try
            {
                UserSubject? userSubject = await _dbContext.UserSubjectRelationTable.FirstOrDefaultAsync(userSubject => userSubject.SubjectId == userSubjectReq.SubjectId && userSubject.UserId == userSubjectReq.UserId);

                if (userSubject is not null) {
                    _dbContext.Remove(userSubject);
                    await _dbContext.SaveChangesAsync();
                }
                return new Response<bool>("Subject deleted succesfully", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }
    }
}
