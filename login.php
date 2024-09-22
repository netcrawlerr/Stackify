<?php
session_start(); // Start the session

// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    header("Location: welcome.php"); // Redirect to welcome page if logged in
    exit();
}

// Initialize variables
$error = '';

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize input
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Database connection
    require 'database.php'; // Include your database connection

    // Prepare and execute SQL statement
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if user exists
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify the password (assuming it's hashed)
        if (password_verify($password, $user['password'])) {
            // Store username in session
            $_SESSION['username'] = $username;
            header("Location: welcome.php"); // Redirect to welcome page
            exit();
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "User not found.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="styles.css"> <!-- Link to the CSS file -->
</head>
<body>
    <div class="container">
        <h2><i class="fas fa-user-circle"></i> Login</h2>
        <?php if ($error): ?>
            <p class="error"><?php echo $error; ?></p>
        <?php endif; ?>
        <form method="POST" action="">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="register.php">Register here</a>.</p>
    </div>
</body>
</html>