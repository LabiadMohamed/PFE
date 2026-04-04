package com.optistyle.repository;

import com.optistyle.entity.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Integer> {

    @Query("SELECT p FROM Panier p WHERE p.utilisateur.id_utilisateur = :idUtilisateur AND p.statut = :statut")
    Optional<Panier> findByUtilisateurIdAndStatut(@Param("idUtilisateur") Integer idUtilisateur, @Param("statut") Panier.StatutPanier statut);
}