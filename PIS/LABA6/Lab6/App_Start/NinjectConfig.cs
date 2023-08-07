using Interface;
using JsonLib;
using Ninject.Modules;
using Ninject.Web.Common;

//using DbLib;

namespace Lab6
{
    public class NinjectConfig : NinjectModule
    {
        public override void Load()
        {
            Bind<IPhoneDictionary>().To<PhoneRepository>().InTransientScope().Named("Transient");
            Bind<IPhoneDictionary>().To<PhoneRepository>().InThreadScope().Named("Thread");
            Bind<IPhoneDictionary>().To<PhoneRepository>().InRequestScope().Named("Request");


            Bind<IPhoneDictionary>().To<DbLib.PhoneRepository>().InRequestScope().Named("RequestDb");
            Bind<IPhoneDictionary>().To<DbLib.PhoneRepository>().InThreadScope().Named("ThreadDb");
            Bind<IPhoneDictionary>().To<DbLib.PhoneRepository>().InTransientScope().Named("TransientDb");
        }
    }
}