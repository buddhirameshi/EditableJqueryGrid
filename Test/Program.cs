using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            //Queue<int> q = new Queue<int>();

            //q.Enqueue(5);   // Add 5 to the end of the Queue.
            //q.Enqueue(10);  // Then add 10. 5 is at the start.
            //q.Enqueue(15);  // Then add 15.
            //q.Enqueue(20);  // Then add 20.


            //foreach (int value in q)
            //{

            //    Console.WriteLine(h.Dequeue());
            //}
            //Console.Read();
            Program p = new Program();
            
            Console.WriteLine(Program.ReverseWithRecursion("testyruhdnf", 5));
            Console.Read();

        }


        
        private int[] Rec(int [] a)
        {

           // int newIteration = tot - (iteration - 1);
            int length = a.Length;
            int[] b = new int[length];

          
            for (int i=0,j=length-1;i<=j;i++,j--)
            {
                // int j = length - (i-1);
                b[j]= a[i];
                b[i]= a[j];
            }
            // b[newIteration] = a[iteration];
            return b;
        }

        private static string ReverseWithRecursion(string source, int len)
        {
            if (len == 1)
                return source;
            else
                return ReverseWithRecursion(source.Substring(1, source.Length - 1), --len) + source[0].ToString();
        }

        private void T()
        {
            int[] a = { 1, 2, 3, 4};
            var y = Rec(a);
            foreach (var t in y)
            {
                Console.WriteLine(t);
            }
            Console.Read();
        }

        ////    Queue<int> q = new Queue<int>();

        ////    q.Enqueue(5);   // Add 5 to the end of the Queue.
        ////    q.Enqueue(10);  // Then add 10. 5 is at the start.
        ////    q.Enqueue(15);  // Then add 15.
        ////    q.Enqueue(20);  // Then add 20.

        ////    //Queue<int> a = new Queue<int>();
        //// //   Stack<int> c = DeepCopy(q);
        ////    int stackLength = q.Count();
        ////    Stack<int> d=new Stack<int>();
        ////    for (int i = 0; i < stackLength; i++)
        ////    {
        ////        d.Push(q.Dequeue());
        ////    }

        ////    var dd = d.Reverse();
        ////    int two = dd.Count();
        //// //   Stack<int> e = DeepCopy(d);
        ////    foreach (var val in dd)
        ////    {
        ////       Console.WriteLine(val);
        ////    }
        ////    Console.Read();
        ////}

        ////private static T DeepCopy<T>(T q)
        ////{
        ////    T t = default(T);
        ////    using (var ms = new MemoryStream())
        ////    {
        ////        var formatter = new BinaryFormatter();
        ////        formatter.Serialize(ms, q);
        ////        ms.Position = 0;

        ////        t = (T)formatter.Deserialize(ms);
        ////    }

        ////    return t;
       //// }
    }
}
