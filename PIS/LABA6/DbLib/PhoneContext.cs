using System.Data.Entity;
using Interface;
using PhoneDictionary;

namespace DbLib
{
    public class PhoneContext : DbContext
    {
        public PhoneContext() : base(
            "Data Source=127.0.0.1,1433;Initial Catalog=PhoneBook2;User=sa;Password=Secret1234;TrustServerCertificate=True;Integrated Security=False;")
        {
            Database.CreateIfNotExists();
        }

        public DbSet<Phone> Phones { get; set; }
    }
}
