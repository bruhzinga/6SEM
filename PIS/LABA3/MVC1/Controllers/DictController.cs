    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC1.Models;
using MVC1.Repositories;

namespace MVC1.Controllers
{
    public class DictController : Controller
    {
        private readonly ContactRepository _contactRepository = new ContactRepository();
        
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
        public ActionResult AddSave(Contact contact)
        {
            if (!ModelState.IsValid) return View(contact);
            
            _contactRepository.Create(contact);
            return RedirectToAction("Index");
        }
        
        [HttpGet]
        public ActionResult Update(Guid id)
        {
            var contact = _contactRepository.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }

        [HttpPost, ActionName("Update")]
        public ActionResult UpdateSave(Contact contact)
        {
            if (!ModelState.IsValid) return View(contact);
            _contactRepository.Update(contact);
            return RedirectToAction("Index");

        }
        
        [HttpGet]
        public ActionResult Delete(Guid id)
        {
            var contact = _contactRepository.GetById(id);
            if (contact == null)
            {
                return HttpNotFound();
            }

            return View(contact);
        }
        
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteSave(Guid id)
        {
            _contactRepository.Remove(_contactRepository.GetById(id));
            return RedirectToAction("Index");
        }


        [HttpGet]
        public ActionResult Error()
        {
            return View();
        }

    }
}