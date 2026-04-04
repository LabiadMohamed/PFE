package com.optistyle.dto.response;

import com.optistyle.entity.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UtilisateurResponse {
    private Integer id_utilisateur;
    private String nom;
    private String prenom;
    private String email;
    private Utilisateur.Role role;
    private LocalDate date_inscription;
}
