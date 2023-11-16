using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasev1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageComments_Users_User_FriendId",
                table: "AlbumImageComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageLikes_Users_User_FriendId",
                table: "AlbumImageLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImages_Albums_AlbumId",
                table: "AlbumImages");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Posts_PostId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Posts_PostId",
                table: "PostLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_User_FriendId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "User_FriendId",
                table: "Posts",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_User_FriendId",
                table: "Posts",
                newName: "IX_Posts_FriendId");

            migrationBuilder.RenameColumn(
                name: "User_FriendId",
                table: "AlbumImageLikes",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageLikes_User_FriendId",
                table: "AlbumImageLikes",
                newName: "IX_AlbumImageLikes_FriendId");

            migrationBuilder.RenameColumn(
                name: "User_FriendId",
                table: "AlbumImageComments",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageComments_User_FriendId",
                table: "AlbumImageComments",
                newName: "IX_AlbumImageComments_FriendId");

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "PostLikes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FriendId",
                table: "PostLikes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "PostComments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FriendId",
                table: "PostComments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Albums",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "AlbumImages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Albums_UserId",
                table: "Albums",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageComments_Friends_FriendId",
                table: "AlbumImageComments",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageLikes_Friends_FriendId",
                table: "AlbumImageLikes",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImages_Albums_AlbumId",
                table: "AlbumImages",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostComments_Posts_PostId",
                table: "PostComments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Posts_PostId",
                table: "PostLikes",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Friends_FriendId",
                table: "Posts",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageComments_Friends_FriendId",
                table: "AlbumImageComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageLikes_Friends_FriendId",
                table: "AlbumImageLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImages_Albums_AlbumId",
                table: "AlbumImages");

            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Users_UserId",
                table: "Albums");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Posts_PostId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Posts_PostId",
                table: "PostLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Friends_FriendId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Albums_UserId",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Albums");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "Posts",
                newName: "User_FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_FriendId",
                table: "Posts",
                newName: "IX_Posts_User_FriendId");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "AlbumImageLikes",
                newName: "User_FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageLikes_FriendId",
                table: "AlbumImageLikes",
                newName: "IX_AlbumImageLikes_User_FriendId");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "AlbumImageComments",
                newName: "User_FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageComments_FriendId",
                table: "AlbumImageComments",
                newName: "IX_AlbumImageComments_User_FriendId");

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "PostLikes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "FriendId",
                table: "PostLikes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "PostComments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "FriendId",
                table: "PostComments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Notifications",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "AlbumImages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageComments_Users_User_FriendId",
                table: "AlbumImageComments",
                column: "User_FriendId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageLikes_Users_User_FriendId",
                table: "AlbumImageLikes",
                column: "User_FriendId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImages_Albums_AlbumId",
                table: "AlbumImages",
                column: "AlbumId",
                principalTable: "Albums",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostComments_Posts_PostId",
                table: "PostComments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Posts_PostId",
                table: "PostLikes",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_User_FriendId",
                table: "Posts",
                column: "User_FriendId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
