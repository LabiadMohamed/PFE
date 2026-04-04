package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LignePanierResponse {
    private Integer id_ligne;
    private ProduitResponse produit;
    private Integer quantite;
    private BigDecimal prix_unitaire;
    private BigDecimal sous_total;
}
