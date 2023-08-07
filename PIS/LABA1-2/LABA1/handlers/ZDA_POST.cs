using System;
using System.Web;

namespace LABA1.handlers
{
    public class ZDA_POST : IHttpHandler
    {
        
        #region Члены IHttpHandler

        public bool IsReusable
        {
            // Верните значение false в том случае, если ваш управляемый обработчик не может быть повторно использован для другого запроса.
            // Обычно значение false соответствует случаю, когда некоторые данные о состоянии сохранены по запросу.
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            var res = context.Response;
            res.ContentType = "text/plain";
            res.Write($"GET-Http-HTA: ParmA={context.Request.QueryString["ParmA"]}, ParmB={context.Request.QueryString["ParmB"]}");
        }

        #endregion
    }
}
