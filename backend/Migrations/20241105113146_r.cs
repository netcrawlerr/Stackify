using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class r : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a211fb12-8974-4db8-b38a-e3672e10e371");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b22af1b0-ec8b-4201-8eb6-40016809198a");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "a211fb12-8974-4db8-b38a-e3672e10e371", null, "Admin", "ADMIN" },
                    { "b22af1b0-ec8b-4201-8eb6-40016809198a", null, "User", "USER" }
                });
        }
    }
}
