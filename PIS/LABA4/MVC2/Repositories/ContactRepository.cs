using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using MVC2.App_Data;
using MVC2.Models;

namespace MVC2.Repositories
{
    public class ContactRepository
    {
        private readonly DataContext _dataContext = new DataContext();
        
        public List<Contact> GetAll()
        {
            return _dataContext.Contacts.ToList();
        }

        public void Create(Contact contact)
        {
            _dataContext.Contacts.Add(contact);
            _dataContext.SaveChanges();
        }

        public Contact GetById(Guid id)
        {
            return _dataContext.Contacts.FirstOrDefault(x => x.Id == id);
        }

        public void Remove(Contact contact)
        {
            _dataContext.Contacts.Remove(contact);
            _dataContext.SaveChanges();
        }

        public void Update(Contact contact)
        {
            _dataContext.Contacts.AddOrUpdate(contact); 
            _dataContext.SaveChanges();
        }
    }
}