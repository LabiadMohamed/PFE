package com.optistyle.controller;

import com.optistyle.dto.request.PaiementStatutRequest;
import com.optistyle.dto.response.PaiementResponse;
import com.optistyle.service.PaiementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiements")
@RequiredArgsConstructor
public class PaiementController {

    private final PaiementService paiementService;

    @GetMapping("/{id}")
    public ResponseEntity<PaiementResponse> getPaiement(@PathVariable Integer id) {
        return ResponseEntity.ok(paiementService.getPaiementById(id));
    }

    @PutMapping("/{id}/statut")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaiementResponse> updateStatut(@PathVariable Integer id, @Valid @RequestBody PaiementStatutRequest request) {
        return ResponseEntity.ok(paiementService.updateStatut(id, request));
    }
}
