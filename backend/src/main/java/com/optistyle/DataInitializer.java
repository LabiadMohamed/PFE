package com.optistyle;

import com.optistyle.entity.*;
import com.optistyle.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // Enlarge image_url column once
        try {
            jdbcTemplate.execute("ALTER TABLE produits MODIFY COLUMN image_url LONGTEXT");
        } catch (Exception e) {
            // Already LONGTEXT, ignore
        }

        // ── Only seed if the DB is empty ──────────────────────────────
        // This block runs ONCE on first launch, never again.
        if (utilisateurRepository.count() == 0) {
            System.out.println("🌱 First launch — seeding users, categories and products...");
            seedAll();
            System.out.println("✅ Seeding complete.");
        } else {
            System.out.println("✅ Data already exists — skipping seed.");
        }
    }

    // ══════════════════════════════════════════════════════════════════
    //  Full seed — runs only ONCE (when utilisateur table is empty)
    // ══════════════════════════════════════════════════════════════════
    private void seedAll() {

        // ── 1. Users ──────────────────────────────────────────────────
        Utilisateur adminUser = createUtilisateur("admin@optistyle.com",  "Admin123!",  "Admin",    "Super", Utilisateur.Role.ADMIN);
        adminRepository.save(Admin.builder().utilisateur(adminUser).niveau_acces("SUPER").peut_gerer_users(true).build());

        Utilisateur vend1User = createUtilisateur("vendor1@optistyle.com", "Vendor123!", "Pro",    "Vision",  Utilisateur.Role.VENDEUR);
        Vendeur vend1 = vendeurRepository.save(Vendeur.builder()
                .utilisateur(vend1User).nom_boutique("VisionPro")
                .description("Expert").telephone("0600000001").note_moyenne(4.8f).build());

        Utilisateur vend2User = createUtilisateur("vendor2@optistyle.com", "Vendor123!", "Optic", "Lux",     Utilisateur.Role.VENDEUR);
        Vendeur vend2 = vendeurRepository.save(Vendeur.builder()
                .utilisateur(vend2User).nom_boutique("LuxOptic")
                .description("Luxe").telephone("0600000002").note_moyenne(4.9f).build());

        Utilisateur ach1 = createUtilisateur("acheteur1@optistyle.com", "Client123!", "Acheteur", "Un",   Utilisateur.Role.ACHETEUR);
        panierRepository.save(Panier.builder().utilisateur(ach1).statut(Panier.StatutPanier.ACTIF).build());

        Utilisateur ach2 = createUtilisateur("acheteur2@optistyle.com", "Client123!", "Acheteur", "Deux", Utilisateur.Role.ACHETEUR);
        panierRepository.save(Panier.builder().utilisateur(ach2).statut(Panier.StatutPanier.ACTIF).build());

        // ── 2. Categories ─────────────────────────────────────────────
        Categorie catVue    = categorieRepository.save(Categorie.builder().type(Categorie.TypeCategorie.VUE).description("Lunettes de vue").build());
        Categorie catSoleil = categorieRepository.save(Categorie.builder().type(Categorie.TypeCategorie.SOLEIL).description("Lunettes de soleil").build());
        Categorie catLuxe   = categorieRepository.save(Categorie.builder().type(Categorie.TypeCategorie.LUXE).description("Lunettes de luxe").build());

        // ── 3. Products ───────────────────────────────────────────────
        seedProduits(vend1, vend2, Arrays.asList(catVue, catSoleil, catLuxe));
    }

    // ══════════════════════════════════════════════════════════════════
    //  Product data
    //  Columns: nom, prix, marque, genre, catIndex, vendeur,
    //           image_url, colors (JSON), images (JSON), forme, materiau, badge
    // ══════════════════════════════════════════════════════════════════
    private void seedProduits(Vendeur v1, Vendeur v2, List<Categorie> cats) {

        // Helper color JSON strings (reused below)
        String black        = "[{\"hex\":\"#1a1a1a\",\"label\":\"black\"}]";
        String blackSilver  = "[{\"hex\":\"#1a1a1a\",\"label\":\"black\"},{\"hex\":\"#A8A9AD\",\"label\":\"silver\"}]";
        String blackGold    = "[{\"hex\":\"#1a1a1a\",\"label\":\"black\"},{\"hex\":\"#C9A84C\",\"label\":\"gold\"}]";
        String blackTortoise= "[{\"hex\":\"#1a1a1a\",\"label\":\"black\"},{\"hex\":\"#8B5E3C\",\"label\":\"tortoise\"}]";
        String goldSilver   = "[{\"hex\":\"#C9A84C\",\"label\":\"gold\"},{\"hex\":\"#A8A9AD\",\"label\":\"silver\"}]";
        String pinkTortoise = "[{\"hex\":\"#E8A598\",\"label\":\"pink\"},{\"hex\":\"#8B5E3C\",\"label\":\"tortoise\"}]";
        String redBlack     = "[{\"hex\":\"#C0392B\",\"label\":\"red\"},{\"hex\":\"#1a1a1a\",\"label\":\"black\"}]";
        String tortoise     = "[{\"hex\":\"#8B5E3C\",\"label\":\"tortoise\"}]";
        String gold         = "[{\"hex\":\"#C9A84C\",\"label\":\"gold\"}]";
        String silver       = "[{\"hex\":\"#A8A9AD\",\"label\":\"silver\"}]";
        String blueRed      = "[{\"hex\":\"#2d528f\",\"label\":\"blue\"},{\"hex\":\"#C0392B\",\"label\":\"red\"}]";
        String pinkPurple   = "[{\"hex\":\"#E8A598\",\"label\":\"pink\"},{\"hex\":\"#c821e2\",\"label\":\"purple\"}]";
        String darkSilverBlack = "[{\"hex\":\"#83848a\",\"label\":\"dark silver\"},{\"hex\":\"#1a1a1a\",\"label\":\"black\"}]";

        // Helper: build a single-image JSON array from image_url
        // For multi-color products, we reuse the same image (you can update later)

        Object[][] data = {
                // ── OPTICAL / FEMME (catIndex=0) ──────────────────────────────────────────
                // nom            prix    marque       genre                  cat  vendeur  image_url
                // colors          images                                                                    forme          materiau   badge
                {"CORALIE",  500.0, "OptiStyle", Produit.Genre.FEMME, 0, v1, "/images/women/a.jfif",
                        pinkTortoise,
                        "[\"/images/women/a.jfif\",\"/images/women/a.jfif\"]",
                        "Cat Eye","Acetate","New"},

                {"ADELINE",  430.0, "OptiStyle", Produit.Genre.FEMME, 0, v2, "/images/women/bbb.jfif",
                        redBlack,
                        "[\"/images/women/bbb.jfif\",\"/images/women/bbb.jfif\"]",
                        "Cat Eye","Acetate",null},

                {"RACHEL",   200.0, "OptiStyle", Produit.Genre.FEMME, 0, v1, "/images/women/c.jfif",
                        goldSilver,
                        "[\"/images/women/c.jfif\",\"/images/women/c.jfif\"]",
                        "Round","Metal",null},

                {"CLAIRE",   599.0, "OptiStyle", Produit.Genre.FEMME, 0, v2, "/images/women/d.jfif",
                        gold,
                        "[\"/images/women/d.jfif\"]",
                        "Aviator","Metal","Bestseller"},

                {"LÉONIE",   805.0, "OptiStyle", Produit.Genre.FEMME, 0, v1, "/images/women/e.jfif",
                        blackTortoise,
                        "[\"/images/women/e.jfif\",\"/images/women/e.jfif\"]",
                        "Oval","Acetate",null},

                {"Durand",   460.0, "OptiStyle", Produit.Genre.FEMME, 0, v2, "/images/a/a.jfif",
                        blackSilver,
                        "[\"/images/a/a.jfif\",\"/images/a/a.jfif\"]",
                        "Rectangular","Metal",null},

                {"Percey",   499.0, "OptiStyle", Produit.Genre.FEMME, 0, v1, "/images/a/b.jfif",
                        pinkPurple,
                        "[\"/images/a/b.jfif\",\"/images/a/b.jfif\"]",
                        "Butterfly","Acetate","New"},

                {"Wilkey",   470.0, "OptiStyle", Produit.Genre.FEMME, 0, v2, "/images/a/c.jfif",
                        tortoise,
                        "[\"/images/a/c.jfif\"]",
                        "Round","Acetate",null},

                {"Rice",     199.0, "OptiStyle", Produit.Genre.FEMME, 0, v1, "/images/a/d.jfif",
                        blackGold,
                        "[\"/images/a/d.jfif\",\"/images/a/d.jfif\"]",
                        "Rectangular","Plastic",null},

                // ── OPTICAL / HOMME ──────────────────────────────────────────────────────
                {"FAIDHERBE",450.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/x.jfif",
                        blackSilver,
                        "[\"/images/b/x.jfif\",\"/images/b/x.jfif\"]",
                        "Rectangular","Metal",null},

                {"XAV S",    550.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/men/a.jfif",
                        blackGold,
                        "[\"/images/men/a.jfif\",\"/images/men/a.jfif\"]",
                        "Square","Acetate","Bestseller"},

                {"GEORGES",  440.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/h.jfif",
                        darkSilverBlack,
                        "[\"/images/b/h.jfif\",\"/images/b/h.jfif\"]",
                        "Aviator","Titanium",null},

                {"BRETON",   455.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/b/e.jfif",
                        tortoise,
                        "[\"/images/b/e.jfif\"]",
                        "Round","Acetate",null},

                {"TITAN RX", 120.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/men/ccc.jfif",
                        blackSilver,
                        "[\"/images/men/ccc.jfif\",\"/images/men/ccc.jfif\"]",
                        "Rectangular","Titanium",null},

                {"MARCUS",   745.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/men/d.jfif",
                        black,
                        "[\"/images/men/d.jfif\"]",
                        "Square","Metal","Bestseller"},

                {"Xiv",      590.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/a.jfif",
                        blackGold,
                        "[\"/images/b/a.jfif\",\"/images/b/a.jfif\"]",
                        "Oval","Acetate",null},

                {"Cran",     599.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/b/b.jfif",
                        darkSilverBlack,
                        "[\"/images/b/b.jfif\",\"/images/b/b.jfif\"]",
                        "Rectangular","Metal",null},

                {"Brady",    299.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/c.jfif",
                        black,
                        "[\"/images/b/c.jfif\"]",
                        "Round","Plastic",null},

                {"Nzami",    100.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/b/d.jfif",
                        blackSilver,
                        "[\"/images/b/d.jfif\",\"/images/b/d.jfif\"]",
                        "Rectangular","Metal",null},

                {"Zala",     250.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/e.jfif",
                        tortoise,
                        "[\"/images/b/e.jfif\"]",
                        "Oval","Acetate",null},

                {"Krimo",    120.0, "OptiStyle", Produit.Genre.HOMME, 0, v2, "/images/b/f.jfif",
                        blackGold,
                        "[\"/images/b/f.jfif\",\"/images/b/f.jfif\"]",
                        "Square","Plastic",null},

                {"Sima",     370.0, "OptiStyle", Produit.Genre.HOMME, 0, v1, "/images/b/g.jfif",
                        darkSilverBlack,
                        "[\"/images/b/g.jfif\",\"/images/b/g.jfif\"]",
                        "Aviator","Metal",null},

                // ── OPTICAL / ENFANT ─────────────────────────────────────────────────────
                {"BOULEVARD",799.0, "OptiStyle", Produit.Genre.ENFANT, 0, v1, "/images/kids/a.avif",
                        blueRed,
                        "[\"/images/kids/a.avif\",\"/images/kids/a.avif\"]",
                        "Round","Plastic",null},

                {"COR1",     100.0, "OptiStyle", Produit.Genre.ENFANT, 0, v2, "/images/kids/b.avif",
                        pinkPurple,
                        "[\"/images/kids/b.avif\",\"/images/kids/b.avif\"]",
                        "Oval","Plastic","New"},

                {"COR2",     160.0, "OptiStyle", Produit.Genre.ENFANT, 0, v1, "/images/kids/c.avif",
                        blueRed,
                        "[\"/images/kids/c.avif\",\"/images/kids/c.avif\"]",
                        "Round","Plastic",null},

                {"COR3",     120.0, "OptiStyle", Produit.Genre.ENFANT, 0, v2, "/images/kids/d.avif",
                        blackGold,
                        "[\"/images/kids/d.avif\",\"/images/kids/d.avif\"]",
                        "Square","Plastic",null},

                // ── SUN / FEMME (catIndex=1) ──────────────────────────────────────────────
                {"TINA2000",  370.0, "OptiStyle", Produit.Genre.FEMME, 1, v1, "/images/w/a.jfif",
                        blackTortoise,
                        "[\"/images/w/a.jfif\",\"/images/w/a.jfif\"]",
                        "Cat Eye","Acetate","New"},

                {"CAT LUXE",  235.0, "OptiStyle", Produit.Genre.FEMME, 1, v2, "/images/w/b.jfif",
                        pinkTortoise,
                        "[\"/images/w/b.jfif\",\"/images/w/b.jfif\"]",
                        "Cat Eye","Acetate",null},

                {"PAPAYA",    480.0, "OptiStyle", Produit.Genre.FEMME, 1, v1, "/images/w/c.jfif",
                        gold,
                        "[\"/images/w/c.jfif\"]",
                        "Butterfly","Metal","Bestseller"},

                {"ROUND SOL", 459.0, "OptiStyle", Produit.Genre.FEMME, 1, v2, "/images/w/d.jfif",
                        blackGold,
                        "[\"/images/w/d.jfif\",\"/images/w/d.jfif\"]",
                        "Round","Metal",null},

                {"Sweet",     540.0, "OptiStyle", Produit.Genre.FEMME, 1, v1, "/images/w/g.jpg",
                        pinkPurple,
                        "[\"/images/w/g.jpg\",\"/images/w/g.jpg\"]",
                        "Oval","Acetate",null},

                {"Angel",     130.0, "OptiStyle", Produit.Genre.FEMME, 1, v2, "/images/w/e.jfif",
                        redBlack,
                        "[\"/images/w/e.jfif\",\"/images/w/e.jfif\"]",
                        "Cat Eye","Plastic",null},

                {"Glam Eyes", 250.0, "OptiStyle", Produit.Genre.FEMME, 1, v1, "/images/w/h.jpg",
                        goldSilver,
                        "[\"/images/w/h.jpg\",\"/images/w/h.jpg\"]",
                        "Butterfly","Metal","New"},

                {"Evil",      450.0, "OptiStyle", Produit.Genre.FEMME, 1, v2, "/images/w/i.jpg",
                        blackTortoise,
                        "[\"/images/w/i.jpg\",\"/images/w/i.jpg\"]",
                        "Rectangular","Acetate",null},

                {"Luna chic", 100.0, "OptiStyle", Produit.Genre.FEMME, 1, v1, "/images/w/j.jpg",
                        pinkTortoise,
                        "[\"/images/w/j.jpg\",\"/images/w/j.jpg\"]",
                        "Round","Acetate",null},

                // ── SUN / HOMME ──────────────────────────────────────────────────────────
                {"KENITO",    600.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/a.jfif",
                        black,
                        "[\"/images/m/a.jfif\"]",
                        "Aviator","Metal",null},

                {"AVIATOR S", 590.0, "OptiStyle", Produit.Genre.HOMME, 1, v2, "/images/m/b.jpg",
                        darkSilverBlack,
                        "[\"/images/m/b.jpg\",\"/images/m/b.jpg\"]",
                        "Aviator","Metal","Bestseller"},

                {"SHIELD",    450.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/c.jpg",
                        blackGold,
                        "[\"/images/m/c.jpg\",\"/images/m/c.jpg\"]",
                        "Rectangular","Titanium",null},

                {"WAYFARER X",350.0, "OptiStyle", Produit.Genre.HOMME, 1, v2, "/images/m/d.jpg",
                        black,
                        "[\"/images/m/d.jpg\"]",
                        "Square","Acetate",null},

                {"MARCO",     620.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/e.jpg",
                        darkSilverBlack,
                        "[\"/images/m/e.jpg\",\"/images/m/e.jpg\"]",
                        "Aviator","Metal",null},

                {"Royal",     460.0, "OptiStyle", Produit.Genre.HOMME, 1, v2, "/images/m/ff.jpg",
                        blackGold,
                        "[\"/images/m/ff.jpg\",\"/images/m/ff.jpg\"]",
                        "Square","Acetate",null},

                {"Classic",   600.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/g.jpg",
                        blackSilver,
                        "[\"/images/m/g.jpg\",\"/images/m/g.jpg\"]",
                        "Rectangular","Metal",null},

                {"Urban",     800.0, "OptiStyle", Produit.Genre.HOMME, 1, v2, "/images/m/i.jfif",
                        black,
                        "[\"/images/m/i.jfif\"]",
                        "Square","Acetate","New"},

                {"Speed Loke", 70.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/j.jfif",
                        blueRed,
                        "[\"/images/m/j.jfif\",\"/images/m/j.jfif\"]",
                        "Oval","Plastic",null},

                {"Mazig",     120.0, "OptiStyle", Produit.Genre.HOMME, 1, v2, "/images/m/k.jfif",
                        blackSilver,
                        "[\"/images/m/k.jfif\",\"/images/m/k.jfif\"]",
                        "Rectangular","Metal",null},

                {"EDAHEM",    400.0, "OptiStyle", Produit.Genre.HOMME, 1, v1, "/images/m/l.jfif",
                        darkSilverBlack,
                        "[\"/images/m/l.jfif\",\"/images/m/l.jfif\"]",
                        "Aviator","Titanium",null},

                // ── SUN / ENFANT ─────────────────────────────────────────────────────────
                {"IZY20",     220.0, "OptiStyle", Produit.Genre.ENFANT, 1, v1, "/images/r/aa.jpg",
                        blueRed,
                        "[\"/images/r/aa.jpg\",\"/images/r/aa.jpg\"]",
                        "Round","Plastic",null},

                {"HEXAGON",    70.0, "OptiStyle", Produit.Genre.ENFANT, 1, v2, "/images/r/b.jpg",
                        pinkPurple,
                        "[\"/images/r/b.jpg\",\"/images/r/b.jpg\"]",
                        "Rectangular","Plastic","New"},

                {"SPORT PRO",  60.0, "OptiStyle", Produit.Genre.ENFANT, 1, v1, "/images/r/c.jpg",
                        blueRed,
                        "[\"/images/r/c.jpg\",\"/images/r/c.jpg\"]",
                        "Rectangular","Plastic",null},

                {"Asmar",     300.0, "OptiStyle", Produit.Genre.ENFANT, 1, v2, "/images/r/r.jpg",
                        blackTortoise,
                        "[\"/images/r/r.jpg\",\"/images/r/r.jpg\"]",
                        "Oval","Acetate",null},

                {"Kadra",     250.0, "OptiStyle", Produit.Genre.ENFANT, 1, v1, "/images/r/sss.webp",
                        pinkPurple,
                        "[\"/images/r/sss.webp\",\"/images/r/sss.webp\"]",
                        "Round","Plastic",null},

                {"Sva",       450.0, "OptiStyle", Produit.Genre.ENFANT, 1, v2, "/images/r/ss.webp",
                        blueRed,
                        "[\"/images/r/ss.webp\",\"/images/r/ss.webp\"]",
                        "Square","Plastic",null},

                {"Domi",      230.0, "OptiStyle", Produit.Genre.ENFANT, 1, v1, "/images/r/s.webp",
                        blackGold,
                        "[\"/images/r/s.webp\",\"/images/r/s.webp\"]",
                        "Oval","Plastic",null},

                // ── LUXE / FEMME (catIndex=2) ─────────────────────────────────────────────
                {"JR ROUND",  850.0, "OptiStyle", Produit.Genre.FEMME, 2, v1, "/images/x/d.jpg",
                        goldSilver,
                        "[\"/images/x/d.jpg\",\"/images/x/d.jpg\"]",
                        "Round","Titanium","Limited"},

                {"DINO",      380.0, "OptiStyle", Produit.Genre.FEMME, 2, v2, "/images/x/a.jpg",
                        pinkTortoise,
                        "[\"/images/x/a.jpg\",\"/images/x/a.jpg\"]",
                        "Cat Eye","Acetate",null},

                {"HEART",     450.0, "OptiStyle", Produit.Genre.FEMME, 2, v1, "/images/x/b.jpg",
                        redBlack,
                        "[\"/images/x/b.jpg\",\"/images/x/b.jpg\"]",
                        "Oval","Acetate","New"},

                {"SQ PLAY",   333.0, "OptiStyle", Produit.Genre.FEMME, 2, v2, "/images/x/c.jpg",
                        blackGold,
                        "[\"/images/x/c.jpg\",\"/images/x/c.jpg\"]",
                        "Square","Metal",null},

                {"PILOT JR",  370.0, "OptiStyle", Produit.Genre.FEMME, 2, v1, "/images/x/e.jpg",
                        gold,
                        "[\"/images/x/e.jpg\"]",
                        "Aviator","Metal","Bestseller"},

                // ── LUXE / HOMME ─────────────────────────────────────────────────────────
                {"TINY STAR", 750.0, "OptiStyle", Produit.Genre.HOMME, 2, v1, "/images/n/a.jpg",
                        darkSilverBlack,
                        "[\"/images/n/a.jpg\",\"/images/n/a.jpg\"]",
                        "Square","Titanium","Limited"},

                {"MINI AVI",  460.0, "OptiStyle", Produit.Genre.HOMME, 2, v2, "/images/n/b.jpg",
                        blackGold,
                        "[\"/images/n/b.jpg\",\"/images/n/b.jpg\"]",
                        "Aviator","Metal",null},

                {"BUTTERFLY", 360.0, "OptiStyle", Produit.Genre.HOMME, 2, v1, "/images/n/c.jpg",
                        blackSilver,
                        "[\"/images/n/c.jpg\",\"/images/n/c.jpg\"]",
                        "Butterfly","Acetate",null},

                {"RAINBOW",   290.0, "OptiStyle", Produit.Genre.HOMME, 2, v2, "/images/n/d.jpg",
                        blueRed,
                        "[\"/images/n/d.jpg\",\"/images/n/d.jpg\"]",
                        "Round","Plastic","New"},

                // ── LUXE / ENFANT ─────────────────────────────────────────────────────────
                {"SPORTY JR", 399.0, "OptiStyle", Produit.Genre.ENFANT, 2, v1, "/images/f/a.jpg",
                        blueRed,
                        "[\"/images/f/a.jpg\",\"/images/f/a.jpg\"]",
                        "Rectangular","Plastic",null},

                {"ROBO",      340.0, "OptiStyle", Produit.Genre.ENFANT, 2, v2, "/images/f/c.jpg",
                        blackGold,
                        "[\"/images/f/c.jpg\",\"/images/f/c.jpg\"]",
                        "Square","Plastic",null},

                {"FLOCON",    300.0, "OptiStyle", Produit.Genre.ENFANT, 2, v1, "/images/f/b.jpg",
                        pinkPurple,
                        "[\"/images/f/b.jpg\",\"/images/f/b.jpg\"]",
                        "Oval","Plastic","New"},
        };

        for (Object[] row : data) {
            Produit p = produitRepository.save(Produit.builder()
                    .nom((String)      row[0])
                    .prix(BigDecimal.valueOf((Double) row[1]))
                    .marque((String)   row[2])
                    .genre((Produit.Genre) row[3])
                    .categorie(cats.get((Integer) row[4]))
                    .vendeur((Vendeur)  row[5])
                    .image_url((String) row[6])
                    .colors((String)    row[7])   // ✅ colors JSON
                    .images((String)    row[8])   // ✅ images JSON
                    .forme((String)     row[9])   // ✅ forme
                    .materiau((String)  row[10])  // ✅ materiau
                    .badge((String)     row[11])  // ✅ badge
                    .build());

            // 2 stocks per product
            stockRepository.save(Stock.builder().produit(p).couleur("Noir").taille("M").quantite(12).build());
            stockRepository.save(Stock.builder().produit(p).couleur("Marron").taille("L").quantite(8).build());
        }
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
}