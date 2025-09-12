package com.appintern.demo.web;

import com.appintern.demo.config.JwtService;
import com.appintern.demo.dto.AuthRequest;
import com.appintern.demo.dto.AuthResponse;
import com.appintern.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public AuthController(UserService userService,
                          AuthenticationManager authManager,
                          JwtService jwtService,
                          UserDetailsService userDetailsService) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest req) {
        userService.register(req.username(), req.password());
        return ResponseEntity.ok().body(java.util.Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest req) {
        // Xác thực username/password
        var authentication = new UsernamePasswordAuthenticationToken(req.username(), req.password());
        authManager.authenticate(authentication);

        // Lấy UserDetails từ UserDetailsService để ký JWT
        var userDetails = userDetailsService.loadUserByUsername(req.username());
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token, userDetails.getUsername()));
    }
}
