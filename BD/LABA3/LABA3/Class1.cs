using Microsoft.SqlServer.Server;
using System;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Net;
using System.Net.Mail;

namespace LABA3
{

    public partial class StoreProcedure
    {



        [Microsoft.SqlServer.Server.SqlProcedure]
        public static void SendEmailOnUpdate(SqlString tableName, SqlString recipients, SqlString subject, SqlString body)
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

            using (SqlConnection connection = new SqlConnection("context connection=true"))
            {
                connection.Open();// Check if the table has been updated
                SqlCommand command = new SqlCommand(string.Format("SELECT COUNT(*) FROM {0}", tableName.Value), connection);
                int rowCount = (int)command.ExecuteScalar();

                if (rowCount > 0)
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential("zvor2003@gmail.com", "wbmbdvhkdsutptft"),
                        EnableSsl = true,
                    };

                    smtpClient.Send("zvor2003@gmail.com", "zvor2003@gmail.com", (string)subject, (string)body);

                    // Emulate sending an e-mail message by printing to the console
                    string message = string.Format("To: {0}\nSubject: {1}\n\n{2}", recipients.Value, subject.Value, body.Value);
                    SqlContext.Pipe.Send(message);
                }
            }
        }
       
    }

}