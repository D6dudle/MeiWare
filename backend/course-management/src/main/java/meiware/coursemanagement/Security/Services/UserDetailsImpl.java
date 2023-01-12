package meiware.coursemanagement.Security.Services;

import java.util.*;
import java.util.stream.Collectors;

import meiware.coursemanagement.Entities.JPA.*;
import meiware.coursemanagement.Security.JWT.AuthTokenFilter;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
    private static final Long serialVersionUID = 1L;

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsImpl.class);

    private Long id;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private static List<GrantedAuthority> ROLE_USER;

    public UserDetailsImpl(Long id, String username, String email, String password,List<GrantedAuthority> roles) {
        this.id = id;
        this.username = email;
        this.email = email;
        this.password = password;
        this.ROLE_USER = roles;
    }

    public static UserDetailsImpl build(Utilizador user) {

        List<String> roleList = new ArrayList<String>();

        for(Role role : user.getRoles()){
            roleList.add("ROLE_"+role);
        }

        String[] stringArray = roleList.toArray(new String[0]);

        logger.debug(Arrays.toString(stringArray));

        List<GrantedAuthority> roles = Collections.unmodifiableList(AuthorityUtils.createAuthorityList(stringArray));

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getEmail(),
                user.getPassword(),
                roles);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return ROLE_USER;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    public String toString(){
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("username", username);
        obj.put("email", email);
        obj.put("password", password);
        obj.put("authorities", ROLE_USER);
        return obj.toString();
    }
}
