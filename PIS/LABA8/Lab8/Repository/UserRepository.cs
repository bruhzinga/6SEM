using System.Collections.Generic;
using System.Linq;
using Lab8.Context;
using Microsoft.EntityFrameworkCore;

namespace Lab8.Repository
{
    public class UserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context;
        }

        public void Add(User entity)
        {
            _context.Set<User>().Add(entity);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Set<User>().ToList();
        }

        public User GetById(int id)
        {
            return _context.Set<User>().Find(id);
        }

        public bool Remove(int id)
        {
            var original = _context.Users.FirstOrDefault(x => x.Id == id);

            if (original is null)
                return false;

            _context.Users.Remove(original);

            return true;
        }

        public bool Update(User entity)
        {
            var original = _context.Users.FirstOrDefault(x => x.Id == entity.Id);

            if (original is null)
                return false;

            _context.Entry(original).CurrentValues.SetValues(entity);

            _context.SaveChanges();

            return true;
        }
    }
}