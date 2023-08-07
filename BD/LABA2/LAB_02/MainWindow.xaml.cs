using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Collections.ObjectModel;
using System.Data.Entity.Migrations;
using System.Data.Entity.Spatial;
using System.Data.Entity;
using System.Runtime.Remoting.Contexts;

namespace LAB_02
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            



        }



        private void addAuthor_Click(object sender, RoutedEventArgs e)
        {
            var author = new Author(
                )
            {

                Name = textBoxIdName.Text,
                Date_of_birth = (DateTime)DateOfBirthId.SelectedDate,
                Bio = textBoxBIOID.Text,
                Nationality = textBoxNationality.Text

            };

            using (var context = new PublishingHouseEntities())
            {

                context.Authors.Add(author);
                context.SaveChanges();

            }


        }

        private void allAuthors_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                AuthorsGrid.ItemsSource = context.Authors.ToList();

            }
        }

        private void dropAuthor_Click(object sender, RoutedEventArgs e)
        {
            var author = new Author(
               )
            {
                Author_ID= Int32.Parse(textBoxID.Text),
                

            };

            using (var context = new PublishingHouseEntities())
            {
                context.Authors.Remove(context.Authors.Where(p => (p.Author_ID == author.Author_ID)).Single());
                context.SaveChanges();

            }

        }

        private void changeAuthor_Click(object sender, RoutedEventArgs e)
        {
            var author = new Author(
               )
            {
                Author_ID = Int32.Parse(textBoxID.Text),
                Name = textBoxIdName.Text,
                Date_of_birth = (DateTime)DateOfBirthId.SelectedDate,
                Bio = textBoxBIOID.Text,
                Nationality = textBoxNationality.Text

            };

            using (var context = new PublishingHouseEntities())
            {
                context.Authors.AddOrUpdate(author);
                context.SaveChanges();

            }
        }
        
        private void addSale_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                if (DateOfSaleId.SelectedDate != null)
                {
                    var sale = new Sale
                    {
                        ISBN = textBoxSaleISBN.Text,
                        Sales_date = (DateTime)DateOfSaleId.SelectedDate,
                        Copies_sold = Int32.Parse(textBoxSalesCopiesSold.Text),
                        Revenue = Int32.Parse(textBoxRevenue.Text)
                    };
                    context.Sales.Add(sale);
                }

                context.SaveChanges();

            }
        }

        private void dropSale_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                if (DateOfSaleId.SelectedDate != null)
                {
                    var sale = new Sale
                    {
                        Sales_ID = Int32.Parse(textBoxSaleID.Text),
                        
                    };
                    context.Sales.Remove(context.Sales.Where(p => (p.ISBN == sale.ISBN) && (p.Sales_date == sale.Sales_date)).Single());
                }

                context.SaveChanges();

            }
        }

        private void changeSale_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                if (DateOfSaleId.SelectedDate != null)
                {
                    var sale = new Sale
                    {
                        Sales_ID = Int32.Parse(textBoxSaleID.Text),
                        ISBN = textBoxSaleISBN.Text,
                        Sales_date = (DateTime)DateOfSaleId.SelectedDate,
                        Copies_sold = Int32.Parse(textBoxSalesCopiesSold.Text),
                        Revenue = Int32.Parse(textBoxRevenue.Text)
                    };
                    context.Sales.AddOrUpdate(sale);
                }

                context.SaveChanges();

            }
        }

        private void allSales_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                SalesGrid.ItemsSource = context.Sales.ToList();

            }
            
        }


        private void addInventory_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {

                {
                    var inventory = new Inventory()
                    {
                        ISBN = textBoxISBN.Text,
                        Copies_in_stock = Int32.Parse(textBoxCopiesInStock.Text),
                        Location = textBoxLocation.Text
                    };
                    context.Inventories.Add(inventory);
                    context.SaveChanges();
                }
            }
        }

        private void dropInventory_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {

                {
                    var inventory = new Inventory()
                    {
                        Inventory_ID = Int32.Parse(inventoryId.Text),
                      
                      
                    };
                    context.Inventories.Remove(context.Inventories.Where(p => (p.Inventory_ID == inventory.Inventory_ID)).Single());
                    context.SaveChanges();
                }
            }
        }

        private void changeInventory_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {

                {
                    var inventory = new Inventory()
                    {
                        Inventory_ID = Int32.Parse(inventoryId.Text),
                        ISBN = textBoxISBN.Text,
                        Copies_in_stock = Int32.Parse(textBoxCopiesInStock.Text),
                        Location = textBoxLocation.Text
                    };
                    context.Inventories.AddOrUpdate(inventory);
                    context.SaveChanges();
                }
            }
        }

        private void allInventory_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                InventoryGrid.ItemsSource = context.Inventories.ToList();

            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {

                var firstDate = (DateTime)FirstDate.SelectedDate;
                var secondDate = (DateTime)SecondDate.SelectedDate;

                SalesGrid.ItemsSource = context.Sales.Where(x=>x.Sales_date > firstDate && x.Sales_date < secondDate).ToList();

            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {

            using (var context = new PublishingHouseEntities())
            {
                // Load the SQL Server spatial native assemblies
                SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);

                // Parse the IDs of the two publishers you want to compare
                var publisherId1 = int.Parse(X.Text);
                var publisherId2 = int.Parse(Y.Text);

                // Retrieve the spatial coordinates of the two publishers
                var publisher1 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId1)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                var publisher2 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId2)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                // Find the intersection point of the two publishers
                var intersection = publisher1.Intersection(publisher2);

                // Set the result text to the intersection point, or "No intersection" if there is none
                RESULT.Text = intersection != null ? intersection.ToString() : "No intersection";
            }

        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                // Load the SQL Server spatial native assemblies
                SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);

                // Parse the IDs of the two publishers you want to compare
                var publisherId1 = int.Parse(X.Text);
                var publisherId2 = int.Parse(Y.Text);

                // Retrieve the spatial coordinates of the two publishers
                var publisher1 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId1)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                var publisher2 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId2)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                // Find the intersection point of the two publishers
                var intersection = publisher1.Union(publisher2);

                // Set the result text to the intersection point, or "No intersection" if there is none
                RESULT.Text = intersection != null ? intersection.ToString() : "No intersection";
            }

        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                // Load the SQL Server spatial native assemblies
                SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);

                // Parse the IDs of the two publishers you want to compare
                var publisherId1 = int.Parse(X.Text);
                var publisherId2 = int.Parse(Y.Text);

                // Retrieve the spatial coordinates of the two publishers
                var publisher1 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId1)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                var publisher2 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId2)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                // Find the intersection point of the two publishers
                var intersection = publisher1.Difference(publisher2);

                // Set the result text to the intersection point, or "No intersection" if there is none
                RESULT.Text = intersection != null ? intersection.ToString() : "No intersection";
            }

        }

        private void Button_Click_4(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                // Load the SQL Server spatial native assemblies
                SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);

                // Parse the IDs of the two publishers you want to compare
                var publisherId1 = int.Parse(X.Text);
                var publisherId2 = int.Parse(Y.Text);

                // Retrieve the spatial coordinates of the two publishers
                var publisher1 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId1)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                var publisher2 = context.Publishers
                    .Where(p => p.Publisher_ID == publisherId2)
                    .Select(p => p.Address)
                    .FirstOrDefault();

                // Find the intersection point of the two publishers
                var intersection = publisher1.Distance(publisher2);

                // Set the result text to the intersection point, or "No intersection" if there is none
                RESULT.Text = intersection != null ? intersection.ToString() : "No intersection";
            }

        }

        private void Button_Click_5(object sender, RoutedEventArgs e)
        {
            using (var context = new PublishingHouseEntities())
            {
                // Load the SQL Server spatial native assemblies
                SqlServerTypes.Utilities.LoadNativeAssemblies(AppDomain.CurrentDomain.BaseDirectory);

               SampleGrid.ItemsSource = context.Publishers.ToList();

                
            }
        }
    }
}
