package com.optistyle.service;

import com.optistyle.dto.request.CheckoutRequest;
import com.optistyle.dto.request.CommandeStatutRequest;
import com.optistyle.dto.response.CommandeResponse;
import com.optistyle.dto.response.LigneCommandeResponse;
import com.optistyle.dto.response.PaiementResponse;
import com.optistyle.entity.*;
import org.springframework.security.access.AccessDeniedException;
import com.optistyle.exception.BadRequestException;
import com.optistyle.exception.InsufficientStockException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final LigneCommandeRepository ligneCommandeRepository;
    private final PaiementRepository paiementRepository;
    private final PanierService panierService;
    private final PanierRepository panierRepository;
    private final StockRepository stockRepository;
    private final ProduitService produitService;
    private final UtilisateurRepository utilisateurRepository;

    @Transactional
    public CommandeResponse checkout(CheckoutRequest request) {
        Panier panier = panierService.getCurrentActivePanier();

        if (panier.getLignes() == null || panier.getLignes().isEmpty()) {
            throw new BadRequestException("Le panier est vide");
        }

        for (LignePanier ligne : panier.getLignes()) {
            Produit produit = ligne.getProduit();
            Integer totalStock = produit.getStocks().stream().mapToInt(Stock::getQuantite).sum();
            if (totalStock < ligne.getQuantite()) {
                throw new InsufficientStockException("Stock insuffisant pour: " + produit.getNom());
            }
        }

        BigDecimal montantTotal = panier.getLignes().stream()
                .map(ligne -> ligne.getPrix_unitaire().multiply(BigDecimal.valueOf(ligne.getQuantite())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Commande commande = Commande.builder()
                .utilisateur(panier.getUtilisateur())
                .montant_total(montantTotal)
                .statut(Commande.StatutCommande.EN_ATTENTE)
                .adresse_livraison(request.getAdresse_livraison())
                .lignes(new ArrayList<>())
                .build();

        Commande savedCommande = commandeRepository.save(commande);

        Paiement paiement = Paiement.builder()
                .commande(savedCommande)
                .montant(montantTotal)
                .methode(request.getMethode_paiement())
                .statut(Paiement.StatutPaiement.EN_ATTENTE)
                .build();
        paiementRepository.save(paiement);

        for (LignePanier lignePanier : panier.getLignes()) {
            LigneCommande ligneCmd = LigneCommande.builder()
                    .commande(savedCommande)
                    .produit(lignePanier.getProduit())
                    .quantite(lignePanier.getQuantite())
                    .prix_unitaire(lignePanier.getPrix_unitaire())
                    .build();
            ligneCommandeRepository.save(ligneCmd);
            savedCommande.getLignes().add(ligneCmd);

            deductStock(lignePanier.getProduit(), lignePanier.getQuantite());
        }

        panier.getLignes().clear();
        panierRepository.save(panier);

        return mapToResponse(commandeRepository.findById(savedCommande.getId_commande()).get());
    }

    private void deductStock(Produit produit, Integer qtyToDeduct) {
        int remainingToDeduct = qtyToDeduct;

        List<Stock> stocks = stockRepository.findByProduitId(produit.getId_produit());
        for (Stock stock : stocks) {
            if (remainingToDeduct <= 0) break;

            if (stock.getQuantite() > 0) {
                int deducted = Math.min(stock.getQuantite(), remainingToDeduct);
                stock.setQuantite(stock.getQuantite() - deducted);
                remainingToDeduct -= deducted;
                stockRepository.save(stock);
            }
        }
    }

    public List<CommandeResponse> getMyCommandes() {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();

        return commandeRepository.findByUtilisateurId(user.getId_utilisateur()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<CommandeResponse> getAllCommandes() {
        return commandeRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CommandeResponse getCommandeById(Integer id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));

        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();

        if (user.getRole() == Utilisateur.Role.ACHETEUR && !commande.getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à voir cette commande");
        }

        return mapToResponse(commande);
    }

    public CommandeResponse updateStatut(Integer id, CommandeStatutRequest request) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));

        commande.setStatut(request.getStatut());
        return mapToResponse(commandeRepository.save(commande));
    }

    public void cancelMyCommande(Integer id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));

        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();

        if (!commande.getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à annuler cette commande");
        }

        if (commande.getStatut() != Commande.StatutCommande.EN_ATTENTE) {
            throw new BadRequestException("Vous pouvez seulement annuler une commande en attente");
        }

        commande.setStatut(Commande.StatutCommande.ANNULEE);
        commandeRepository.save(commande);
    }

    public CommandeResponse mapToResponse(Commande commande) {
        PaiementResponse pRes = null;
        if (commande.getPaiement() != null) {
            pRes = PaiementResponse.builder()
                    .id_paiement(commande.getPaiement().getId_paiement())
                    .date_paiement(commande.getPaiement().getDate_paiement())
                    .montant(commande.getPaiement().getMontant())
                    .methode(commande.getPaiement().getMethode())
                    .statut(commande.getPaiement().getStatut())
                    .build();
        }

        return CommandeResponse.builder()
                .id_commande(commande.getId_commande())
                .date_commande(commande.getDate_commande())
                .montant_total(commande.getMontant_total())
                .statut(commande.getStatut())
                .adresse_livraison(commande.getAdresse_livraison())
                .date_modification(commande.getDate_modification())
                .paiement(pRes)
                .lignes(commande.getLignes() != null ? commande.getLignes().stream().map(ligne -> {
                    BigDecimal sousTotal = ligne.getPrix_unitaire().multiply(BigDecimal.valueOf(ligne.getQuantite()));
                    return LigneCommandeResponse.builder()
                            .id_ligne_cmd(ligne.getId_ligne_cmd())
                            .quantite(ligne.getQuantite())
                            .prix_unitaire(ligne.getPrix_unitaire())
                            .sous_total(sousTotal)
                            .produit(produitService.mapToResponse(ligne.getProduit()))
                            .build();
                }).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}