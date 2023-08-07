using System;
using System.Collections.Generic;
using System.Linq;
using Interface;
using PhoneDictionary;

namespace DbLib
{
    public class PhoneRepository : IPhoneDictionary
    {
        private readonly PhoneContext _phoneContext = new PhoneContext();

        public PhoneRepository()
        {
            Console.WriteLine("i am created");
        }

        public void Create(Phone item)
        {
            _phoneContext.Phones.Add(item);
            _phoneContext.SaveChanges();
        }

        public Phone Get(int id) => _phoneContext.Phones.FirstOrDefault(c => c.Id == id);

        public IEnumerable<Phone> GetAll() => _phoneContext.Phones.OrderBy(x => x.Name).ToList();

        public void Remove(Phone item)
        {
            _phoneContext.Phones.Remove(item);
            _phoneContext.SaveChanges();
        }

        public void Update(Phone item)
        {
            var contact = Get(item.Id);
            contact.Name = item.Name;
            contact.Number = item.Number;

            _phoneContext.SaveChanges();
        }
    }
}
