using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lab4b.Filters;

namespace Lab4b.Controllers
{
    [RoutePrefix("filters")]
    public class AResearchController : Controller
    {
        [HttpGet]
        [Route("aa")]
        [Filters.ActionFilter]
        public ActionResult AA()
        {
            return Content("<p>Action 'AA' content</p>");
        }

        [HttpGet]
        [Route("ar")]
        [ResultFilter]
        public ActionResult AR()
        {
            return Content("<p>Action 'AR' content</p>");
        }

        [HttpGet]
        [Route("ae")]
        [ExceptionFilter]
        public ActionResult AE()
        {
            throw new Exception("Exception from action 'AE'");
        }


    }
}