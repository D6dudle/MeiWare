package meiware.coursemanagement.Payload.Response;

import org.json.JSONObject;

import java.util.List;
import java.util.Map;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Map user;

    public JwtResponse(String accessToken, Map user) {
        this.token = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Map getUser() {
        return user;
    }

    public void setUser(Map user) {
        this.user = user;
    }
}
