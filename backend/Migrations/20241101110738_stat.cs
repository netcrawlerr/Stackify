using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class stat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05281bba-3d4a-47c9-9e7a-9172c9b0bad2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b05c1c6-e20a-4c4d-9021-67f520770b9d");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Supplier",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "49330d1c-8c79-4612-925a-32a20cbbe60d", null, "User", "USER" },
                    { "ce135588-4a73-4034-a9f8-fc4c429d62f3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49330d1c-8c79-4612-925a-32a20cbbe60d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce135588-4a73-4034-a9f8-fc4c429d62f3");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Supplier");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05281bba-3d4a-47c9-9e7a-9172c9b0bad2", null, "User", "USER" },
                    { "4b05c1c6-e20a-4c4d-9021-67f520770b9d", null, "Admin", "ADMIN" }
                });
        }
    }
}
