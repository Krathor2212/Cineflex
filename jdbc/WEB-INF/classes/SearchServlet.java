import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.sql.*;
import java.util.*;
import com.google.gson.Gson;

public class SearchServlet extends HttpServlet {

    // Database connection details
    private static final String URL = "jdbc:postgresql://<postgres-url>/postgres";
    private static final String USER = "username";
    private static final String PASSWORD = "password";

    // Initialize database connection
    private Connection getConnection() {
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Handle GET request for search query
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Get the search query from the request
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        String query = request.getParameter("query");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        if (query == null || query.trim().isEmpty()) {
            out.print("[]");
            out.flush();
            return;
        }

        // List to hold search results
        List<Map<String, Object>> searchResults = new ArrayList<>();

        // SQL query to search movies by title or description
        String sql = "SELECT id, title, description, card_img FROM movie WHERE title ILIKE ? OR description ILIKE ?";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Set parameters to match the query (case-insensitive)
            stmt.setString(1, "%" + query + "%");
            stmt.setString(2, "%" + query + "%");

            // Execute query and process results
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Map<String, Object> movie = new HashMap<>();
                movie.put("id", rs.getInt("id"));
                movie.put("title", rs.getString("title"));
                movie.put("description", rs.getString("description"));
                movie.put("card_img", rs.getString("card_img"));
                searchResults.add(movie);
            }

            // Convert search results to JSON
            Gson gson = new Gson();
            String json = gson.toJson(searchResults);

            // Send back search results as JSON
            out.print(json);
            out.flush();
        } catch (SQLException e) {
            e.printStackTrace();
            out.print("[]"); // Return empty array if an error occurs
            out.flush();
        }
    }
}