using System;
using System.Data;
using System.Data.OracleClient;
using System.Windows;
using System.Data.SqlClient;
using System.Data.SQLite;

namespace lab1_3
{

    public partial class MainWindow : Window
    {
        static string connStr = @"Data Source=E:\source\6SEM\BD\LABA11\PublishingHouse.db;foreign keys=true;";
        public MainWindow()
        {
            InitializeComponent();
        }
     

        #region Shops
        private void allShopsClick(object sender, RoutedEventArgs e)
        {
            string sql = $"SELECT * FROM Shops";
            SQLiteDataAdapter ad;
            DataTable dt = new DataTable();
            SQLiteConnection connection = null;

            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                ad = new SQLiteDataAdapter(cmd);
                ad.Fill(dt); //fill the datasource

                usersGrid.ItemsSource = dt.DefaultView;
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }

        private void addShopClick(object sender, RoutedEventArgs e)
        {
            string sql = $"insert into Shops  values (?,?,?,?)";
            SQLiteConnection connection = null;
            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                cmd.Parameters.AddWithValue("id", Int64.Parse(textBoxId.Text));
                cmd.Parameters.AddWithValue("name", textBoxName.Text);
                cmd.Parameters.AddWithValue("address", textBoxAddres.Text);
                cmd.Parameters.AddWithValue("phone", Int64.Parse(textBoxPhone.Text));
                cmd.ExecuteScalar();
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allShopsClick(sender, e);
            }
        }

        private void dropShop_Click(object sender, RoutedEventArgs e)
        {
            string sql = $"delete FROM Shops where (id = ?);";
            SQLiteDataAdapter ad;
            DataTable dt = new DataTable();
            SQLiteConnection connection = null;
            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                cmd.Parameters.AddWithValue("id", (textBoxId.Text).ToString());
                cmd.ExecuteScalar();
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allShopsClick(sender, e);
            }
        }

        private void changeShop_Click(object sender, RoutedEventArgs e)
        {
            SQLiteConnection connection = null;
            try
            {

                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                    
                cmd.CommandText = $"update Shops set name = ?, address = ?, phone = ? where id = ?";
                cmd.Parameters.AddWithValue("name", textBoxName.Text);
                cmd.Parameters.AddWithValue("address", textBoxAddres.Text);
                cmd.Parameters.AddWithValue("phone", Int64.Parse(textBoxPhone.Text));
                cmd.Parameters.AddWithValue("id", Int64.Parse(textBoxId.Text));
                cmd.ExecuteScalar();
                connection.Close();
                allShopsClick(sender, e);
                
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allShopsClick(sender, e);
            }
        }
        #endregion Products

        #region ShopSales
        private void allSales_Click(object sender, RoutedEventArgs e)
        {
            string sql = $"SELECT * FROM ShopSales";
            SQLiteDataAdapter ad;
            DataTable dt = new DataTable();
            SQLiteConnection connection = null;

            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                ad = new SQLiteDataAdapter(cmd);
                ad.Fill(dt); //fill the datasource

                usersGridOrder.ItemsSource = dt.DefaultView;
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }

        private void changeOrder_Click(object sender, RoutedEventArgs e)
        {
            int c = 0;
            SQLiteConnection connection = null;
            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = $"update ShopSales set shop_id = ?, date = ?, price = ? where id = ?";
                cmd.Parameters.AddWithValue("shop_id", Int64.Parse(textBoxShop_id.Text));
                cmd.Parameters.AddWithValue("date", textBoxReprDate.Text);
                cmd.Parameters.AddWithValue("price", Int64.Parse(textBoxCostOrder.Text));
                cmd.Parameters.AddWithValue("id", Int64.Parse(textBoxIdSale.Text));

            
                cmd.ExecuteScalar();
                connection.Close();
                allShopsClick(sender, e);


            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allSales_Click(sender, e);
            }
        }

        private void dropOrder_Click(object sender, RoutedEventArgs e)
        {
            string sql = $"delete FROM ShopSales where (id = ?);";
            SQLiteDataAdapter ad;
            DataTable dt = new DataTable();
            SQLiteConnection connection = null;
            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                cmd.Parameters.AddWithValue("id", (textBoxIdSale.Text).ToString());
                cmd.ExecuteScalar();
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allSales_Click(sender, e);
            }
        }

        private void addOrder_Click(object sender, RoutedEventArgs e)
        {
            string sql = $"insert into ShopSales values (?, ?, ?,?)";
            SQLiteConnection connection = null;
            try
            {
                connection = new SQLiteConnection(connStr);
                SQLiteCommand cmd;
                connection.Open();  //Initiate connection to the db
                cmd = connection.CreateCommand();
                cmd.CommandText = sql;  //set the passed query
                cmd.Parameters.AddWithValue("ID", textBoxIdSale.Text);
                cmd.Parameters.AddWithValue("shop_id", textBoxShop_id.Text);
                cmd.Parameters.AddWithValue("date",textBoxReprDate.Text);
                cmd.Parameters.AddWithValue("price", textBoxCostOrder.Text);
                cmd.ExecuteScalar();
                connection.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (connection != null)
                    connection.Close();
                allSales_Click(sender, e);
            }
        }
        #endregion Orders

    }
}
