using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class supp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f8997a0-d809-48a0-8762-6a4b367d266b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d30813d2-c304-4c37-8517-e35534375210");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Supplier",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49918280-a6b8-4d0e-87ec-e36cb41ceed5", null, "Admin", "ADMIN" },
                    { "8a0788b8-86b3-4f36-bfa8-dc8dbf624ed7", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49918280-a6b8-4d0e-87ec-e36cb41ceed5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a0788b8-86b3-4f36-bfa8-dc8dbf624ed7");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Supplier");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f8997a0-d809-48a0-8762-6a4b367d266b", null, "User", "USER" },
                    { "d30813d2-c304-4c37-8517-e35534375210", null, "Admin", "ADMIN" }
                });
        }
    }
}
