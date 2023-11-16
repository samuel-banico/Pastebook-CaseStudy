using Microsoft.AspNetCore.Mvc;

namespace pastebook_db.Controllers
{
    public class LoginController : Controller
    {

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Login() 
        {
            return View();
        }
    }
}
