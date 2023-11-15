using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class PastebookContext : DbContext
    {
        public PastebookContext(DbContextOptions<PastebookContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
    }
}
