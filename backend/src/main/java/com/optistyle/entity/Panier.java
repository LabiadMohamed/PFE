package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "paniers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_panier;

    @OneToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private LocalDate date_creation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutPanier statut;

    @OneToMany(mappedBy = "panier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LignePanier> lignes;

    @PrePersist
    protected void onCreate() {
        this.date_creation = LocalDate.now();
    }

    public enum StatutPanier {
        ACTIF, VALIDE
    }
}
