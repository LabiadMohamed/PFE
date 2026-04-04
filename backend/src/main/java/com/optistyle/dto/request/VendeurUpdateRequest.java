package com.optistyle.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VendeurUpdateRequest {
    @NotBlank(message = "Le nom de la boutique est requis")
    private String nom_boutique;

    private String description;

    @NotBlank(message = "Le téléphone est requis")
    private String telephone;
}
