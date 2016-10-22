using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
   public class ItemObjectMapper
    {
        public Item ToBusinessObject(ItemDto dto)
        {
            if(dto==null)
            {
                return null;
            }
            Item oneItem = new Item();
            oneItem.Description = dto.Description;
            oneItem.Price = dto.Price;
            oneItem.ItemID = dto.ItemID;
            return oneItem;
        }

        public ItemDto ToTransferObject(Item oneItem)
        {
            if (oneItem == null)
            {
                return null;
            }
            ItemDto dto = new ItemDto();
            dto.Description = oneItem.Description;
            dto.Price = oneItem.Price;
            dto.ItemID = oneItem.ItemID;
            return dto;
        }

        public List<ItemDto> ToTransferObjectList(List<Item> items)
        {
            if (items == null||items.Count==0)
            {
                return null;
            }
            List<ItemDto> dtoSet = new List<ItemDto>();
            foreach(var item in items)
            {
                ItemDto dto = new ItemDto();
                dto.Description = item.Description;
                dto.Price = item.Price;
                dto.ItemID = item.ItemID;
                dtoSet.Add(dto);
            }
            return dtoSet;
        }


    }
}
