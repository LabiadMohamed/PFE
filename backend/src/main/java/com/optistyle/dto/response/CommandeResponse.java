package com.optistyle.dto.response;

import com.optistyle.entity.Commande;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommandeResponse {
    private Integer id_commande;
    private LocalDate date_commande;
    private BigDecimal montant_total;
    private Commande.StatutCommande statut;
    private String adresse_livraison;
    private LocalDate date_modification;
    private List<LigneCommandeResponse> lignes;
    private PaiementResponse paiement;
}
