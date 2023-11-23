using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProfessorAIAPI.Migrations
{
    public partial class Addedsubjecttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubjectTable",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectTable", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserSubjectRelationTable",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SubjectId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubjectRelationTable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSubjectRelationTable_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSubjectRelationTable_SubjectTable_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "SubjectTable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSubjectRelationTable_SubjectId",
                table: "UserSubjectRelationTable",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSubjectRelationTable_UserId",
                table: "UserSubjectRelationTable",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSubjectRelationTable");

            migrationBuilder.DropTable(
                name: "SubjectTable");
        }
    }
}
