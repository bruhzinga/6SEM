using System.Data.Entity;
using MVC2.Models;

namespace MVC2.App_Data
{
    public class DataContext : DbContext
    {
        public DataContext() : base("DefaultConnection")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasKey(p => p.Id);
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}