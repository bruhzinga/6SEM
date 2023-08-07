using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace MVC2.Models
{
    public class Contact
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Name length must be between 3 and 50 characters")]
        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }
        
        [RegularExpression(@"\+375\d{9}", ErrorMessage = "Phone format is +375xxxxxxxxx")]
        [Required(ErrorMessage = "Phone is required!")]
        public string Phone { get; set; }
    }
}