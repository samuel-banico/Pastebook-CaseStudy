using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
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

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddSingleton<IPasswordHash, PasswordHasher>();

            builder.Services.AddScoped<UserRepository>();

            var app = builder.Build();

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

            SeedData.SeedDatabase(app.Services.CreateScope().ServiceProvider.GetRequiredService<PastebookContext>());

            app.Run();
        }
    }
}