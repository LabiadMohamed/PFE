package com.optistyle;

import com.optistyle.entity.*;
import com.optistyle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final AdminRepository adminRepository;
    private final VendeurRepository vendeurRepository;
    private final PanierRepository panierRepository;
    private final CategorieRepository categorieRepository;
    private final ProduitRepository produitRepository;
    private final StockRepository stockRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (utilisateurRepository.count() > 0) {
            System.out.println("Data already initialized. Skipping seed.");
            return;
        }

        System.out.println("Seeding OptiStyle Database...");

        // 1. Create Admin
        Utilisateur adminUser = createUtilisateur("admin@optistyle.com", "Admin123!", "Admin", "Super", Utilisateur.Role.ADMIN);
        Admin adminParams = Admin.builder()
                .utilisateur(adminUser)
                .niveau_acces("SUPER")
                .peut_gerer_users(true)
                .build();
        adminRepository.save(adminParams);

        // 2. Create Vendeurs
        Utilisateur vend1User = createUtilisateur("vendor1@optistyle.com", "Vendor123!", "Pro", "Vision", Utilisateur.Role.VENDEUR);
        Vendeur vend1 = Vendeur.builder()
                .utilisateur(vend1User)
                .nom_boutique("VisionPro")
                .description("Expert en lunettes de vue")
                .telephone("0600000001")
                .note_moyenne(4.8f)
                .build();
        vendeurRepository.save(vend1);

        Utilisateur vend2User = createUtilisateur("vendor2@optistyle.com", "Vendor123!", "Optic", "Lux", Utilisateur.Role.VENDEUR);
        Vendeur vend2 = Vendeur.builder()
                .utilisateur(vend2User)
                .nom_boutique("LuxOptic")
                .description("Le luxe à vos yeux")
                .telephone("0600000002")
                .note_moyenne(4.9f)
                .build();
        vendeurRepository.save(vend2);

        // 3. Create Acheteurs and Panier
        Utilisateur ach1User = createUtilisateur("acheteur1@optistyle.com", "Client123!", "Acheteur", "Un", Utilisateur.Role.ACHETEUR);
        panierRepository.save(Panier.builder().utilisateur(ach1User).statut(Panier.StatutPanier.ACTIF).build());

        Utilisateur ach2User = createUtilisateur("acheteur2@optistyle.com", "Client123!", "Acheteur", "Deux", Utilisateur.Role.ACHETEUR);
        panierRepository.save(Panier.builder().utilisateur(ach2User).statut(Panier.StatutPanier.ACTIF).build());

        // 4. Create Categories
        Categorie catVue = categorieRepository.save(Categorie.builder()
                .type(Categorie.TypeCategorie.VUE)
                .description("Lunettes de vue")
                .build());
        Categorie catSoleil = categorieRepository.save(Categorie.builder()
                .type(Categorie.TypeCategorie.SOLEIL)
                .description("Lunettes de soleil")
                .build());
        Categorie catLuxe = categorieRepository.save(Categorie.builder()
                .type(Categorie.TypeCategorie.LUXE)
                .description("Lunettes de luxe")
                .build());

        // 5. Create Produits & Stocks
        seedProduits(vend1, vend2, Arrays.asList(catVue, catSoleil, catLuxe));

        System.out.println("Data Seeding Complete.");
    }

    private Utilisateur createUtilisateur(String email, String password, String nom, String prenom, Utilisateur.Role role) {
        return utilisateurRepository.save(Utilisateur.builder()
                .email(email)
                .mot_de_passe(passwordEncoder.encode(password))
                .nom(nom)
                .prenom(prenom)
                .role(role)
                .build());
    }

    private void seedProduits(Vendeur v1, Vendeur v2, List<Categorie> cats) {
        Object[][] produitsData = {
                // nom, prix, marque, genre, cat index, vendeur
                {"Ray-Ban Aviator", 1200.0, "Ray-Ban", Produit.Genre.HOMME, 1, v1},
                {"Ray-Ban Wayfarer", 1100.0, "Ray-Ban", Produit.Genre.FEMME, 1, v1},
                {"Oakley Sport", 1500.0, "Oakley", Produit.Genre.HOMME, 1, v2},
                {"Gucci Elegance", 2500.0, "Gucci", Produit.Genre.FEMME, 2, v2},
                {"Chanel Classique", 2800.0, "Chanel", Produit.Genre.FEMME, 2, v2},
                {"Tom Ford", 2400.0, "Tom Ford", Produit.Genre.HOMME, 2, v1},
                {"Prada Linea", 2100.0, "Prada", Produit.Genre.HOMME, 0, v2},
                {"Persol", 1800.0, "Persol", Produit.Genre.HOMME, 0, v1},
                {"Kidz Sun", 500.0, "Polaroid", Produit.Genre.ENFANT, 1, v1},
                {"Kidz View", 600.0, "Polaroid", Produit.Genre.ENFANT, 0, v2}
        };

        for (Object[] data : produitsData) {
            Produit p = Produit.builder()
                    .nom((String) data[0])
                    .prix(BigDecimal.valueOf((Double) data[1]))
                    .marque((String) data[2])
                    .genre((Produit.Genre) data[3])
                    .categorie(cats.get((Integer) data[4]))
                    .vendeur((Vendeur) data[5])
                    .image_url("https://via.placeholder.com/400x400?text=Lunettes")
                    .build();
            Produit saved = produitRepository.save(p);

            // Create 2 stocks for each product
            stockRepository.save(Stock.builder()
                    .produit(saved).couleur("Noir").taille("M").quantite(10).build());
            stockRepository.save(Stock.builder()
                    .produit(saved).couleur("Marron").taille("L").quantite(5).build());
        }
    }
}
