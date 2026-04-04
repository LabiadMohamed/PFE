package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminResponse {
    private Integer id_admin;
    private String niveau_acces;
    private LocalDateTime derniere_connexion;
    private Boolean peut_gerer_users;
    private UtilisateurResponse utilisateur;
}
