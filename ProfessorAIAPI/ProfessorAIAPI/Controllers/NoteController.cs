using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfessorAIAPI.Classes;
using ProfessorAIAPI.Database;

namespace ProfessorAIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {

        private readonly ApplicationDBContext _dbContext;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public NoteController(ApplicationDBContext dBContext, UserManager<User> userManager, IMapper mapper)
        {

            this._dbContext = dBContext;
            this._userManager = userManager;
            this._mapper = mapper;
        }

        [HttpPost()]
        public async Task<Response<bool>> AddNoteToSubject(NoteDetail noteReq)
        {
            try
            {
                if (await _userManager.Users.AnyAsync(user => user.Id == noteReq.UserId) && await _dbContext.SubjectTable.AnyAsync(subject => subject.Id == noteReq.SubjectId))
                {
                    Note note = _mapper.Map<Note>(noteReq);
                    _dbContext.Add(note);
                    await _dbContext.SaveChangesAsync();
                    return new Response<bool>("Note successfully added to the subject", true, true);
                }
                return new Response<bool>("Something went wrong.", false, false);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }

        [HttpPost("/api/notes")]
        public async Task<Response<List<NoteListViewModel>>> GetNotes(NoteRequest noteInfo)
        {
            try
            {
                List<NoteListViewModel> noteListViewModel = new List<NoteListViewModel>();
                List<Note> userNotes = await _dbContext.NoteTable.Where(userNote => userNote.SubjectId == noteInfo.SubjectId && userNote.UserId == noteInfo.UserId).Include(userNote => userNote.SubjectDetails).ToListAsync();
                if (userNotes.Any())
                {
                    noteListViewModel = _mapper.Map<List<NoteListViewModel>>(userNotes);
                }
                return new Response<List<NoteListViewModel>>("Subjects successfully retrieived", noteListViewModel, true);
            }
            catch (Exception ex)
            {
                return new Response<List<NoteListViewModel>>(ex.Message, null, false);
            }

        }

        [HttpGet("/api/notes")]
        public async Task<Response<NoteDetail>> GetNotesForUser([FromQuery] string noteId)
        {
            try
            {
                NoteDetail myNote = new NoteDetail();
                Note? retrieveNote = await _dbContext.NoteTable.FirstOrDefaultAsync(userNote => userNote.Id == noteId);

                if (retrieveNote is not null)
                {
                    myNote = _mapper.Map<NoteDetail>(retrieveNote);

                }
                return new Response<NoteDetail>("Note successfully retrieived", myNote, true);
            }
            catch (Exception ex)
            {
                return new Response<NoteDetail>(ex.Message, null, false);
            }
        }

        [HttpDelete("{Id}")]

        public async Task<Response<bool>> DeleteNote(string Id)
        {

            try
            {
                var userNote = await _dbContext.NoteTable.FirstOrDefaultAsync(userNote => userNote.Id == Id);

                if (userNote is not null)
                {
                    _dbContext.Remove(userNote);
                    await _dbContext.SaveChangesAsync();
                }
                return new Response<bool>("Note deleted succesfully", true, true);
            }
            catch (Exception ex)
            {
                return new Response<bool>(ex.Message, false, false);
            }
        }

    }
}

