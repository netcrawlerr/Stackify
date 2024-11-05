using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class fd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00755238-62da-4b17-9571-3931b63f582d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c2fcf92d-1b80-4896-a0bc-896e9a41252e");

            migrationBuilder.DropColumn(
                name: "TotalValue",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3f8997a0-d809-48a0-8762-6a4b367d266b", null, "User", "USER" },
                    { "d30813d2-c304-4c37-8517-e35534375210", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3f8997a0-d809-48a0-8762-6a4b367d266b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d30813d2-c304-4c37-8517-e35534375210");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalValue",
                table: "Products",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "00755238-62da-4b17-9571-3931b63f582d", null, "User", "USER" },
                    { "c2fcf92d-1b80-4896-a0bc-896e9a41252e", null, "Admin", "ADMIN" }
                });
        }
    }
}
