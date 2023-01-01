package meiware.coursemanagement.Payload.Response;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JwtResponse {
    private Map<String, String> token;
    private Map<String, Object> user;

    public JwtResponse(String accessToken, Map<String, Object> user) {
        this.token = new HashMap<>();
        this.token.put("tokenType", "Bearer");
        this.token.put("accessToken", accessToken);
        this.user = user;
    }

    public Map<String, String> getToken() {
        return token;
    }

    public void setToken(Map<String, String> token) {
        this.token = token;
    }

    public Map<String, Object> getUser() {
        return user;
    }

    public void setUser(Map<String, Object> user) {
        this.user = user;
    }
}
