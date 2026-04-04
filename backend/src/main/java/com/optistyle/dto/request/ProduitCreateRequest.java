package com.optistyle.dto.request;

import com.optistyle.entity.Produit;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProduitCreateRequest {
    @NotNull(message = "La catégorie est requise")
    private Integer id_categorie;

    @NotBlank(message = "Le nom du produit est requis")
    private String nom;

    @NotNull(message = "Le prix est requis")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le prix doit être supérieur à zéro")
    private BigDecimal prix;

    @NotBlank(message = "La marque est requise")
    private String marque;

    @NotNull(message = "Le genre est requis")
    private Produit.Genre genre;

    private String image_url;
}
