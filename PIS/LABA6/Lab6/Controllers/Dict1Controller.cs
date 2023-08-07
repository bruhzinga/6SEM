using System.Web.Mvc;
using Interface;
using Ninject;
using PhoneDictionary;

namespace Lab6.Controllers
{
    public class Dict1Controller : Controller
    {
        private readonly IPhoneDictionary _contactRepository;

        public Dict1Controller()
        {
        }

        public Dict1Controller([Named("Request")]IPhoneDictionary contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public ActionResult Index()
        {
            return View(_contactRepository.GetAll());
        }

        [HttpGet]
        public ActionResult Add()
        {
            return View();
        }

        [HttpPost, ActionName("Add")]
        public ActionResult AddSave(Phone contact)
        {
            if (ModelState.IsValid)
            {
                _contactRepository.Create(contact);
                return RedirectToAction("Index");
            }

            return View(contact);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            var contact = _contactRepository.Get(id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }

        [HttpPost, ActionName("Update")]
        public ActionResult UpdateSave(Phone contact)
        {
            if (!ModelState.IsValid) return View(contact);

            _contactRepository.Update(contact);

            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var contact = _contactRepository.Get(id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }


        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteSave(int id)
        {
            _contactRepository.Remove(_contactRepository.Get(id));

            return RedirectToAction("Index");
        }

        public ActionResult Error()
        {
            return View();
        }
    }
}