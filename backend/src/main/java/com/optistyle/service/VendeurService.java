package com.optistyle.service;

import com.optistyle.dto.request.VendeurUpdateRequest;
import com.optistyle.dto.response.ProduitResponse;
import com.optistyle.dto.response.UtilisateurResponse;
import com.optistyle.dto.response.VendeurResponse;
import com.optistyle.entity.Utilisateur;
import com.optistyle.entity.Vendeur;
import org.springframework.security.access.AccessDeniedException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.LigneCommandeRepository;
import com.optistyle.repository.ProduitRepository;
import com.optistyle.repository.UtilisateurRepository;
import com.optistyle.repository.VendeurRepository;
import com.optistyle.dto.response.VenteResponse;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendeurService {

    private final VendeurRepository vendeurRepository;
    private final ProduitRepository produitRepository;
    private final ProduitService produitService;
    private final UtilisateurRepository utilisateurRepository;
    private final LigneCommandeRepository ligneCommandeRepository;

    public List<VendeurResponse> getAllVendeurs() {
        return vendeurRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public VendeurResponse getVendeurById(Integer id) {
        Vendeur vendeur = vendeurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur non trouvé"));
        return mapToResponse(vendeur);
    }

    public VendeurResponse updateVendeur(Integer id, VendeurUpdateRequest request) {
        Vendeur vendeur = vendeurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendeur non trouvé"));

        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();

        if (!vendeur.getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à modifier ce profil");
        }

        vendeur.setNom_boutique(request.getNom_boutique());
        vendeur.setDescription(request.getDescription());
        vendeur.setTelephone(request.getTelephone());

        return mapToResponse(vendeurRepository.save(vendeur));
    }

    public List<ProduitResponse> getVendeurProduits(Integer id) {
        return produitRepository.findByVendeurId(id).stream()
                .map(produitService::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<VenteResponse> getVentes(Integer id) {
        return ligneCommandeRepository.findByVendeurId(id).stream()
            .map(l -> VenteResponse.builder()
                .id_ligne_cmd(l.getId_ligne_cmd())
                .id_commande(l.getCommande().getId_commande())
                .nom_produit(l.getProduit().getNom())
                .date_commande(l.getCommande().getDate_commande ())
                .sous_total(l.getPrix_unitaire().multiply(BigDecimal.valueOf(l.getQuantite())))
                .statut(l.getCommande().getStatut())
                .build())
            .collect(Collectors.toList());
    }

    private VendeurResponse mapToResponse(Vendeur vendeur) {
        UtilisateurResponse userRes = UtilisateurResponse.builder()
                .id_utilisateur(vendeur.getUtilisateur().getId_utilisateur())
                .nom(vendeur.getUtilisateur().getNom())
                .prenom(vendeur.getUtilisateur().getPrenom())
                .email(vendeur.getUtilisateur().getEmail())
                .role(vendeur.getUtilisateur().getRole())
                .date_inscription(vendeur.getUtilisateur().getDate_inscription())
                .build();

        return VendeurResponse.builder()
                .id_vendeur(vendeur.getId_vendeur())
                .nom_boutique(vendeur.getNom_boutique())
                .description(vendeur.getDescription())
                .telephone(vendeur.getTelephone())
                .note_moyenne(vendeur.getNote_moyenne())
                .utilisateur(userRes)
                .build();
    }
}