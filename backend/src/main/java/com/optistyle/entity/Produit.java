package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "produits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_produit;

    @ManyToOne
    @JoinColumn(name = "id_vendeur", nullable = false)
    private Vendeur vendeur;

    @ManyToOne
    @JoinColumn(name = "id_categorie", nullable = false)
    private Categorie categorie;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prix;

    @Column(nullable = false)
    private String marque;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;

    @Column
    private String image_url;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    private List<Stock> stocks;

    public enum Genre {
        HOMME, FEMME, ENFANT
    }
}
