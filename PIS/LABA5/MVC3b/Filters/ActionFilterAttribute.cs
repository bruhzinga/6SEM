using System.Web.Mvc;

namespace Lab4b.Filters
{
    public class ActionFilterAttribute : FilterAttribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            filterContext.HttpContext.Response.Write("<p>Action Filter executed</p>");
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Write("<p>Action Filter executing</p>");
        }
    }
}