package com.optistyle.repository;

import com.optistyle.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {

    @Query("SELECT s FROM Stock s WHERE s.produit.id_produit = :idProduit")
    List<Stock> findByProduitId(@Param("idProduit") Integer idProduit);
}