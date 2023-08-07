using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Routing.Constraints;
using System.Web.Routing;

namespace Lab4a
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                name: "C01",
                url: "CResearch/{action}",
                defaults: new { controller = "CResearch", action = "C01" }
            );

            routes.MapRoute(
                name: "M03",
                url: "V3/{controller}/{id}/{action}",
                defaults: new { controller = "MResearch", action = "M03", id = UrlParameter.Optional },
                constraints: new { id = @"X?" }
            );

            routes.MapRoute(
                name: "M02",
                url: "V2/{controller}/{action}",
                defaults: new { controller = "MResearch", action = "M02" },
                constraints: new { action = "M01|M02" }
            );

            routes.MapRoute(
                name: "M01",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "MResearch", action = "M01", id = UrlParameter.Optional },
                constraints: new { id = @"1?", action = "(M01|M02)" }
            );

            routes.MapRoute(
                name: "Error",
                url: "{*catchall}",
                new { controller = "MResearch", action = "MXX", },
                constraints: new { controller = "MResearch", action = "MXX" }
            );
        }
    }
}