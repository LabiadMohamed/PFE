package com.optistyle.dto.response;

import com.optistyle.entity.Paiement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaiementResponse {
    private Integer id_paiement;
    private LocalDate date_paiement;
    private BigDecimal montant;
    private Paiement.MethodePaiement methode;
    private Paiement.StatutPaiement statut;
}
