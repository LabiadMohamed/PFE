package com.optistyle.controller;

import com.optistyle.dto.request.LoginRequest;
import com.optistyle.dto.request.RegisterAcheteurRequest;
import com.optistyle.dto.request.RegisterVendeurRequest;
import com.optistyle.dto.response.AuthResponse;
import com.optistyle.dto.response.UtilisateurResponse;
import com.optistyle.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/acheteur")
    public ResponseEntity<AuthResponse> registerAcheteur(@Valid @RequestBody RegisterAcheteurRequest request) {
        return new ResponseEntity<>(authService.registerAcheteur(request), HttpStatus.CREATED);
    }

    @PostMapping("/register/vendeur")
    public ResponseEntity<AuthResponse> registerVendeur(@Valid @RequestBody RegisterVendeurRequest request) {
        return new ResponseEntity<>(authService.registerVendeur(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UtilisateurResponse> getMe() {
        return ResponseEntity.ok(authService.getMe());
    }
}
