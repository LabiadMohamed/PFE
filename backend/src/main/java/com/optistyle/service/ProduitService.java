package com.optistyle.service;

import com.optistyle.dto.request.ProduitCreateRequest;
import com.optistyle.dto.request.ProduitUpdateRequest;
import com.optistyle.dto.response.CategorieResponse;
import com.optistyle.dto.response.ProduitResponse;
import com.optistyle.dto.response.StockResponse;
import com.optistyle.entity.Categorie;
import com.optistyle.entity.Produit;
import com.optistyle.entity.Utilisateur;
import com.optistyle.entity.Vendeur;
import org.springframework.security.access.AccessDeniedException;import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.CategorieRepository;
import com.optistyle.repository.ProduitRepository;
import com.optistyle.repository.UtilisateurRepository;
import com.optistyle.repository.VendeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final CategorieRepository categorieRepository;
    private final VendeurRepository vendeurRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final JdbcTemplate jdbcTemplate;

    public Page<ProduitResponse> getAllProduits(Produit.Genre genre, Integer idCategorie, String marque,
            BigDecimal minPrix, BigDecimal maxPrix, String keyword, Pageable pageable) {
        Page<Produit> page = produitRepository.findFilteredAndPaginated(
                genre, idCategorie, marque, minPrix, maxPrix, keyword, pageable);

        return new PageImpl<>(
                page.getContent().stream().map(this::mapToResponse).collect(Collectors.toList()),
                pageable,
                page.getTotalElements()
        );
    }

    public ProduitResponse getProduitById(Integer id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));
        return mapToResponse(produit);
    }

    @Transactional
    public ProduitResponse createProduit(ProduitCreateRequest request) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();
        
        Vendeur vendeur = vendeurRepository.findAll().stream()
                .filter(v -> v.getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur profile required"));

        Categorie categorie = categorieRepository.findById(request.getId_categorie())
                .orElseThrow(() -> new ResourceNotFoundException("Categorie non trouvée"));

        Produit produit = Produit.builder()
                .nom(request.getNom())
                .prix(request.getPrix())
                .marque(request.getMarque())
                .genre(request.getGenre())
                .image_url(request.getImage_url())
                .categorie(categorie)
                .vendeur(vendeur)
                .colors(request.getColors())
                .images(request.getImages())
                .forme(request.getForme())
                .materiau(request.getMateriau())
                .badge(request.getBadge())
                .stocks(new ArrayList<>())
                .build();

        return mapToResponse(produitRepository.save(produit));
    }

    @Transactional
    public ProduitResponse updateProduit(Integer id, ProduitUpdateRequest request) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));
                
        checkOwnershipOrAdmin(produit);

        Categorie categorie = categorieRepository.findById(request.getId_categorie())
                .orElseThrow(() -> new ResourceNotFoundException("Categorie non trouvée"));

        produit.setNom(request.getNom());
        produit.setPrix(request.getPrix());
        produit.setMarque(request.getMarque());
        produit.setGenre(request.getGenre());
        produit.setImage_url(request.getImage_url());
        produit.setCategorie(categorie);
        produit.setColors(request.getColors());
        produit.setImages(request.getImages());
        produit.setForme(request.getForme());
        produit.setMateriau(request.getMateriau());
        produit.setBadge(request.getBadge());

        return mapToResponse(produitRepository.save(produit));
    }

    @Transactional
    public void deleteProduit(Integer id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));
                
        checkOwnershipOrAdmin(produit);

        // Manually delete foreign key dependencies (shopping carts and past order connections)
        jdbcTemplate.update("DELETE FROM ligne_paniers WHERE id_produit = ?", id);
        jdbcTemplate.update("DELETE FROM ligne_commandes WHERE id_produit = ?", id);

        produitRepository.delete(produit);
    }

    private void checkOwnershipOrAdmin(Produit produit) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();
        
        if (user.getRole() == Utilisateur.Role.ADMIN) {
            return; // Admin can edit any product
        }
        
        if (!produit.getVendeur().getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas le propriétaire de ce produit");
        }
    }

    public ProduitResponse mapToResponse(Produit produit) {
        CategorieResponse catRes = CategorieResponse.builder()
                .id_categorie(produit.getCategorie().getId_categorie())
                .type(produit.getCategorie().getType())
                .description(produit.getCategorie().getDescription())
                .build();


        return ProduitResponse.builder()
                .id_produit(produit.getId_produit())
                .nom(produit.getNom())
                .prix(produit.getPrix())
                .marque(produit.getMarque())
                .genre(produit.getGenre())
                .image_url(produit.getImage_url())
                .colors(produit.getColors())       // ✅ new
                .images(produit.getImages())       // ✅ new
                .forme(produit.getForme())         // ✅ new
                .materiau(produit.getMateriau())   // ✅ new
                .badge(produit.getBadge())
                .categorie(catRes)
                .id_vendeur(produit.getVendeur().getId_vendeur())
                .nom_boutique(produit.getVendeur().getNom_boutique())
                .stocks(produit.getStocks() != null ? produit.getStocks().stream().map(s -> 
                    StockResponse.builder()
                        .id_stock(s.getId_stock())
                        .couleur(s.getCouleur())
                        .taille(s.getTaille())
                        .quantite(s.getQuantite())
                        .build()
                ).collect(Collectors.toList()) : new ArrayList<>())
                .build();
    }
}
