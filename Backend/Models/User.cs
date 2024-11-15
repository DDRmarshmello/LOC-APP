using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using static System.Net.Mime.MediaTypeNames;

namespace Backend.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
        [StringLength(100, ErrorMessage = "El nombre de usuario no puede exceder los 100 caracteres.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        public string PasswordHash { get; set; }

        [StringLength(150, ErrorMessage = "El correo electrónico no puede exceder los 150 caracteres.")]
        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public string? Email { get; set; }

        // Puedes incluir propiedades adicionales según tus necesidades
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now; // Fecha de creación
        public DateTime UpdatedAt { get; set; } = DateTime.Now; // Fecha de actualización
        public ICollection<EventRegister>? EventRegisters { get; set; }
    }

    [Table("EventRegister")]
    public class EventRegister
    {
        [Key]
        public int Id { get; set; }
        public string username { get; set; }
        public int usernameId { get; set; }
        public string nombre_empresa {  get; set; }
        public string cedula_rnc {  get; set; }
        public string latitud {  get; set; }
        public string longitud { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public string? Description { get; set; }
        public string? Notas { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
    }

    public class Image
    {
        public int Id { get; set; }
        public string ImageData { get; set; }
        public string Description { get; set; }
        public int EventRegisterID { get; set; }

        // Propiedad de navegación
        [JsonIgnore]
        public EventRegister EventRegister { get; set; }
    }
}