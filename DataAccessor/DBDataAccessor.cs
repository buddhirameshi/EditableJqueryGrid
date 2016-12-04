using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessor
{
    public static class DBDataAccessor
    {




        public static T GetItem<T>(string sqlConn, string sqlQuery, CommandType type, Func<IDataReader, T> Map, Dictionary<string, object> inputParams = null)
        {
            T t = default(T);
            using (SqlConnection conn = new SqlConnection(sqlConn))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
                    {
                        cmd.CommandType = type;
                        if (inputParams != null && inputParams.Count > 0)
                        {
                            foreach (var inputParam in inputParams)
                            {
                                cmd.Parameters.AddWithValue(inputParam.Key, inputParam.Value);
                            }

                        }
                        conn.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        {
                            while (dr.Read())
                            {
                                try
                                {
                                    t = Map(dr);
                                }
                                catch (Exception)
                                {
                                    continue;
                                }
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
                finally
                {
                    conn.Close();
                }
            }
            return t;
        }


        public static List<T> GetItemList<T>(string sqlConn, string sqlQuery, CommandType type, Func<IDataReader, T> Map, Dictionary<string, object> inputParams = null)
        {
            List<T> setOfT = new List<T>();
            using (SqlConnection conn = new SqlConnection(sqlConn))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
                    {
                        cmd.CommandType = type;
                        if (inputParams != null && inputParams.Count > 0)
                        {
                            foreach (var inputParam in inputParams)
                            {
                                cmd.Parameters.AddWithValue(inputParam.Key, inputParam.Value);
                            }

                        }
                        conn.Open();
                        SqlDataReader dr = cmd.ExecuteReader();
                        while (dr.Read())
                        {

                            try
                            {
                                T t = default(T);
                                t = Map(dr);
                                setOfT.Add(t);
                            }
                            catch (Exception)
                            {
                                continue;
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
                finally
                {
                    conn.Close();
                }
            }
            return setOfT;
        }

        public static DataTable GetItemTable(string sqlConn, string sqlQuery, CommandType type, Dictionary<string, object> inputParams = null)
        {
            DataTable table = new DataTable();
            using (SqlConnection conn = new SqlConnection(sqlConn))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
                    {
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        cmd.CommandType = type;
                        if (inputParams != null && inputParams.Count > 0)
                        {
                            foreach (var inputParam in inputParams)
                            {
                                cmd.Parameters.AddWithValue(inputParam.Key, inputParam.Value);
                            }

                        }
                        conn.Open();
                        adapter.Fill(table);
                    }
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
                finally
                {
                    conn.Close();
                }
            }
            return table;
        }


        public static bool UpdateData(string sqlConn, string sqlQuery, CommandType type, Dictionary<string, object> inputParams = null)
        {
            bool isUpdated = false;
            using (SqlConnection conn = new SqlConnection(sqlConn))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
                    {
                        cmd.CommandType = type;
                        if (inputParams != null && inputParams.Count > 0)
                        {
                            foreach (var inputParam in inputParams)
                            {
                                cmd.Parameters.AddWithValue(inputParam.Key, inputParam.Value);
                            }

                        }
                        conn.Open();
                        cmd.ExecuteNonQuery();
                        isUpdated = true;
                    }
                }
                catch (DataException ex)
                {
                    throw ex;
                }
                catch (SqlException ex)
                {
                    throw ex;
                }
                finally
                {
                    conn.Close();
                }
            }
            return isUpdated;

        }






public static T GetScalar<T>(string sqlConn, string sqlQuery, CommandType type, Dictionary<string, object> inputParams = null)
{
    T t = default(T);
    using (SqlConnection conn = new SqlConnection(sqlConn))
    {
        try
        {
            using (SqlCommand cmd = new SqlCommand(sqlQuery, conn))
            {
                cmd.CommandType = type;
                if (inputParams != null && inputParams.Count > 0)
                {
                    foreach (var inputParam in inputParams)
                    {
                        cmd.Parameters.AddWithValue(inputParam.Key, inputParam.Value);
                    }

                }
                conn.Open();
                t = (T)cmd.ExecuteScalar();
            }
        }
        catch (DataException ex)
        {
            throw ex;
        }
        catch (SqlException ex)
        {
            throw ex;
        }
        finally
        {
            conn.Close();
        }
    }
    return t;
}
    }
}
