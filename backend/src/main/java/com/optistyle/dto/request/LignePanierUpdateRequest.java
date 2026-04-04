package com.optistyle.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LignePanierUpdateRequest {
    @NotNull(message = "La ligne de panier est requise")
    private Integer id_ligne;

    @NotNull(message = "La quantité est requise")
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private Integer quantite;
}
