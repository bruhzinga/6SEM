using System.Web.Mvc;

namespace MVC1.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult NotFound(string catchall)
        {
            Response.Write($"{Request.HttpMethod}: {catchall} не поддерживается");
            return new HttpNotFoundResult();
        }

    }
}