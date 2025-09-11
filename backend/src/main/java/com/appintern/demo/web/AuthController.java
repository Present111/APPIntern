package com.appintern.demo.web;

import com.appintern.demo.config.JwtService;
import com.appintern.demo.dto.AuthRequest;
import com.appintern.demo.dto.AuthResponse;
import com.appintern.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;

    public AuthController(UserService userService, AuthenticationManager authManager, JwtService jwtService) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest req) {
        userService.register(req.username(), req.password());
        return ResponseEntity.ok().body(java.util.Map.of("message","User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest req) {
        var auth = new UsernamePasswordAuthenticationToken(req.username(), req.password());
        authManager.authenticate(auth);
        String token = jwtService.generateToken(req.username());
        return ResponseEntity.ok(new AuthResponse(token, req.username()));
    }
}
