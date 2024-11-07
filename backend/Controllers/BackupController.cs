using backend.Backup;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/backup")]
    [ApiController]
    public class BackupController : ControllerBase
    {
        private readonly BackupDatabase _backupDatabase;

        public BackupController(BackupDatabase backupDatabase)
        {
            _backupDatabase = backupDatabase;
        }

        [HttpPost("backup")]
        public IActionResult CreateBackup()
        {
            string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);

            string backupFolder = Path.Combine(desktopPath, "MYSQLbackups");
            if (!Directory.Exists(backupFolder))
            {
                Directory.CreateDirectory(backupFolder);
            }

            string backupFilePath = Path.Combine(
                backupFolder,
                "backup_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".sql"
            );

            _backupDatabase.Backup(backupFilePath);

            return Ok($"Backup created successfully at {backupFilePath}");
        }
    }
}
