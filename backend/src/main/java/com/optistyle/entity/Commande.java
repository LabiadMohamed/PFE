package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "commandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_commande;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", nullable = false)
    private Utilisateur utilisateur;

    @Column(nullable = false)
    private LocalDate date_commande;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal montant_total;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCommande statut;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String adresse_livraison;

    @Column
    private LocalDate date_modification;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneCommande> lignes;

    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    private Paiement paiement;

    @PrePersist
    protected void onCreate() {
        this.date_commande = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.date_modification = LocalDate.now();
    }

    public enum StatutCommande {
        EN_ATTENTE, CONFIRMEE, EXPEDIEE, LIVREE, ANNULEE
    }
}
