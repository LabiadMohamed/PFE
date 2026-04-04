package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "vendeurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_vendeur;

    @OneToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private String nom_boutique;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String telephone;

    @Column(nullable = false)
    @Builder.Default
    private Float note_moyenne = 0.0f;

    @OneToMany(mappedBy = "vendeur", cascade = CascadeType.ALL)
    private List<Produit> produits;
}
