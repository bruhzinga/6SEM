using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace Lab4b.Controllers
{
    [RoutePrefix("it")]
    public class MResearchController : Controller
    {

        [HttpGet]
        [Route("{n:int}/{str}")]
        public ActionResult M01B(int n, string str)
        {
            var template = $"GET:M01: /{n}/{str}";

            return Content(template);
        }

        [AcceptVerbs("get", "post")]
        [Route("{b:bool}/{letters:alpha}")]
        public ActionResult M02(bool b, string letters)
        {
            var template = $"{Request.HttpMethod}:M02: /{b}/{letters}";

            return Content(template);
        }

        [AcceptVerbs("get", "delete")]
        [Route("{f:float}/{str:length(2,5)}")]
        public ActionResult M03(float f, string str)
        {
            var template = $"{Request.HttpMethod}:M03: /{f}/{str}";
            return Content(template);
        }

        [HttpPut]
        [Route("{letters:alpha:length(3,4)}/{n:int:range(100,200)}")]
        public ActionResult M04(string letters, int n)
        {
            var template = $"PUT:M04: /{letters}/{n}";
            return Content(template); ;
        }

        [HttpPost]
        [Route("{str:CustomEmailConstraint}/")]
        public ActionResult M05(string str)
        {
            var template = $"POST:{str}";
            return Content(template);
        }

    }
}