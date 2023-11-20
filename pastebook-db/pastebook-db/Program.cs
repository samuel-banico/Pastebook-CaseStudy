using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Services.PasswordHash;

namespace pastebook_db
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<PastebookContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("PastebookContext") ?? throw new InvalidOperationException("Connection string 'PastebookContext' not found.")));

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddSingleton<IPasswordHash, PasswordHasher>();

            builder.Services.AddScoped<UserRepository>();
            builder.Services.AddScoped<HomeRepository>();
            builder.Services.AddScoped<FriendRepository>();
            builder.Services.AddScoped<PostRepository>();
            builder.Services.AddScoped<AlbumRepository>();
            builder.Services.AddScoped<NotificationRepository>();

            builder.Services.AddCors();

            var app = builder.Build();

            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
            );

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            SeedData.SeedDatabase(app.Services.CreateScope().ServiceProvider.GetRequiredService<PastebookContext>());

            app.UseSwagger();
            app.UseSwaggerUI();

            app.Run();
        }
    }
}