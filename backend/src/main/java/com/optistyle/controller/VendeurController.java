package com.optistyle.controller;

import com.optistyle.dto.request.VendeurUpdateRequest;
import com.optistyle.dto.response.ProduitResponse;
import com.optistyle.dto.response.VendeurResponse;
import com.optistyle.dto.response.VenteResponse;
import com.optistyle.service.VendeurService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendeurs")
@RequiredArgsConstructor
public class VendeurController {

    private final VendeurService vendeurService;

    @GetMapping
    public ResponseEntity<List<VendeurResponse>> getAllVendeurs() {
        return ResponseEntity.ok(vendeurService.getAllVendeurs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendeurResponse> getVendeur(@PathVariable Integer id) {
        return ResponseEntity.ok(vendeurService.getVendeurById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VendeurResponse> updateVendeur(@PathVariable Integer id, @Valid @RequestBody VendeurUpdateRequest request) {
        return ResponseEntity.ok(vendeurService.updateVendeur(id, request));
    }

    @GetMapping("/{id}/produits")
    public ResponseEntity<List<ProduitResponse>> getVendeurProduits(@PathVariable Integer id) {
        return ResponseEntity.ok(vendeurService.getVendeurProduits(id));
    }

    @GetMapping("/{id}/ventes")
    public ResponseEntity<List<VenteResponse>> getVendeurVentes(@PathVariable Integer id) {
        return ResponseEntity.ok(vendeurService.getVentes(id));
    }
}
