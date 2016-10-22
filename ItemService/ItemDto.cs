using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ItemDto
    {

        public int ItemID { get; set; }

        [Required(ErrorMessage ="Value is required",AllowEmptyStrings =false)]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Value is required", AllowEmptyStrings = true)]
        [MaxLength(50)]
        public string Description { get; set; }
    }
}
