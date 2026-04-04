package com.optistyle.dto.request;

import com.optistyle.entity.Commande;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommandeStatutRequest {
    @NotNull(message = "Le statut est requis")
    private Commande.StatutCommande statut;
}
