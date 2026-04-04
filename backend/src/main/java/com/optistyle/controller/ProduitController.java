package com.optistyle.controller;

import com.optistyle.dto.request.ProduitCreateRequest;
import com.optistyle.dto.request.ProduitUpdateRequest;
import com.optistyle.dto.response.ProduitResponse;
import com.optistyle.entity.Produit;
import com.optistyle.service.ProduitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping
    public ResponseEntity<Page<ProduitResponse>> getAllProduits(
            @RequestParam(required = false) Produit.Genre genre,
            @RequestParam(required = false) Integer idCategorie,
            @RequestParam(required = false) String marque,
            @RequestParam(required = false) BigDecimal minPrix,
            @RequestParam(required = false) BigDecimal maxPrix,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id_produit") String sort) {
                
        return ResponseEntity.ok(produitService.getAllProduits(
                genre, idCategorie, marque, minPrix, maxPrix, keyword, PageRequest.of(page, size, Sort.by(sort))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProduitResponse> getProduit(@PathVariable Integer id) {
        return ResponseEntity.ok(produitService.getProduitById(id));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<Page<ProduitResponse>> getProduitsByGenre(
            @PathVariable Produit.Genre genre,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(produitService.getAllProduits(
                genre, null, null, null, null, null, PageRequest.of(page, size)));
    }

    @GetMapping("/categorie/{id_categorie}")
    public ResponseEntity<Page<ProduitResponse>> getProduitsByCategorie(
            @PathVariable Integer id_categorie,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(produitService.getAllProduits(
                null, id_categorie, null, null, null, null, PageRequest.of(page, size)));
    }

    @PostMapping
    public ResponseEntity<ProduitResponse> createProduit(@Valid @RequestBody ProduitCreateRequest request) {
        return new ResponseEntity<>(produitService.createProduit(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProduitResponse> updateProduit(@PathVariable Integer id, @Valid @RequestBody ProduitUpdateRequest request) {
        return ResponseEntity.ok(produitService.updateProduit(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Integer id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
}
