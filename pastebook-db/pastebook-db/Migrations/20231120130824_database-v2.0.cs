using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasev20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "CoverAlbum",
                table: "Albums",
                type: "varbinary(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverAlbum",
                table: "Albums");
        }
    }
}
