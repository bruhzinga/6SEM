using Core_Intro.Models;
using Microsoft.EntityFrameworkCore;

namespace Core_Intro.Repositories
{
    public class PhoneDictionary : IPhoneDictionary
    {
        private readonly PhoneContext _context;

        public PhoneDictionary(PhoneContext context)
        {
            _context = context;
        }

        public IEnumerable<Phone> GetAll()
        {
            return _context.Phones.OrderBy(i => i.Fio);
        }

        public bool Add(Phone dictObject)
        {
            try
            {
                _context.Phones.Add(dictObject);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Update(Phone dictObject)
        {
            try
            {
                var s = _context.Phones.Find(dictObject.Id);
                s.Fio = dictObject.Fio;
                s.Telephone = dictObject.Telephone;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                _context.Phones.Remove(_context.Phones.Find(id)!);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public Phone Find(int id)
        {
            return _context.Phones.Find(id)!;
        }
    }
}