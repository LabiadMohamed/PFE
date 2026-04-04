package com.optistyle.controller;

import com.optistyle.dto.request.LignePanierRequest;
import com.optistyle.dto.request.LignePanierUpdateRequest;
import com.optistyle.dto.response.PanierResponse;
import com.optistyle.service.PanierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/panier")
@RequiredArgsConstructor
public class PanierController {

    private final PanierService panierService;

    @GetMapping
    public ResponseEntity<PanierResponse> getMyPanier() {
        return ResponseEntity.ok(panierService.getMyPanier());
    }

    @PostMapping("/ajouter")
    public ResponseEntity<PanierResponse> addLigne(@Valid @RequestBody LignePanierRequest request) {
        return ResponseEntity.ok(panierService.addLigne(request));
    }

    @PutMapping("/modifier")
    public ResponseEntity<PanierResponse> updateLigne(@Valid @RequestBody LignePanierUpdateRequest request) {
        return ResponseEntity.ok(panierService.updateLigne(request));
    }

    @DeleteMapping("/supprimer/{id_ligne}")
    public ResponseEntity<PanierResponse> removeLigne(@PathVariable Integer id_ligne) {
        return ResponseEntity.ok(panierService.removeLigne(id_ligne));
    }

    @DeleteMapping("/vider")
    public ResponseEntity<PanierResponse> clearPanier() {
        return ResponseEntity.ok(panierService.clearPanier());
    }
}
