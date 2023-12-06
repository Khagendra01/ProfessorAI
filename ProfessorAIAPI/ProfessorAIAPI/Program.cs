using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProfessorAIAPI.Classes;
using ProfessorAIAPI.Database;
using System;
using System.Text;


namespace ProfessorAIAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

            using (var db = services.CreateScope().ServiceProvider.GetService<ApplicationDBContext>())
            {
                db.Database.Migrate();
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<Startup>();
               });



    }

}
