package com.optistyle.service;

import com.optistyle.dto.response.AdminDashboardResponse;
import com.optistyle.dto.response.UtilisateurResponse;
import com.optistyle.entity.Commande;
import com.optistyle.entity.Paiement;
import com.optistyle.entity.Utilisateur;
import com.optistyle.exception.BadRequestException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.CommandeRepository;
import com.optistyle.repository.PaiementRepository;
import com.optistyle.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UtilisateurRepository utilisateurRepository;
    private final CommandeRepository commandeRepository;
    private final PaiementRepository paiementRepository;

    public AdminDashboardResponse getDashboard() {
        List<Utilisateur> users = utilisateurRepository.findAll();
        List<Commande> commandes = commandeRepository.findAll();
        List<Paiement> paiements = paiementRepository.findAll();

        long totalAcheteurs = users.stream().filter(u -> u.getRole() == Utilisateur.Role.ACHETEUR).count();
        long totalVendeurs = users.stream().filter(u -> u.getRole() == Utilisateur.Role.VENDEUR).count();

        BigDecimal totalRevenue = paiements.stream()
                .filter(p -> p.getStatut() == Paiement.StatutPaiement.REUSSI)
                .map(Paiement::getMontant)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> commandesParStatut = commandes.stream()
                .collect(Collectors.groupingBy(c -> c.getStatut().name(), Collectors.counting()));

        Map<String, Long> paiementsParStatut = paiements.stream()
                .collect(Collectors.groupingBy(p -> p.getStatut().name(), Collectors.counting()));

        return AdminDashboardResponse.builder()
                .totalCommandes((long) commandes.size())
                .totalAcheteurs(totalAcheteurs)
                .totalVendeurs(totalVendeurs)
                .totalRevenue(totalRevenue)
                .commandesParStatut(commandesParStatut)
                .paiementsParStatut(paiementsParStatut)
                .build();
    }

    public List<UtilisateurResponse> getAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(user -> UtilisateurResponse.builder()
                        .id_utilisateur(user.getId_utilisateur())
                        .nom(user.getNom())
                        .prenom(user.getPrenom())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .date_inscription(user.getDate_inscription())
                        .build())
                .collect(Collectors.toList());
    }

    public UtilisateurResponse changeUserRole(Integer id, Utilisateur.Role role) {
        Utilisateur user = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
                
        user.setRole(role);
        Utilisateur saved = utilisateurRepository.save(user);

        return UtilisateurResponse.builder()
                .id_utilisateur(saved.getId_utilisateur())
                .nom(saved.getNom())
                .prenom(saved.getPrenom())
                .email(saved.getEmail())
                .role(saved.getRole())
                .date_inscription(saved.getDate_inscription())
                .build();
    }

    public void deleteUtilisateur(Integer id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur non trouvé");
        }
        // In real app, we should handle cascading correctly depending on role
        // For standard requirement, we'll try to let standard relations cascade or fail if constrained
        try {
            utilisateurRepository.deleteById(id);
        } catch (Exception e) {
            throw new BadRequestException("Impossible de supprimer cet utilisateur (il a des commandes ou des produits)");
        }
    }
}
