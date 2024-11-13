using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
