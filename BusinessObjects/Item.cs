using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
   public class Item
    {
        public int ItemID { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public decimal Cost { get; set; }
        public string PriceType { get; set; }
    }
}
