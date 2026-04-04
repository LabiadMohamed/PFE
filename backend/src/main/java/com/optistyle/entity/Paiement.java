package com.optistyle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "paiements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_paiement;

    @OneToOne
    @JoinColumn(name = "id_commande", nullable = false)
    private Commande commande;

    @Column
    private LocalDate date_paiement;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MethodePaiement methode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutPaiement statut;

    public enum MethodePaiement {
        CARTE, VIREMENT, PAYPAL
    }

    public enum StatutPaiement {
        EN_ATTENTE, REUSSI, ECHOUE, REMBOURSE
    }
}
