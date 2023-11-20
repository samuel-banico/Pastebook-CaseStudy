﻿using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System;
using System.Reflection.Emit;

namespace pastebook_db.Database
{
    public class PastebookContext : DbContext
    {
        public PastebookContext() { }
        public PastebookContext(DbContextOptions<PastebookContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Friend> Friends { get; set; } = null!;
        public DbSet<FriendRequest> FriendRequests { get; set; } = null!;

        public DbSet<Album> Albums { get; set; } = null!;
        public DbSet<AlbumImage> AlbumImages { get; set; } = null!;
        public DbSet<AlbumImageComment> AlbumImageComments { get; set; } = null!;
        public DbSet<AlbumImageLike> AlbumImageLikes { get; set; } = null!;

        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<PostLike> PostLikes { get; set; } = null!;
        public DbSet<PostComment> PostComments { get; set; } = null!;

        public DbSet<Notification> Notifications { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=tcp:pointwest-casestudy.database.windows.net,1433;Initial Catalog=teampancit_db;User Id=db_admin@pointwest-casestudy;Password=teamPancit.123");
            }
        }

        protected override void OnModelCreating(ModelBuilder mB)
        {
            mB.Entity<Friend>()
                .HasOne(a => a.User_Friend)
                .WithMany(a => a.FriendList)
                .HasForeignKey(a => a.User_FriendId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}