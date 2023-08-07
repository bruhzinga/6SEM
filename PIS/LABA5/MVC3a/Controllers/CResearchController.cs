using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Lab4a.Controllers
{
    public class CResearchController : Controller
    {

        [AcceptVerbs("get", "post")]
        public ActionResult C01()
        {
            var template = new StringBuilder($"Method: {Request.HttpMethod}<br>")
                                               .Append($"Query params: {Request.QueryString}<br>")
                                               .Append($"Uri: {Request.Path}<br>");

            var headers = Request.Headers;

            template.Append("Headers:<br>");

            foreach(var key in headers.AllKeys)
            {
                foreach(var value in headers.GetValues(key))
                {
                    template.Append($"-- {key} : {value}<br>");
                }
            }

            var bodyStream = new StreamReader(Request.InputStream);
            bodyStream.BaseStream.Seek(0, SeekOrigin.Begin);
            template.Append($"Body: {bodyStream.ReadToEnd()}");


            return Content(template.ToString());
        }

        [AcceptVerbs("get", "post")]
        public ActionResult C02()
        {
            var template = new StringBuilder($"Status: {Response.Status}<br>");

            var headers = Response.Headers;

            template.Append("Headers:<br>");

            foreach (var key in headers.AllKeys)
            {
                foreach (var value in headers.GetValues(key))
                {
                    template.Append($"-- {key} : {value}<br>");
                }
            }

            var bodyStream = new StreamReader(Request.InputStream);
            bodyStream.BaseStream.Seek(0, SeekOrigin.Begin);
            template.Append($"Body: {bodyStream.ReadToEnd()}");

            return Content(template.ToString());
        }
    }
}