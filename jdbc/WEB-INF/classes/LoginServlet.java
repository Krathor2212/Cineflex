import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    System.out.println("Received email: " + email);
    System.out.println("Received password: " + password);


    try (Connection conn = DatabaseConnection.getConnection()) {
        String query = "SELECT * FROM users WHERE email = ? AND password = ?";
        PreparedStatement stmt = conn.prepareStatement(query);
        stmt.setString(1, email);
        stmt.setString(2, password);

        ResultSet rs = stmt.executeQuery();
        PrintWriter out = response.getWriter();
        response.setContentType("text/plain"); // Optional, but good practice

        if (rs.next()) {
            // User authenticated
            out.print("Login successful! Welcome, " + rs.getString("email") + "!");
            System.out.println("Login successful! Welcome, " + rs.getString("email") + "!");
        } else {
            // Authentication failed
            out.print("Invalid email or password.");
            System.out.println("Invalid email or password.");

        }
    } catch (Exception e) {
        e.printStackTrace();
        response.getWriter().print("An error occurred: " + e.getMessage());
    }
}
}
