using BusinessObjects;
using DataAccessObjects;
using Service;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ItemAPI.Controllers
{
    //  [EnableCors(origins: "http://localhost:60977,http://ramz", headers: "*", methods: "*")]
    public class ItemController : ApiController
    {
        IRepository<Item> repo = new ItemRepository();
        ItemService service;
       public ItemController()
        {
             service = new ItemService(repo);
        }

        // GET: Items
        [HttpGet]
        [Route("api/Item/GetItems")]
        public IHttpActionResult GetData([FromUri]string filter=null,[FromUri]string sort=null,[FromUri] bool isSortDirAsc=false)
        {
           return Ok(service.GetData(filter,sort,isSortDirAsc));
        }

        // GET: Items
        [HttpGet]
        [Route("api/Item/GetItems/{filter}")]
        public IHttpActionResult GetFilteredData(string filter)
        {
            return Ok(service.GetData(filter));
        }



        //// GET:Total Item Count
        //[HttpGet]
        //[Route("api/Item/GetItemCount")]
        //public IHttpActionResult GetItemCount()
        //{
        //    return Ok(service.GetItemCount());
        //}

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
        [HttpPut]
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