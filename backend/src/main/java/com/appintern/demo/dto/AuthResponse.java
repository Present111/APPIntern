package com.appintern.demo.dto;

public record AuthResponse(
        String token,
        String username
) {}
