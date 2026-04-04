package com.optistyle.service;

import com.optistyle.dto.request.LignePanierRequest;
import com.optistyle.dto.request.LignePanierUpdateRequest;
import com.optistyle.dto.response.LignePanierResponse;
import com.optistyle.dto.response.PanierResponse;
import com.optistyle.entity.LignePanier;
import com.optistyle.entity.Panier;
import com.optistyle.entity.Produit;
import com.optistyle.entity.Utilisateur;
import org.springframework.security.access.AccessDeniedException;import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.LignePanierRepository;
import com.optistyle.repository.PanierRepository;
import com.optistyle.repository.ProduitRepository;
import com.optistyle.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PanierService {

    private final PanierRepository panierRepository;
    private final LignePanierRepository lignePanierRepository;
    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final ProduitService produitService;

    public PanierResponse getMyPanier() {
        Panier panier = getCurrentActivePanier();
        return mapToResponse(panier);
    }

    @Transactional
    public PanierResponse addLigne(LignePanierRequest request) {
        Panier panier = getCurrentActivePanier();
        Produit produit = produitRepository.findById(request.getId_produit())
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));

        // Check if product already exists in cart, if yes, update quantity
        Optional<LignePanier> existingLigne = panier.getLignes().stream()
                .filter(ligne -> ligne.getProduit().getId_produit().equals(produit.getId_produit()))
                .findFirst();

        if (existingLigne.isPresent()) {
            LignePanier ligne = existingLigne.get();
            ligne.setQuantite(ligne.getQuantite() + request.getQuantite());
            lignePanierRepository.save(ligne);
        } else {
            LignePanier ligne = LignePanier.builder()
                    .panier(panier)
                    .produit(produit)
                    .quantite(request.getQuantite())
                    .prix_unitaire(request.getPrix_unitaire() != null ? request.getPrix_unitaire() : produit.getPrix())
                    .build();
            lignePanierRepository.save(ligne);
            panier.getLignes().add(ligne);
        }

        return mapToResponse(panierRepository.findById(panier.getId_panier()).get());
    }

    @Transactional
    public PanierResponse updateLigne(LignePanierUpdateRequest request) {
        Panier panier = getCurrentActivePanier();
        
        LignePanier ligne = lignePanierRepository.findById(request.getId_ligne())
                .orElseThrow(() -> new ResourceNotFoundException("Ligne de panier non trouvée"));
                
        if (!ligne.getPanier().getId_panier().equals(panier.getId_panier())) {
            throw new AccessDeniedException("Cette ligne n'appartient pas à votre panier");
        }

        ligne.setQuantite(request.getQuantite());
        lignePanierRepository.save(ligne);

        return mapToResponse(panierRepository.findById(panier.getId_panier()).get());
    }

    @Transactional
    public PanierResponse removeLigne(Integer idLigne) {
        Panier panier = getCurrentActivePanier();
        
        LignePanier ligne = lignePanierRepository.findById(idLigne)
                .orElseThrow(() -> new ResourceNotFoundException("Ligne de panier non trouvée"));
                
        if (!ligne.getPanier().getId_panier().equals(panier.getId_panier())) {
            throw new AccessDeniedException("Cette ligne n'appartient pas à votre panier");
        }

        panier.getLignes().remove(ligne);
        lignePanierRepository.delete(ligne);

        return mapToResponse(panier);
    }

    @Transactional
    public PanierResponse clearPanier() {
        Panier panier = getCurrentActivePanier();
        lignePanierRepository.deleteAll(panier.getLignes());
        panier.getLignes().clear();
        return mapToResponse(panier);
    }

    public Panier getCurrentActivePanier() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();
        
        return panierRepository.findByUtilisateurIdAndStatut(user.getId_utilisateur(), Panier.StatutPanier.ACTIF)
                .orElseGet(() -> {
                    Panier newPanier = Panier.builder()
                            .utilisateur(user)
                            .statut(Panier.StatutPanier.ACTIF)
                            .lignes(new ArrayList<>())
                            .build();
                    return panierRepository.save(newPanier);
                });
    }

    public PanierResponse mapToResponse(Panier panier) {
        BigDecimal total = BigDecimal.ZERO;
        
        if (panier.getLignes() != null && !panier.getLignes().isEmpty()) {
            total = panier.getLignes().stream()
                    .map(ligne -> ligne.getPrix_unitaire().multiply(BigDecimal.valueOf(ligne.getQuantite())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }

        return PanierResponse.builder()
                .id_panier(panier.getId_panier())
                .date_creation(panier.getDate_creation())
                .statut(panier.getStatut())
                .total(total)
                .lignes(panier.getLignes() != null ? panier.getLignes().stream().map(ligne -> {
                    BigDecimal sousTotal = ligne.getPrix_unitaire().multiply(BigDecimal.valueOf(ligne.getQuantite()));
                    return LignePanierResponse.builder()
                            .id_ligne(ligne.getId_ligne())
                            .quantite(ligne.getQuantite())
                            .prix_unitaire(ligne.getPrix_unitaire())
                            .sous_total(sousTotal)
                            .produit(produitService.mapToResponse(ligne.getProduit()))
                            .build();
                }).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}
