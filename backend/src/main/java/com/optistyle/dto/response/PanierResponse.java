package com.optistyle.dto.response;

import com.optistyle.entity.Panier;
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
public class PanierResponse {
    private Integer id_panier;
    private LocalDate date_creation;
    private Panier.StatutPanier statut;
    private List<LignePanierResponse> lignes;
    private BigDecimal total;
}
