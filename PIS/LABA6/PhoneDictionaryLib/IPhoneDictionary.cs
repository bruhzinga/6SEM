using System.Collections.Generic;
using PhoneDictionary;

namespace Interface
{
    public interface IPhoneDictionary
    {
        IEnumerable<Phone> GetAll();
        Phone Get(int id);
        void Create(Phone item);
        void Remove(Phone item);
        void Update(Phone item);
    }
}
