const BASE_URL = "http://localhost:8080";

export const getToken = () => {
    return localStorage.getItem("token");
};

export const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const authFetch = async (url, options = {}) => {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        if (url.includes("/login")) {
             throw new Error("Email ou mot de passe incorrect.");
        }
        clearAuth();
        throw new Error("Session expirée. Veuillez vous reconnecter.");
    }

    if (response.status === 403) {
        throw new Error("Accès non autorisé pour cette ressource.");
    }

    if (!response.ok) {
        let errMsg = "Erreur lors de l'opération";
        try {
            const errData = await response.json();
            if (errData.message) errMsg = errData.message;
        } catch (e) {
            // Ignore if no json message
        }
        throw new Error(errMsg);
    }

    // Attempt to parse JSON if content type is json or response is not empty (like status 204 or 201 without body)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
};

// ======================= AUTH =======================
export const login = (data) => authFetch("/api/auth/login", { method: "POST", body: JSON.stringify(data) });
export const registerAcheteur = (data) => authFetch("/api/auth/register/acheteur", { method: "POST", body: JSON.stringify(data) });
export const registerVendeur = (data) => authFetch("/api/auth/register/vendeur", { method: "POST", body: JSON.stringify(data) });
export const getMe = () => authFetch("/api/auth/me", { method: "GET" });

// ======================= PRODUITS =======================
export const getAllProduits = (params = "") => authFetch(`/api/produits${params}`, { method: "GET" });
export const getProduitById = (id) => authFetch(`/api/produits/${id}`, { method: "GET" });
export const getProduitsByGenre = (genre) => authFetch(`/api/produits/genre/${genre}`, { method: "GET" });
export const getProduitsByCategorie = (idCategorie) => authFetch(`/api/produits/categorie/${idCategorie}`, { method: "GET" });
export const createProduit = (data) => authFetch("/api/produits", { method: "POST", body: JSON.stringify(data) });
export const deleteProduit = (id) => authFetch(`/api/produits/${id}`, { method: "DELETE" });

// ======================= CATEGORIES =======================
export const getAllCategories = () => authFetch("/api/categories", { method: "GET" });

// ======================= VENDEURS =======================
export const getAllVendeurs = () => authFetch("/api/vendeurs", { method: "GET" });
export const getVendeurProduits = (id) => authFetch(`/api/vendeurs/${id}/produits`, { method: "GET" });
export const getVendeurVentes = (id) => authFetch(`/api/vendeurs/${id}/ventes`, { method: "GET" });

// ======================= PANIER =======================
export const getMyPanier = () => authFetch("/api/panier", { method: "GET" });
export const addToPanier = (data) => authFetch("/api/panier/ajouter", { method: "POST", body: JSON.stringify(data) });
export const modifyPanierLigne = (data) => authFetch("/api/panier/modifier", { method: "PUT", body: JSON.stringify(data) });
export const removePanierLigne = (idLigne) => authFetch(`/api/panier/supprimer/${idLigne}`, { method: "DELETE" });
export const clearPanier = () => authFetch("/api/panier/vider", { method: "DELETE" });

// ======================= COMMANDES =======================
export const checkout = (data) => authFetch("/api/commandes/checkout", { method: "POST", body: JSON.stringify(data) });
export const getMyCommandes = () => authFetch("/api/commandes", { method: "GET" });
