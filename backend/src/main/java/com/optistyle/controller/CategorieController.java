package com.optistyle.controller;

import com.optistyle.dto.response.CategorieResponse;
import com.optistyle.entity.Categorie;
import com.optistyle.service.CategorieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategorieController {

    private final CategorieService categorieService;

    @GetMapping
    public ResponseEntity<List<CategorieResponse>> getAllCategories() {
        return ResponseEntity.ok(categorieService.getAllCategories());
    }

    // Role ADMIN logic is covered in SecurityConfig, but we can also use @PreAuthorize
    @PostMapping
    public ResponseEntity<CategorieResponse> createCategorie(@Valid @RequestBody Categorie categorie) {
        return new ResponseEntity<>(categorieService.createCategorie(categorie), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieResponse> updateCategorie(@PathVariable Integer id, @Valid @RequestBody Categorie categorie) {
        return ResponseEntity.ok(categorieService.updateCategorie(id, categorie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Integer id) {
        categorieService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}
