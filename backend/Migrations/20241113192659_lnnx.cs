using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class lnnx : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49918280-a6b8-4d0e-87ec-e36cb41ceed5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a0788b8-86b3-4f36-bfa8-dc8dbf624ed7");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6e0749ad-15db-4fd3-befa-7ba7a89cbf83", null, "User", "USER" },
                    { "883fba77-deda-4791-a46a-c2f5b4017f7d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6e0749ad-15db-4fd3-befa-7ba7a89cbf83");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "883fba77-deda-4791-a46a-c2f5b4017f7d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49918280-a6b8-4d0e-87ec-e36cb41ceed5", null, "Admin", "ADMIN" },
                    { "8a0788b8-86b3-4f36-bfa8-dc8dbf624ed7", null, "User", "USER" }
                });
        }
    }
}
