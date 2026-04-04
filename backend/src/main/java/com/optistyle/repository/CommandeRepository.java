package com.optistyle.repository;

import com.optistyle.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer> {

    @Query("SELECT c FROM Commande c WHERE c.utilisateur.id_utilisateur = :idUtilisateur")
    List<Commande> findByUtilisateurId(@Param("idUtilisateur") Integer idUtilisateur);
}