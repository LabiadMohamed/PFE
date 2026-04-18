package com.optistyle.dto.response;

import com.optistyle.entity.Produit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProduitResponse {
    private Integer id_produit;
    private String nom;
    private BigDecimal prix;
    private String marque;
    private Produit.Genre genre;
    private String image_url;
    private String colors;
    private String images;
    private String forme;
    private String materiau;
    private String badge;
    private CategorieResponse categorie;
    
    // We only include Vendeur basic info without full user details to avoid deep nesting
    private Integer id_vendeur;
    private String nom_boutique;
    
    private List<StockResponse> stocks;
}
