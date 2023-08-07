using System;
using System.Web;

namespace LABA1.handlers
{
    public class task5 : IHttpHandler
    {
        /// <summary>
        /// Вам потребуется настроить этот обработчик в файле Web.config вашего 
        /// веб-сайта и зарегистрировать его с помощью IIS, чтобы затем воспользоваться им.
        /// см. на этой странице: https://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region Члены IHttpHandler

        public bool IsReusable => true;

        public void ProcessRequest(HttpContext context)
        {
            var res = context.Response;

            switch (context.Request.HttpMethod)
            {
                case "GET":
                    res.ContentType = "text/html";
                    res.WriteFile("task5.html");
                    break;
                case "POST":
                    res.Write(int.Parse(context.Request.QueryString["x"]) * int.Parse(context.Request.QueryString["y"]));
                    break;
            }
        }   

        #endregion
    }
}
