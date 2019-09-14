using System.Threading.Tasks;
using DatingAPP.API.Models;

namespace DatingAPP.API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> IsUserExists(string username);
    }
}