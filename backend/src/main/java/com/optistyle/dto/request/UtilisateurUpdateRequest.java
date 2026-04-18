package com.optistyle.dto.request;

import com.optistyle.entity.Utilisateur;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UtilisateurUpdateRequest {
    @NotBlank(message = "Le nom est requis")
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    private String prenom;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est requis")
    private String email;

    @NotNull(message = "Le rôle est requis")
    private Utilisateur.Role role;
}
