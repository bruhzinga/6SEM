using Core_Intro.Models;

namespace Core_Intro.Repositories
{
    public interface IPhoneDictionary
    {
        IEnumerable<Phone> GetAll();
        bool Add(Phone dictObject);
        bool Update(Phone dictObject);
        bool Delete(int id);
        Phone Find(int id);
    }
}