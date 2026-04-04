package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_categorie;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeCategorie type;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL)
    private List<Produit> produits;

    public enum TypeCategorie {
        VUE, SOLEIL, LUXE
    }
}
