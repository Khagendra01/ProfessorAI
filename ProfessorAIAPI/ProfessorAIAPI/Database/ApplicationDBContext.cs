using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProfessorAIAPI.Classes;
using System.Security.Cryptography.X509Certificates;

namespace ProfessorAIAPI.Database
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            
        }

        public DbSet<Subject> SubjectTable { get; set; }    
        public DbSet<UserSubject> UserSubjectRelationTable { get; set; }
        public DbSet<Note> NoteTable { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
                .HasMany(user => user.Subjects)
                .WithOne(subject => subject.User)
                .HasForeignKey(user => user.UserId);
            builder.Entity<Subject>()
                .HasMany(subject => subject.UserSubjects)
                .WithOne(usersubject => usersubject.SubjectDetails)
                .HasForeignKey(usersubject => usersubject.SubjectId);

            builder.Entity<User>()
            .HasMany(user => user.Notes)
            .WithOne(note => note.User)
            .HasForeignKey(user => user.UserId);
            builder.Entity<Subject>()
                .HasMany(subject => subject.Notes)
                .WithOne(note => note.SubjectDetails)
                .HasForeignKey(usersubject => usersubject.SubjectId);

        }
    }
}
