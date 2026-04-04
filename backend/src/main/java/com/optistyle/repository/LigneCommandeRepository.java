package com.optistyle.repository;

import com.optistyle.entity.LigneCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface LigneCommandeRepository extends JpaRepository<LigneCommande, Integer> {
    @Query("SELECT l FROM LigneCommande l WHERE l.produit.vendeur.id_vendeur = :vendeurId")
    List<LigneCommande> findByVendeurId(@Param("vendeurId") Integer vendeurId);
}
