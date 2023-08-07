using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace Lab4b.Controllers
{
    [RoutePrefix("cached")]
    public class ChResearchController : Controller
    {

        [HttpGet]
        [Route("ad")]
        [OutputCache(Duration = 5)]
        public ActionResult Ad()
        {
            var time = DateTime.Now.ToString(CultureInfo.InvariantCulture);
            return Content(time);
        }

        [HttpPost]
        [Route("ap")]
        [OutputCache(Location = OutputCacheLocation.Any, Duration = 15, VaryByParam = "x;y")]
        public ActionResult Ap()
        {
            var x = Request.QueryString.Get("x");
            var y = Request.QueryString.Get("y");

            return Content($"{DateTime.Now}: {x} - {y}");
        }

    }
}