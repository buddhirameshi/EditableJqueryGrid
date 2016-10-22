using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessObjects
{
    public interface IRepository <T>
    {
        T GetById(int id);
        //DataTable GetDataTable();
        List<T> GetDataList();
        bool UpdateData(T t);
        bool DeleteData(int id);
        bool InsertData(T t);

    }
}
