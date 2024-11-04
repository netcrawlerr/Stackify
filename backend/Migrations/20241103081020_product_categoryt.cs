using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class product_categoryt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47d22814-0ae5-4dd0-bae0-2118d87b2d25");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9eabc2d3-bbfb-461e-8e8b-4995e2547865");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "34796800-46ee-4729-bde5-ab060bae1d16", null, "User", "USER" },
                    { "f3c626b8-7cbb-4826-ae49-e12cbf5249be", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "34796800-46ee-4729-bde5-ab060bae1d16");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f3c626b8-7cbb-4826-ae49-e12cbf5249be");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47d22814-0ae5-4dd0-bae0-2118d87b2d25", null, "User", "USER" },
                    { "9eabc2d3-bbfb-461e-8e8b-4995e2547865", null, "Admin", "ADMIN" }
                });
        }
    }
}
