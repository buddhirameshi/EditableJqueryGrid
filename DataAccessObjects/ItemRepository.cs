using BusinessObjects;
using DataAccessor;
using System.Collections.Generic;
using System.Data;
using Common;
using DataAccessObjects;

namespace DataAccessObjects
{

    public class ItemRepository : IRepository<Item>
    {

       static readonly string connectionString = ConfigReader.GetConnectionString("ItemConnection");


        public bool DeleteData(int id)
        {
            Dictionary<string, object> inputParams = new Dictionary<string, object>();
            inputParams.Add("@ItemId", id);
            return DBDataAccessor.UpdateData(connectionString, "[dbo].[ItemDeleteData]", CommandType.StoredProcedure,inputParams);
        }

        public Item GetById  (int id)
        {
            Dictionary<string, object> inputParams = new Dictionary<string, object>();
            inputParams.Add("@id", id);
            return DBDataAccessor.GetItem(connectionString, "[dbo].[ItemGetDataById]", CommandType.StoredProcedure, SetItem,inputParams);
        }

        public List<Item> GetDataList()
        {
            return DBDataAccessor.GetItemList(connectionString, "[dbo].[ItemGetData]", CommandType.StoredProcedure, SetItem, null);
        }

        public bool InsertData(Item oneItem)
        {
            Dictionary<string, object> inputParams = new Dictionary<string, object>();
            inputParams.Add("@ItemId", oneItem.ItemID);
            inputParams.Add("@Price", oneItem.Price);
            inputParams.Add("@Description", oneItem.Description);
            return DBDataAccessor.UpdateData(connectionString, "[dbo].[ItemUpdateData]", CommandType.StoredProcedure, inputParams);
        }

        public bool UpdateData (Item oneItem)
        {
            Dictionary<string, object> inputParams = new Dictionary<string, object>();
            inputParams.Add("@ItemId", oneItem.ItemID);
            inputParams.Add("@Price", oneItem.Price);
            inputParams.Add("@Description", oneItem.Description);
            return DBDataAccessor.UpdateData(connectionString, "[dbo].[ItemUpdateData]", CommandType.StoredProcedure, inputParams);
        }

        private Item SetItem(IDataReader reader)
        {
            if(reader==null)
            {
                return null;
            }
            Item oneItem = new Item();
            oneItem.Description = reader.GetVal<string>("Description",string.Empty);
            oneItem.Price= reader.GetVal<decimal>("Price", 0);
          //  oneItem.PriceType = reader.GetVal<string>("PriceType", string.Empty);
            oneItem.ItemID = reader.GetVal<int>("ItemID", 0);
          //  oneItem.Cost = reader.GetVal<decimal>("Cost", 0);
            return oneItem;
        }
    }
}
