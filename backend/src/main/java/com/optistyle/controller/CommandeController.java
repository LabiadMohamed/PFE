package com.optistyle.controller;

import com.optistyle.dto.request.CheckoutRequest;
import com.optistyle.dto.request.CommandeStatutRequest;
import com.optistyle.dto.response.CommandeResponse;
import com.optistyle.service.CommandeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
@RequiredArgsConstructor
public class CommandeController {

    private final CommandeService commandeService;

    @PostMapping("/checkout")
    public ResponseEntity<CommandeResponse> checkout(@Valid @RequestBody CheckoutRequest request) {
        return new ResponseEntity<>(commandeService.checkout(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CommandeResponse>> getCommandes() {
        // Will be restricted internally or contextually
        return ResponseEntity.ok(commandeService.getMyCommandes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeResponse> getCommande(@PathVariable Integer id) {
        return ResponseEntity.ok(commandeService.getCommandeById(id));
    }

    @PutMapping("/{id}/statut")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDEUR')")
    public ResponseEntity<CommandeResponse> updateStatut(@PathVariable Integer id, @Valid @RequestBody CommandeStatutRequest request) {
        return ResponseEntity.ok(commandeService.updateStatut(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelCommande(@PathVariable Integer id) {
        commandeService.cancelMyCommande(id);
        return ResponseEntity.noContent().build();
    }
}
