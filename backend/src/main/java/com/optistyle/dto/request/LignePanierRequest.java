package com.optistyle.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class LignePanierRequest {
    @NotNull(message = "Le produit est requis")
    private Integer id_produit;

    @NotNull(message = "La quantité est requise")
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private Integer quantite;

    @NotNull(message = "Le prix unitaire est requis")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix unitaire doit être supérieur à zéro")
    private BigDecimal prix_unitaire;
}
