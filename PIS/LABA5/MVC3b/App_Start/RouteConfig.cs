using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Routing;
using System.Web.Routing;
using Lab4b.RouteConstraints;

namespace Lab4b
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            var constraintsResolver = new DefaultInlineConstraintResolver();
            constraintsResolver.ConstraintMap.Add("CustomEmailConstraint", typeof(CustomEmailConstraint));
            routes.MapMvcAttributeRoutes(constraintsResolver);

        }
    }
}
