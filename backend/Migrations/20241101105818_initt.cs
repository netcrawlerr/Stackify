using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3668557e-3280-4aa1-ad6a-9dc78a1cff81");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "98590ec7-26f3-4573-92c4-1e5c7a8dda75");

            migrationBuilder.AlterColumn<string>(
                name: "DateJoined",
                table: "Supplier",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05281bba-3d4a-47c9-9e7a-9172c9b0bad2", null, "User", "USER" },
                    { "4b05c1c6-e20a-4c4d-9021-67f520770b9d", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05281bba-3d4a-47c9-9e7a-9172c9b0bad2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4b05c1c6-e20a-4c4d-9021-67f520770b9d");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateJoined",
                table: "Supplier",
                type: "date",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3668557e-3280-4aa1-ad6a-9dc78a1cff81", null, "Admin", "ADMIN" },
                    { "98590ec7-26f3-4573-92c4-1e5c7a8dda75", null, "User", "USER" }
                });
        }
    }
}
