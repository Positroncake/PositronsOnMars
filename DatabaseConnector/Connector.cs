using System.Data;
using Dapper;
using MySql.Data.MySqlClient;

namespace DatabaseConnector
{
    public interface IConnector
    {
        Task<List<T>> QueryAsync<T, TU>(string query, TU parameters);
        Task ExecuteAsync<T>(string command, T parameters);
    }

    public class Connector : IConnector
    {
        private const string ConnStr =
            "Server=172.105.105.74;Port=3306;Database=positron;Uid=positroncake;Pwd=4FzPdtxCXzbgd6R6Eg5sNjrV";

        public async Task<List<T>> QueryAsync<T, TU>(string query, TU parameters)
        {
            using IDbConnection connection = new MySqlConnection(ConnStr);
            IEnumerable<T> rows = await connection.QueryAsync<T>(query, parameters);
            return rows.ToList();
        }

        public Task ExecuteAsync<T>(string command, T parameters)
        {
            using IDbConnection connection = new MySqlConnection(ConnStr);
            return connection.ExecuteAsync(command, parameters);
        }
    }
}