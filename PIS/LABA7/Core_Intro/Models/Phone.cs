namespace Core_Intro.Models
{
    public class Phone : IComparable<Phone>
    {
        public int Id { get; set; }
        public string Fio { get; set; }
        public string Telephone { get; set; }
        public int CompareTo(Phone p)
        {
            return string.Compare(Fio, p.Fio, StringComparison.Ordinal);
        }
    }
}