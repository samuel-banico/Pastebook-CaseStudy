using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasev21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageComments_Friends_FriendId",
                table: "AlbumImageComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageLikes_Friends_FriendId",
                table: "AlbumImageLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes");

            migrationBuilder.DropColumn(
                name: "CommentCount",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CommentCount",
                table: "AlbumImages");

            migrationBuilder.DropColumn(
                name: "LikeCount",
                table: "AlbumImages");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "PostLikes",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_PostLikes_FriendId",
                table: "PostLikes",
                newName: "IX_PostLikes_UserId");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "PostComments",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_PostComments_FriendId",
                table: "PostComments",
                newName: "IX_PostComments_UserId");

            migrationBuilder.RenameColumn(
                name: "CoverAlbum",
                table: "Albums",
                newName: "CoverAlbumImage");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "AlbumImageLikes",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageLikes_FriendId",
                table: "AlbumImageLikes",
                newName: "IX_AlbumImageLikes_UserId");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "AlbumImageComments",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageComments_FriendId",
                table: "AlbumImageComments",
                newName: "IX_AlbumImageComments_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageComments_Users_UserId",
                table: "AlbumImageComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AlbumImageLikes_Users_UserId",
                table: "AlbumImageLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostComments_Users_UserId",
                table: "PostComments",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Users_UserId",
                table: "PostLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageComments_Users_UserId",
                table: "AlbumImageComments");

            migrationBuilder.DropForeignKey(
                name: "FK_AlbumImageLikes_Users_UserId",
                table: "AlbumImageLikes");

            migrationBuilder.DropForeignKey(
                name: "FK_PostComments_Users_UserId",
                table: "PostComments");

            migrationBuilder.DropForeignKey(
                name: "FK_PostLikes_Users_UserId",
                table: "PostLikes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "PostLikes",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_PostLikes_UserId",
                table: "PostLikes",
                newName: "IX_PostLikes_FriendId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "PostComments",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_PostComments_UserId",
                table: "PostComments",
                newName: "IX_PostComments_FriendId");

            migrationBuilder.RenameColumn(
                name: "CoverAlbumImage",
                table: "Albums",
                newName: "CoverAlbum");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "AlbumImageLikes",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageLikes_UserId",
                table: "AlbumImageLikes",
                newName: "IX_AlbumImageLikes_FriendId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "AlbumImageComments",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_AlbumImageComments_UserId",
                table: "AlbumImageComments",
                newName: "IX_AlbumImageComments_FriendId");

            migrationBuilder.AddColumn<int>(
                name: "CommentCount",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LikeCount",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CommentCount",
                table: "AlbumImages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LikeCount",
                table: "AlbumImages",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
                name: "FK_PostComments_Friends_FriendId",
                table: "PostComments",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostLikes_Friends_FriendId",
                table: "PostLikes",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
