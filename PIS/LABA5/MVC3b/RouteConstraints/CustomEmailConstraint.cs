using System;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Routing;

namespace Lab4b.RouteConstraints
{
    public class CustomEmailConstraint : IRouteConstraint
    {
        public bool Match(HttpContextBase httpContext, Route route, string parameterName, RouteValueDictionary values, RouteDirection routeDirection)
        {
            var emailAddress = (string)values["str"];

            Console.WriteLine(emailAddress);
            try
            {
                var m = new MailAddress(emailAddress);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}