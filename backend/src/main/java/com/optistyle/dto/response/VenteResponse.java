package com.optistyle.dto.response;

import com.optistyle.entity.Commande;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class VenteResponse {
    private Integer id_ligne_cmd;
    private Integer id_commande;
    private String nom_produit;
    private LocalDate date_commande;
    private BigDecimal sous_total;
    private Commande.StatutCommande statut;
}
