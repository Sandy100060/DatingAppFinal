using System;
using System.Linq;
using System.Threading.Tasks;
using DatingAPP.API.Interfaces;
using DatingAPP.API.Models;
using DatingAPP.API.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingAPP.API.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<bool> IsUserExists(string username)
        {
            if (await _context.Users.FirstOrDefaultAsync(x => x.Username.Equals(username)) != null)
                return true;
            return false;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));
            if (user == null)
                return null;
            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var userpasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                if (userpasswordHash.Count() == passwordHash.Count())
                {
                    for (int i = 0; i < userpasswordHash.Count(); i++)
                    {
                        if (userpasswordHash[i] != passwordHash[i])
                            return false;
                    }
                }
                else
                    return false;
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}