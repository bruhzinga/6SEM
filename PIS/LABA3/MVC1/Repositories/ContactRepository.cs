using System;
using System.Collections.Generic;
using System.IO;
using MVC1.Models;
using Newtonsoft.Json;

namespace MVC1.Repositories
{
    public class ContactRepository
    {
        private const string FilePath = @"E:\source\6SEM\PIS\MVC\MVC1\App_Data\PhoneBook.json";

        public List<Contact> GetAll()
        {
            var fileText = File.ReadAllText(FilePath);
            var contacts = JsonConvert.DeserializeObject<List<Contact>>(fileText) ?? new List<Contact>();
            return contacts;
        }

        public void Create(Contact contact)
        {
            var contacts = GetAll();
            contacts.Add(contact);
            var json = JsonConvert.SerializeObject(contacts, Formatting.Indented);
            File.WriteAllText(FilePath, json);
        }

        public Contact GetById(Guid id)
        {
            var contacts = GetAll();
            return contacts.Find(c => c.Id.ToString() == id.ToString());
        }

        public void Remove(Contact contact)
        {
            var contacts = GetAll();
            contacts.RemoveAll(c => c.Id == contact.Id);
            var json = JsonConvert.SerializeObject(contacts, Formatting.Indented);
            File.WriteAllText(FilePath, json);
        }

        public void Update(Contact contact)
        {
            var contacts = GetAll();
            var index = contacts.FindIndex(c => c.Id == contact.Id);
            contacts[index] = contact;
            var json = JsonConvert.SerializeObject(contacts, Formatting.Indented);
            File.WriteAllText(FilePath, json);
        }
    }
}