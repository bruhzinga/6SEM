using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MVC1
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Dict", action = "Index", id = UrlParameter.Optional },
                constraints: new { controller="Dict", action = "Index|Add|AddSave|Update|UpdateSave|Delete|DeleteSave|Error" }
            );

            routes.MapRoute(
                name: "404-catch-all",
                url: "{*catchall}",
                defaults: new { controller = "Error", action = "NotFound" }
            );
        }
    }
}