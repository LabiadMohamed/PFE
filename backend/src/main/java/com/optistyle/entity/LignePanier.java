package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "ligne_paniers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LignePanier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_ligne;

    @ManyToOne
    @JoinColumn(name = "id_panier", nullable = false)
    private Panier panier;

    @ManyToOne
    @JoinColumn(name = "id_produit", nullable = false)
    private Produit produit;

    @Column(nullable = false)
    private Integer quantite;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal prix_unitaire;
}
