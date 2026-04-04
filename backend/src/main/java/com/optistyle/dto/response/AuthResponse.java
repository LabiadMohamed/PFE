package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Integer id_utilisateur;
    private String nom;
    private String prenom;
    private String email;
    private String role;
}
