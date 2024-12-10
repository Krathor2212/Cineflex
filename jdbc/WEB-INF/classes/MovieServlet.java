import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;
import java.io.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/movies/*")
public class MovieServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            
            // Create connection to the PostgreSQL database
            conn = DatabaseConnection.getConnection();
            System.out.println("Database connection established.");

            // Extract path info to check for specific movie requests
            String pathInfo = request.getPathInfo(); // e.g., /1 or /type/new

            String movieType = null;
            String company = null;
            if (pathInfo != null) {
                if (pathInfo.startsWith("/type/")) {
                    // Extract movie type and optional company from the URL
                    movieType = pathInfo.substring(6); // Extract type (e.g., "new")
                    
                    // Check if company is provided in query parameter
                    company = request.getParameter("company"); // Get company from query parameter
                    
                    // Construct SQL query based on type and company
                    String sql = "SELECT * FROM movie WHERE type = ?";
                    if (company != null && !company.isEmpty()) {
                        sql += " AND company = ?";
                    }
                    stmt = conn.prepareStatement(sql);
                    stmt.setString(1, movieType);
                    if (company != null && !company.isEmpty()) {
                        stmt.setString(2, company);
                    }
                    rs = stmt.executeQuery();
                    
                    JSONArray movieArray = new JSONArray();
                    while (rs.next()) {
                        JSONObject movieObject = new JSONObject();
                        movieObject.put("id", rs.getInt("id"));
                        movieObject.put("title", rs.getString("title"));
                        movieObject.put("subTitle", rs.getString("sub_title"));
                        movieObject.put("description", rs.getString("description"));
                        movieObject.put("backgroundImg", rs.getString("background_img"));
                        movieObject.put("cardImg", rs.getString("card_img"));
                        movieObject.put("titleImg", rs.getString("title_img"));
                        movieObject.put("videoFileLocation", rs.getString("video_file_location"));
                        movieObject.put("type", rs.getString("type"));
                        movieObject.put("company", rs.getString("company"));
                        
                        movieArray.put(movieObject);
                    }
                    out.print(movieArray.toString());
                } else {
                    // Fetch a specific movie by ID
                    String movieId = pathInfo.substring(1); // Extracts "1" from "/1"
                    String sql = "SELECT * FROM movie WHERE id = ?";
                    stmt = conn.prepareStatement(sql);
                    stmt.setInt(1, Integer.parseInt(movieId));
                    rs = stmt.executeQuery();
                    
                    if (rs.next()) {
                        JSONObject movieObject = new JSONObject();
                        movieObject.put("id", rs.getInt("id"));
                        movieObject.put("title", rs.getString("title"));
                        movieObject.put("subTitle", rs.getString("sub_title"));
                        movieObject.put("description", rs.getString("description"));
                        movieObject.put("backgroundImg", rs.getString("background_img"));
                        movieObject.put("cardImg", rs.getString("card_img"));
                        movieObject.put("titleImg", rs.getString("title_img"));
                        movieObject.put("videoFileLocation", rs.getString("video_file_location"));
                        movieObject.put("type", rs.getString("type"));
                        movieObject.put("company", rs.getString("company"));
                        
                        out.print(movieObject.toString());
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\": \"Movie not found\"}");
                    }
                }
            } else {
                // Fetch all movies if no ID or type is provided
                String sql = "SELECT * FROM movie";
                stmt = conn.prepareStatement(sql);
                rs = stmt.executeQuery();
                
                JSONArray movieArray = new JSONArray();
                while (rs.next()) {
                    JSONObject movieObject = new JSONObject();
                    movieObject.put("id", rs.getInt("id"));
                    movieObject.put("title", rs.getString("title"));
                    movieObject.put("subTitle", rs.getString("sub_title"));
                    movieObject.put("description", rs.getString("description"));
                    movieObject.put("backgroundImg", rs.getString("background_img"));
                    movieObject.put("cardImg", rs.getString("card_img"));
                    movieObject.put("titleImg", rs.getString("title_img"));
                    movieObject.put("videoFileLocation", rs.getString("video_file_location"));
                    movieObject.put("type", rs.getString("type"));
                    movieObject.put("company", rs.getString("company"));
                    
                    movieArray.put(movieObject);
                }
                
                out.print(movieArray.toString());
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"An error occurred while fetching movies: " + e.getMessage() + "\"}");
        } finally {
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
