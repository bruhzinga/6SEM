using Core_Intro.Models;
using Core_Intro.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Core_Intro.Controllers;
[ApiController]
[Route("api/[controller]")]
public class PhonesController : Controller
{
    private readonly IPhoneDictionary _phoneDictionary;

    public PhonesController(IPhoneDictionary dictionary)
    {
        _phoneDictionary = dictionary;
    }


    [HttpGet]
    public IEnumerable<Phone> Get()
    {
        return _phoneDictionary.GetAll().OrderBy(i => i.Fio);
    }


    [HttpGet("{id}")]
    public Phone Get(int id)
    {
        return _phoneDictionary.Find(id);
    }


    [HttpPost]
    public IActionResult Post([FromBody]Phone value)
    {
        return _phoneDictionary.Add(value) ? Ok() : BadRequest();
    }
        
    [HttpPut]
    public IActionResult Put([FromBody]Phone value)
    {
        return _phoneDictionary.Update(value) ? Ok() : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return _phoneDictionary.Delete(id) ? Ok() : NotFound();
    }
}