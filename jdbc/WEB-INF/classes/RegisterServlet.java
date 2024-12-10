import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Setting CORS headers for frontend communication
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
        // Setting response content type to JSON to prevent XML parsing errors
        response.setContentType("application/json");

        // Get parameters from the request
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        // Validate if the email already exists
        try (Connection conn = DatabaseConnection.getConnection()) {
            // Check if the email already exists
            String checkQuery = "SELECT * FROM users WHERE email = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setString(1, email);
            
            ResultSet rs = checkStmt.executeQuery();
            PrintWriter out = response.getWriter();
            
            if (rs.next()) {
                // If the email already exists
                out.print("{\"message\": \"Email already registered. Please use a different email.\"}");
                return; // Stop further execution if email is found
            }
            
            // If email does not exist, proceed with registration
            String query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, username);
            stmt.setString(2, email);
            stmt.setString(3, password);

            int rows = stmt.executeUpdate();
            
            if (rows > 0) {
                out.print("{\"message\": \"User registered successfully!\"}");
            } else {
                out.print("{\"message\": \"Error in registration.\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\": \"Error during registration.\"}");
        }
    }
}
