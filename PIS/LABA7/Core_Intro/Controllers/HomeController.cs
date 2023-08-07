using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Core_Intro.Models;
using Core_Intro.Repositories;

namespace Core_Intro.Controllers;

public class HomeController : Controller
{
    private readonly IPhoneDictionary _phoneDictionary;

    public HomeController(IPhoneDictionary dictionary)
    {
        _phoneDictionary = dictionary;
    }

    public IActionResult Index()
    {
        var phones = _phoneDictionary.GetAll();
        ViewBag.Objects = phones;
        return View();
    }

    public IActionResult Add()
    {
        return View();
    }

    public IActionResult Update(int id)
    {
        ViewBag.Object = _phoneDictionary.Find(id);
        return View();
    }

    [HttpPost]
    public IActionResult AddSave(Phone phone)
    {
        _phoneDictionary.Add(phone);
        return RedirectToAction("Index");
    }

    [HttpPost]
    public IActionResult UpdateSave(Phone phone)
    {
        _phoneDictionary.Update(phone);
        return RedirectToAction("Index");
    }

    [HttpGet]
    public ActionResult Delete(int id)
    {
        ViewBag.Object = _phoneDictionary.Find(id);
        return View();
    }

    // POST: Dict/Delete/5
    [HttpPost]
    public ActionResult DeleteSave(Phone phone)
    {
        _phoneDictionary.Delete(phone.Id);
        return RedirectToAction("Index");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}