using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProfessorAIAPI.Migrations
{
    public partial class Addednotetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NoteTable",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NoteValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoteCanvas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteTable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoteTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoteTable_SubjectTable_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "SubjectTable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoteTable_SubjectId",
                table: "NoteTable",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteTable_UserId",
                table: "NoteTable",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NoteTable");
        }
    }
}
