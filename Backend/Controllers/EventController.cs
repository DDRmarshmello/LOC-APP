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

                foreach (var item in images)
                {
                    byte[] fileBytes;
                    using (var memoryStream = new MemoryStream())
                    {
                        await item.CopyToAsync(memoryStream);
                        fileBytes = memoryStream.ToArray();
                    }

                    await _context.Images.AddAsync(new Image
                    {
                        Description = Path.GetFileNameWithoutExtension(item.FileName),
                        ImageData = fileBytes,
                        EventRegisterID = eventRegister.Id,
                    });

                };

                await _context.SaveChangesAsync();

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
