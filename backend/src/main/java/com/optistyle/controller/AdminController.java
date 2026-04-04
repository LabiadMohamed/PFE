package com.optistyle.controller;

import com.optistyle.dto.response.AdminDashboardResponse;
import com.optistyle.dto.response.CommandeResponse;
import com.optistyle.dto.response.ProduitResponse;
import com.optistyle.dto.response.UtilisateurResponse;
import com.optistyle.entity.Utilisateur;
import com.optistyle.service.AdminService;
import com.optistyle.service.CommandeService;
import com.optistyle.service.ProduitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final CommandeService commandeService;
    private final ProduitService produitService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurResponse>> getAllUtilisateurs() {
        return ResponseEntity.ok(adminService.getAllUtilisateurs());
    }

    @PutMapping("/utilisateurs/{id}/role")
    public ResponseEntity<UtilisateurResponse> changeUserRole(@PathVariable Integer id, @RequestParam Utilisateur.Role role) {
        return ResponseEntity.ok(adminService.changeUserRole(id, role));
    }

    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id) {
        adminService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/commandes")
    public ResponseEntity<List<CommandeResponse>> getAllCommandes() {
        return ResponseEntity.ok(commandeService.getAllCommandes());
    }

    // Commande statut update is available through CommandeController as hasAnyRole("ADMIN", "VENDEUR")

    @GetMapping("/produits")
    public ResponseEntity<Page<ProduitResponse>> getAllProduits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        // Just return paginated all products
        return ResponseEntity.ok(produitService.getAllProduits(
                null, null, null, null, null, null, PageRequest.of(page, size)));
    }
}
