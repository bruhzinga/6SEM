using System.Web.Mvc;

namespace Lab4b.Filters
{
    public class ResultFilterAttribute : FilterAttribute, IResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            filterContext.HttpContext.Response.Write("<p>Result Filter executed</p>");
        }

        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Write("<p>Result Filter executing</p>");
        }
    }
}