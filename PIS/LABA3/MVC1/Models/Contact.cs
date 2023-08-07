using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MVC1.Models
{
    public class Contact
    {
        private Guid _id = Guid.NewGuid();

        [JsonProperty("Id")]
        [ScaffoldColumn(false)]
        public string Id
        {
            get => _id.ToString();
            set => _id = Guid.Parse(value);
        }

        [JsonProperty("Name")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name length must be between 3 and 50 characters")]
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }

        [JsonProperty("Phone")]
        [RegularExpression(@"\+375\d{9}", ErrorMessage = "Phone format is +375xxxxxxxxx")]
        [Required(ErrorMessage = "Phone is required!")]
        public string Phone { get; set; }
    }
}