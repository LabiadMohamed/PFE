package com.optistyle.service;

import com.optistyle.dto.request.LoginRequest;
import com.optistyle.dto.request.RegisterAcheteurRequest;
import com.optistyle.dto.request.RegisterVendeurRequest;
import com.optistyle.dto.response.AuthResponse;
import com.optistyle.dto.response.UtilisateurResponse;
import com.optistyle.entity.Admin;
import com.optistyle.entity.Panier;
import com.optistyle.entity.Utilisateur;
import com.optistyle.entity.Vendeur;
import com.optistyle.exception.BadRequestException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.AdminRepository;
import com.optistyle.repository.PanierRepository;
import com.optistyle.repository.UtilisateurRepository;
import com.optistyle.repository.VendeurRepository;
import com.optistyle.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final PanierRepository panierRepository;
    private final VendeurRepository vendeurRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse registerAcheteur(RegisterAcheteurRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("L'email est déjà utilisé");
        }

        Utilisateur user = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .mot_de_passe(passwordEncoder.encode(request.getMot_de_passe()))
                .role(Utilisateur.Role.ACHETEUR)
                .build();
        
        Utilisateur savedUser = utilisateurRepository.save(user);

        Panier panier = Panier.builder()
                .utilisateur(savedUser)
                .statut(Panier.StatutPanier.ACTIF)
                .build();
        panierRepository.save(panier);

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
        return buildAuthResponse(savedUser, token);
    }

    @Transactional
    public AuthResponse registerVendeur(RegisterVendeurRequest request) {
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("L'email est déjà utilisé");
        }

        Utilisateur user = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .mot_de_passe(passwordEncoder.encode(request.getMot_de_passe()))
                .role(Utilisateur.Role.VENDEUR)
                .build();
        
        Utilisateur savedUser = utilisateurRepository.save(user);

        Vendeur vendeur = Vendeur.builder()
                .utilisateur(savedUser)
                .nom_boutique(request.getNom_boutique())
                .description(request.getDescription())
                .telephone(request.getTelephone())
                .build();
        vendeurRepository.save(vendeur);

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
        return buildAuthResponse(savedUser, token);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMot_de_passe())
        );

        Utilisateur user = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        // Update Admin last login date
        if (user.getRole() == Utilisateur.Role.ADMIN) {
            Admin admin = adminRepository.findAll().stream()
                .filter(a -> a.getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Admin non trouvé"));
            admin.setDerniere_connexion(LocalDateTime.now());
            adminRepository.save(admin);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return buildAuthResponse(user, token);
    }

    public UtilisateurResponse getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = ((UserDetails) auth.getPrincipal()).getUsername();
        
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
                
        return UtilisateurResponse.builder()
                .id_utilisateur(user.getId_utilisateur())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole())
                .date_inscription(user.getDate_inscription())
                .build();
    }

    private AuthResponse buildAuthResponse(Utilisateur user, String token) {
        return AuthResponse.builder()
                .token(token)
                .id_utilisateur(user.getId_utilisateur())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
