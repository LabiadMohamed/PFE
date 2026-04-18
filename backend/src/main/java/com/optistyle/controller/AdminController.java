package com.optistyle.controller;

import com.optistyle.dto.request.UtilisateurUpdateRequest;
import com.optistyle.dto.request.VendeurUpdateRequest;
import com.optistyle.dto.response.*;
import com.optistyle.entity.Utilisateur;
import com.optistyle.entity.Vendeur;
import com.optistyle.exception.BadRequestException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.CommandeRepository;
import com.optistyle.repository.VendeurRepository;
import com.optistyle.service.AdminService;
import com.optistyle.service.CommandeService;
import com.optistyle.service.ProduitService;
import com.optistyle.service.VendeurService;
import jakarta.validation.Valid;
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
    private final VendeurService vendeurService;
    private final VendeurRepository vendeurRepository;
    private final CommandeRepository commandeRepository;

    // ======================= DASHBOARD =======================

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    // ======================= UTILISATEURS =======================

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurResponse>> getAllUtilisateurs() {
        return ResponseEntity.ok(adminService.getAllUtilisateurs());
    }

    @PutMapping("/utilisateurs/{id}")
    public ResponseEntity<UtilisateurResponse> updateUtilisateur(
            @PathVariable Integer id,
            @Valid @RequestBody UtilisateurUpdateRequest request) {
        return ResponseEntity.ok(adminService.updateUtilisateur(id, request));
    }

    @PutMapping("/utilisateurs/{id}/role")
    public ResponseEntity<UtilisateurResponse> changeUserRole(
            @PathVariable Integer id,
            @RequestParam Utilisateur.Role role) {
        return ResponseEntity.ok(adminService.changeUserRole(id, role));
    }

    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id) {
        adminService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }

    // ======================= VENDEURS =======================

    @GetMapping("/vendeurs")
    public ResponseEntity<List<VendeurResponse>> getAllVendeurs() {
        return ResponseEntity.ok(vendeurService.getAllVendeurs());
    }

    @PutMapping("/vendeurs/{id}")
    public ResponseEntity<VendeurResponse> updateVendeur(
            @PathVariable Integer id,
            @Valid @RequestBody VendeurUpdateRequest request) {
        Vendeur vendeur = vendeurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur non trouvé"));

        vendeur.setNom_boutique(request.getNom_boutique());
        vendeur.setDescription(request.getDescription());
        vendeur.setTelephone(request.getTelephone());

        Vendeur saved = vendeurRepository.save(vendeur);

        // Build response manually to avoid lazy-loading issues
        UtilisateurResponse userRes = UtilisateurResponse.builder()
                .id_utilisateur(saved.getUtilisateur().getId_utilisateur())
                .nom(saved.getUtilisateur().getNom())
                .prenom(saved.getUtilisateur().getPrenom())
                .email(saved.getUtilisateur().getEmail())
                .role(saved.getUtilisateur().getRole())
                .date_inscription(saved.getUtilisateur().getDate_inscription())
                .build();

        return ResponseEntity.ok(VendeurResponse.builder()
                .id_vendeur(saved.getId_vendeur())
                .nom_boutique(saved.getNom_boutique())
                .description(saved.getDescription())
                .telephone(saved.getTelephone())
                .note_moyenne(saved.getNote_moyenne())
                .utilisateur(userRes)
                .build());
    }

    @DeleteMapping("/vendeurs/{id}")
    public ResponseEntity<Void> deleteVendeur(@PathVariable Integer id) {
        if (!vendeurRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vendeur non trouvé");
        }
        try {
            vendeurRepository.deleteById(id);
        } catch (Exception e) {
            throw new BadRequestException("Impossible de supprimer ce vendeur (il a des produits associés)");
        }
        return ResponseEntity.noContent().build();
    }

    // ======================= COMMANDES =======================

    @GetMapping("/commandes")
    public ResponseEntity<List<CommandeResponse>> getAllCommandes() {
        return ResponseEntity.ok(commandeService.getAllCommandes());
    }

    @DeleteMapping("/commandes/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Integer id) {
        if (!commandeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Commande non trouvée");
        }
        try {
            commandeRepository.deleteById(id);
        } catch (Exception e) {
            throw new BadRequestException("Impossible de supprimer cette commande");
        }
        return ResponseEntity.noContent().build();
    }

    // ======================= PRODUITS =======================

    @GetMapping("/produits")
    public ResponseEntity<Page<ProduitResponse>> getAllProduits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {
        return ResponseEntity.ok(produitService.getAllProduits(
                null, null, null, null, null, null, PageRequest.of(page, size)));
    }
}
