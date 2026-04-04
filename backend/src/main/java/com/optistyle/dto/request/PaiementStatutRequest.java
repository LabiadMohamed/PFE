package com.optistyle.dto.request;

import com.optistyle.entity.Paiement;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaiementStatutRequest {
    @NotNull(message = "Le statut est requis")
    private Paiement.StatutPaiement statut;
}
