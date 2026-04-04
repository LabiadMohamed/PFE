package com.optistyle.service;

import com.optistyle.dto.request.PaiementStatutRequest;
import com.optistyle.dto.response.PaiementResponse;
import com.optistyle.entity.Paiement;
import com.optistyle.entity.Utilisateur;
import org.springframework.security.access.AccessDeniedException;import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.PaiementRepository;
import com.optistyle.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PaiementService {

    private final PaiementRepository paiementRepository;
    private final UtilisateurRepository utilisateurRepository;

    public PaiementResponse getPaiementById(Integer id) {
        Paiement paiement = paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé"));
                
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();
        
        if (user.getRole() == Utilisateur.Role.ACHETEUR && !paiement.getCommande().getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à voir ce paiement");
        }
        
        return mapToResponse(paiement);
    }

    public PaiementResponse updateStatut(Integer id, PaiementStatutRequest request) {
        Paiement paiement = paiementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paiement non trouvé"));
                
        paiement.setStatut(request.getStatut());
        if (request.getStatut() == Paiement.StatutPaiement.REUSSI) {
            paiement.setDate_paiement(LocalDate.now());
        }
        
        return mapToResponse(paiementRepository.save(paiement));
    }

    private PaiementResponse mapToResponse(Paiement paiement) {
        return PaiementResponse.builder()
                .id_paiement(paiement.getId_paiement())
                .date_paiement(paiement.getDate_paiement())
                .montant(paiement.getMontant())
                .methode(paiement.getMethode())
                .statut(paiement.getStatut())
                .build();
    }
}
