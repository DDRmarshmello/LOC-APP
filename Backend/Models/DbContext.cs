using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<EventRegister> EventRegisters { get; set; }
        public DbSet<Image> Images { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de la relación uno a muchos entre User y EventRegister
            modelBuilder.Entity<User>()
                .HasMany(u => u.EventRegisters)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.usernameId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Image>()
            .HasOne(i => i.EventRegister)
            .WithMany(e => e.Images)
            .HasForeignKey(i => i.EventRegisterID)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}