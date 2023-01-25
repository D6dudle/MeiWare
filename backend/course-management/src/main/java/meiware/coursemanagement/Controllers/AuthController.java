package meiware.coursemanagement.Controllers;

import meiware.coursemanagement.Entities.JPA.Budget;
import meiware.coursemanagement.Entities.JPA.Role;
import meiware.coursemanagement.Entities.JPA.Utilizador;
import meiware.coursemanagement.Payload.Request.LoginRequest;
import meiware.coursemanagement.Payload.Request.SignupRequest;
import meiware.coursemanagement.Payload.Response.JwtResponse;
import meiware.coursemanagement.Payload.Response.MessageResponse;
import meiware.coursemanagement.Repositories.JPA.IBudgetRepository;
import meiware.coursemanagement.Repositories.JPA.IUtilizadorRepository;
import meiware.coursemanagement.Security.JWT.JwtUtils;
import meiware.coursemanagement.Security.Services.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUtilizadorRepository utilizadorRepository;

    @Autowired
    IBudgetRepository budgetRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        Utilizador user = utilizadorRepository.findByEmail(userDetails.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt,
                user.toJSONAuth().toMap()));
    }

        @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        Boolean isUnknownRole = false;
        if (utilizadorRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        List<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        for (String role: strRoles) {
            switch (role) {
                case "COLABORADOR" ->
                        roles.add(Role.COLABORADOR);
                case "GESTOR" ->
                        roles.add(Role.GESTOR);
                case "ADMINISTRADOR" ->
                        roles.add(Role.ADMINISTRADOR);
                default ->
                        isUnknownRole = true;
            }
        }

        if (isUnknownRole){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Role is invalid!"));
        }


        // Create new user's account
        Utilizador user = new Utilizador(signUpRequest.getName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                roles);
        Budget new_budget = new Budget(user, 500f, 2023);
        utilizadorRepository.save(user);
        budgetRepository.save(new_budget);


        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
