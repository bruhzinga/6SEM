using Microsoft.EntityFrameworkCore;

namespace Core_Intro.Models
{
    public sealed class PhoneContext : DbContext
    {
        public DbSet<Phone> Phones { get; set; }
        public PhoneContext(DbContextOptions<PhoneContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}