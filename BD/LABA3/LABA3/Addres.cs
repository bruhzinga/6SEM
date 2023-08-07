using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LABA3
{
    using System.Data.SqlTypes;
    using System.IO;
    using Microsoft.SqlServer.Server;

    [Serializable]
    [SqlUserDefinedType(Format.UserDefined, MaxByteSize = 8000)]
    public class Address : INullable, IBinarySerialize
    {
        private bool _isNull;

        private string _streetAddress;
        private string _city;
        private string _state;
        private string _zipCode;

        public static Address Parse(SqlString s)
        {
            if (s.IsNull)
            {
                return Null;
            }

            // Split the input string into its components
            string[] components = s.Value.Split(',');

            // Create a new Address object
            Address address = new Address();

            // Set the properties of the Address object
            address.StreetAddress = components.Length > 0 ? components[0].Trim() : "";
            address.City = components.Length > 1 ? components[1].Trim() : "";
            address.State = components.Length > 2 ? components[2].Trim() : "";
            address.ZipCode = components.Length > 3 ? components[3].Trim() : "";

            return address;
        }

        public override string ToString()
        {
            if (this._isNull)
            {
                return "NULL";
            }

            // Create a string representation of the Address object
            StringBuilder sb = new StringBuilder();
            sb.Append(this.StreetAddress);
            sb.Append(", ");
            sb.Append(this.City);
            sb.Append(", ");
            sb.Append(this.State);
            sb.Append(" ");
            sb.Append(this.ZipCode);

            return sb.ToString();
        }


        public bool IsNull
        {
            get { return _isNull; }
        }

        public static Address Null
        {
            get
            {
                Address address = new Address();
                address._isNull = true;
                return address;
            }
        }

        public string StreetAddress
        {
            get { return _streetAddress; }
            set { _streetAddress = value; }
        }

        public string City
        {
            get { return _city; }
            set { _city = value; }
        }

        public string State
        {
            get { return _state; }
            set { _state = value; }
        }

        public string ZipCode
        {
            get { return _zipCode; }
            set { _zipCode = value; }
        }

        public void Read(BinaryReader r)
        {
            StreetAddress= r.ReadString();
            City= r.ReadString();
            State= r.ReadString();
            ZipCode= r.ReadString();
       
        }

        public void Write(BinaryWriter w)
        {
            w.Write(StreetAddress);
            w.Write(City);
            w.Write(State);
            w.Write(ZipCode);
            
        }
    }

}
