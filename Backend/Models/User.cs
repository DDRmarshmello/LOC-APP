using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Fecha de creación
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // Fecha de actualización
    }
}