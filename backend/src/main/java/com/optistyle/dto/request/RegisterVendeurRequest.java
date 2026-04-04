package com.optistyle.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterVendeurRequest {
    @NotBlank(message = "Le nom est requis")
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    private String prenom;

    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est requis")
    private String mot_de_passe;

    @NotBlank(message = "Le nom de la boutique est requis")
    private String nom_boutique;

    private String description;

    @NotBlank(message = "Le téléphone est requis")
    private String telephone;
}
