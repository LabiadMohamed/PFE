package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendeurResponse {
    private Integer id_vendeur;
    private String nom_boutique;
    private String description;
    private String telephone;
    private Float note_moyenne;
    private UtilisateurResponse utilisateur;
}
