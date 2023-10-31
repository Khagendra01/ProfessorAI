using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProfessorAIAPI.Classes;
using ProfessorAIAPI.Database;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProfessorAIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IMapper mapper)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
            this._mapper = mapper;


        }

        [HttpPost("register")]
        public async Task<Response<bool>> Register(RegisterInfo info)
        {
            try
            {
                IdentityUser? existingUser = await _userManager.FindByEmailAsync(info.EmailAddress);
                if (existingUser is not null)
                {
                    return new Response<bool>("User already exists", false, false);
                }

                User user = _mapper.Map<User>(info);

                var result = await _userManager.CreateAsync(user, info.Password);


                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    await _userManager.ConfirmEmailAsync(user, code);
                    return new Response<bool>("User registered", true, true);
                }
                return new Response<bool>("User not registered", false, false);
            }
            catch(Exception ex)
            {
                return new Response<bool>("User not registered", false, false);
            }


        }

        [HttpPost("login")]
        public async Task<Response<UserDetail>> Login(LoginInfo info)
        {
            try
            {

                var result = await _signInManager.PasswordSignInAsync(info.Username, info.Password, false, false);
                if (!result.Succeeded)
                {
                    return new Response<UserDetail>("Login credentials invalid", null, false);
                }
                User user = await _userManager.FindByEmailAsync(info.Username);
                UserDetail detail = _mapper.Map<UserDetail>(user);
                detail.AccessToken = GenerateAccessToken(user);
                return new Response<UserDetail>("Login successfull", detail, true);

            }
            catch (Exception ex)
            {
                return new Response<UserDetail>("User not registered", null, false);
            }
        }

        [HttpGet("refresh-login")]
        public async Task<Response<UserDetail>> Login()
        {
            try
            {
                string id = User.FindFirst("PrimarySid").Value.ToString();
                if ( id is null)
                {
                    return new Response<UserDetail>("Login credentials invalid", null, false);
                }
                User user = await _userManager.FindByIdAsync(id);
                UserDetail detail = _mapper.Map<UserDetail>(user);
                detail.AccessToken = GenerateAccessToken(user);
                return new Response<UserDetail>("Login successfull", detail, true);

            }
            catch (Exception ex)
            {
                return new Response<UserDetail>("User not registered", null, false);
            }
        }



        private string GenerateAccessToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim("PrimarySid", user.Id),
            new Claim(ClaimTypes.Email, user.Email)
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:issuer"],
                audience: _configuration["JWT:audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(100),
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        } 
    }
}
