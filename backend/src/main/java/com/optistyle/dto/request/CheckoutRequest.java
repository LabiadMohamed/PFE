package com.optistyle.dto.request;

import com.optistyle.entity.Paiement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CheckoutRequest {
    @NotBlank(message = "L'adresse de livraison est requise")
    private String adresse_livraison;

    @NotNull(message = "La méthode de paiement est requise")
    private Paiement.MethodePaiement methode_paiement;
}
