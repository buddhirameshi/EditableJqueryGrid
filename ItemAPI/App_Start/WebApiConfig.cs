using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;


namespace ItemAPI
{
    public static class WebApiConfig
    {
        public static object Request { get; private set; }

        public static void Register(HttpConfiguration config)
        {
           

            // Web API routes
            config.MapHttpAttributeRoutes();
         //  config.EnableCors();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
