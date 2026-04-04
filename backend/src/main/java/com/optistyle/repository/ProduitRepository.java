package com.optistyle.repository;

import com.optistyle.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Integer> {

    List<Produit> findByGenre(Produit.Genre genre);

    @Query("SELECT p FROM Produit p WHERE p.categorie.id_categorie = :idCategorie")
    List<Produit> findByCategorieId(@Param("idCategorie") Integer idCategorie);

    @Query("SELECT p FROM Produit p WHERE p.vendeur.id_vendeur = :idVendeur")
    List<Produit> findByVendeurId(@Param("idVendeur") Integer idVendeur);

    @Query("SELECT p FROM Produit p WHERE " +
            "(:#{#genre} IS NULL OR p.genre = :#{#genre}) AND " +
            "(:idCategorie IS NULL OR p.categorie.id_categorie = :idCategorie) AND " +
            "(:marque IS NULL OR LOWER(p.marque) LIKE LOWER(CONCAT('%', :marque, '%'))) AND " +
            "(:minPrix IS NULL OR p.prix >= :minPrix) AND " +
            "(:maxPrix IS NULL OR p.prix <= :maxPrix) AND " +
            "(:keyword IS NULL OR LOWER(p.nom) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Produit> findFilteredAndPaginated(
            @Param("genre") Produit.Genre genre,
            @Param("idCategorie") Integer idCategorie,
            @Param("marque") String marque,
            @Param("minPrix") BigDecimal minPrix,
            @Param("maxPrix") BigDecimal maxPrix,
            @Param("keyword") String keyword,
            Pageable pageable);
}