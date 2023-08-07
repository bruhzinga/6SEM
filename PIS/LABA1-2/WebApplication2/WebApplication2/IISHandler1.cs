using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;

namespace WebApplication2
{
    public class IISHandler1 : IHttpHandler
    {
        private WebSocket _socket;

        public bool IsReusable => false;

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
            {
                context.AcceptWebSocketRequest(WebSocketRequest);
            }
        }

        private async Task WebSocketRequest(AspNetWebSocketContext context)
        {
            _socket = context.WebSocket;
            Console.WriteLine("WebSocket connected");
            await Send(DateTime.Now.ToString("HH:mm:ss"));

            while (_socket.State == WebSocketState.Open)
            {
                await Task.Delay(2000);
                await Send(DateTime.Now.ToString("HH:mm:ss"));
            }
        }

        private async Task Send(string message)
        {
            var sendBuffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(message));
            await _socket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}