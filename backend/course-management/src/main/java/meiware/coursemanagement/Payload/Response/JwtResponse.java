package meiware.coursemanagement.Payload.Response;

import org.json.JSONObject;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private JSONObject user;

    public JwtResponse(String accessToken, JSONObject user) {
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

    public JSONObject getUser() {
        return user;
    }

    public void setUser(JSONObject user) {
        this.user = user;
    }
}
