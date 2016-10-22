﻿using Service;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ItemAPI.Controllers
{

  //  [EnableCors(origins: "http://localhost:60977,http://ramz", headers: "*", methods: "*")]
    public class ItemController : ApiController
    {

        ItemService service = new ItemService();


        // GET: Items
        [HttpGet]
        [Route("api/Item/GetItems")]
        public IHttpActionResult GetData()
        {
           return Ok(service.GetData());
        }

        // GET: Item
        [HttpGet]
        [Route("api/Item/GetItem/{id}")]
        public IHttpActionResult GetDataById(int id)
        {
            return Ok(service.GetDataByID(id));
        }


        // Delete: Item
        [HttpDelete]
        [Route("api/Item/DeleteItem/{id}")]
        public IHttpActionResult DeleteData([FromUri]int id)
        {
            if(id==0||id<0)
            {
                return BadRequest("Provided Id valus is invalid.");
            }
            return Ok(service.DeleteData(id));
        }

        // Insert: Item
        [Route("api/Item/InsertItem")]
        [HttpPost]
        public IHttpActionResult InsertData([FromBody]ItemDto oneItem)
        {
            if (oneItem==null)
            {
                return BadRequest("Provided data is invalid.");
            }
            return Ok(service.InsertData(oneItem));
        }

        // Update: Item
        [Route("api/Item/UpdateItem")]
        [HttpPost]
        public IHttpActionResult UpdateData([FromBody]ItemDto oneItem)
        {
            if (oneItem == null||oneItem.ItemID==0||oneItem.ItemID<0)
            {
                return BadRequest("Provided data is invalid.");
            }
            return Ok(service.UpdateData(oneItem));
        }

    }
}