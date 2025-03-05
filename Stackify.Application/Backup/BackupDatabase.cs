using System.Diagnostics;

using Microsoft.Extensions.Options;
using Stackify.Infrastructure.Config;

namespace Stackify.Application.Backup;

public class BackupDatabase
{
    private readonly MysqlSettings _mysqlSettings;

    public BackupDatabase(IOptions<MysqlSettings> mysqlSettings)
    {
        _mysqlSettings = mysqlSettings.Value;
    }

    public void Backup(string backupFilePath)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = @"C:\xampp\mysql\bin\mysqldump.exe",
                Arguments =
                    $"-u {_mysqlSettings.User} -p{_mysqlSettings.Password} {_mysqlSettings.Database}",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            },
        };

        process.Start();

        string output = process.StandardOutput.ReadToEnd();
        string errors = process.StandardError.ReadToEnd();

        process.WaitForExit();

        File.WriteAllText(backupFilePath, output);

        if (!string.IsNullOrEmpty(errors))
        {
            throw new InvalidOperationException($"mysqldump failed: {errors}");
        }
    }
}
