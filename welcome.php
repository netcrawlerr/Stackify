<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <!-- Include Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        /* Custom animations */
        .fade-in {
            animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body class="bg-slate-900 flex items-center justify-center min-h-screen relative">
    <a href="logout.php" class="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-lg py-1 px-4">Logout</a>
    <div class="bg-slate-900 shadow-lg rounded-lg p-8 fade-in text-center">
        <h1 class="text-4xl font-bold mb-4">Welcome to Our Platform!</h1>
        <p class="text-lg mb-6">We are glad to have you here. Explore our features and enjoy your experience.</p>
        <h2 class="text-2xl font-bold mb-4">Hello, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
        <p class="mb-6">Your journey starts now. Let's make the most of it together.</p>
        <!-- Logout button removed from here -->
         <p class="text-3xl text-stone-800">Explore More </p>
    </div>
</body>
</html>