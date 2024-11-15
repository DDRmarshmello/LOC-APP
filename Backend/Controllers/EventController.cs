using Backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EventController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EventController> _logger;

        public EventController(AppDbContext context, IConfiguration configuration, ILogger<EventController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateEvent([FromForm] string Event, [FromForm] List<IFormFile>? images)
        {
            try
            {
                var eventRegister = JsonSerializer.Deserialize<EventRegister>(Event);
                _context.Entry(eventRegister).State = EntityState.Added;
                await _context.SaveChangesAsync();

                // Verifica si las imágenes fueron enviadas
                if (images != null && images.Any())
                {
                    var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                    // Asegúrate de que la carpeta de destino exista
                    if (!Directory.Exists(uploadPath))
                    {
                        Directory.CreateDirectory(uploadPath);
                    }

                    foreach (var item in images)
                    {
                        // Generar un nombre único para el archivo (puedes modificar esto para mayor seguridad)
                        var fileName = item.FileName;
                        var filePath = Path.Combine(uploadPath, fileName);

                        // Guardar el archivo en el sistema de archivos
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await item.CopyToAsync(fileStream);
                        }

                        // Guardar solo la ruta del archivo en la base de datos
                        await _context.Images.AddAsync(new Image
                        {
                            Description = Path.GetFileNameWithoutExtension(item.FileName),
                            ImageData = filePath, // Guardamos la ruta del archivo
                            EventRegisterID = eventRegister.Id,
                        });
                    }

                    // Guardar los cambios en la base de datos
                    await _context.SaveChangesAsync();
                }


                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("DeleteMeters/{id}")]
        public async Task<IActionResult> DeleteEvent(int? id)
        {
            try
            {
                if (id != null && id != 0)
                    return BadRequest();

                var item = await _context.EventRegisters.Where(x => x.Id == id).FirstOrDefaultAsync();

                if (item == null)
                    return NotFound();

                _context.Remove(item);
                await _context.SaveChangesAsync();

                return Ok();
            }

            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("EditEvent")]
        public async Task<IActionResult> EditEvent([FromBody] EventRegister Event)
        {
            try
            {
                _context.Entry(Event).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(Event);
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500, ex.Message);
            }

        }
    }
}
