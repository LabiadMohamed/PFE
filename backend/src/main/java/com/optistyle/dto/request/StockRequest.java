package com.optistyle.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StockRequest {
    @NotNull(message = "Le produit est requis")
    private Integer id_produit;

    @NotBlank(message = "La couleur est requise")
    private String couleur;

    @NotBlank(message = "La taille est requise")
    private String taille;

    @NotNull(message = "La quantité est requise")
    @Min(value = 0, message = "La quantité ne peut pas être négative")
    private Integer quantite;
}
