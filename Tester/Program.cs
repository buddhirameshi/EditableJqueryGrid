using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Tester
{
    class Program
    {
        static void Main(string[] args)
        {
          //  var task = Program.DeleteValue(100);
            //  var result = task

           // Task task = new Task(DeleteValue);
            Task task = Program.DeleteValue(0);
         //   task.Start();
         //   task.Wait();
            Console.ReadLine();
        }

        //static async void ProcessDataAsync()
        //{
        //    // Start the HandleFile method.
        //    Task task = Program.DeleteValue(100);

        //    // Control returns here before HandleFileAsync returns.
        //    // ... Prompt the user.
        //    Console.WriteLine("Please wait patiently " +
        //        "while I do something important.");

        //    // Wait for the HandleFile task to complete.
        //    // ... Display its results.
        //    int x = await task;
        //    Console.WriteLine("Count: " + x);
        //}

        private async static Task DeleteValue(int id)
        {

            var url = "http://localhost:52944/api/Item/Delete/" + id;
            using (var client = new HttpClient())
            {
                var response = await client.DeleteAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("correct");
                }
                else
                {
                    Console.WriteLine(response.Content.ReadAsStringAsync().Result);
                 //  Console.WriteLine(response.Content);
                    Console.WriteLine(response.StatusCode);
                }
            }
        }
    }
}
