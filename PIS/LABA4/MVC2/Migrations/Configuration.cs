
using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

namespace MVC2.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<App_Data.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }
    } 
}