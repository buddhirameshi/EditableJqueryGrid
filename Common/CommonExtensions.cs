using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public static class CommonExtensions
    {
        public static T GetVal<T>(this IDataReader reader,string key,T defaultValue)
        {
            T t = defaultValue;
            if (reader == null || string.IsNullOrEmpty(key))
            {
                return t;
            }
            try
            {
                if (reader[key] == DBNull.Value)
                {
                    return defaultValue;
                }
                t = (T)(reader[key]);
            }
            catch(InvalidCastException ex)
            {
                throw ex;
            }
            return t;
        }
    }
}
