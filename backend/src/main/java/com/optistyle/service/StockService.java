package com.optistyle.service;

import com.optistyle.dto.request.StockRequest;
import com.optistyle.dto.response.StockResponse;
import com.optistyle.entity.Produit;
import com.optistyle.entity.Stock;
import com.optistyle.entity.Utilisateur;
import org.springframework.security.access.AccessDeniedException;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.ProduitRepository;
import com.optistyle.repository.StockRepository;
import com.optistyle.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;

    public List<StockResponse> getStocksByProduit(Integer idProduit) {
        return stockRepository.findByProduitId(idProduit).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StockResponse addStock(StockRequest request) {
        Produit produit = produitRepository.findById(request.getId_produit())
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));

        checkOwnershipOrAdmin(produit);

        Stock stock = Stock.builder()
                .produit(produit)
                .couleur(request.getCouleur())
                .taille(request.getTaille())
                .quantite(request.getQuantite())
                .build();

        return mapToResponse(stockRepository.save(stock));
    }

    public StockResponse updateStock(Integer id, StockRequest request) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock non trouvé"));

        checkOwnershipOrAdmin(stock.getProduit());

        stock.setCouleur(request.getCouleur());
        stock.setTaille(request.getTaille());
        stock.setQuantite(request.getQuantite());

        return mapToResponse(stockRepository.save(stock));
    }

    public void deleteStock(Integer id) {
        Stock stock = stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock non trouvé"));

        checkOwnershipOrAdmin(stock.getProduit());
        stockRepository.delete(stock);
    }

    private void checkOwnershipOrAdmin(Produit produit) {
        String email = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        Utilisateur user = utilisateurRepository.findByEmail(email).orElseThrow();

        if (user.getRole() == Utilisateur.Role.ADMIN) {
            return;
        }

        if (!produit.getVendeur().getUtilisateur().getId_utilisateur().equals(user.getId_utilisateur())) {
            throw new AccessDeniedException("Vous n'êtes pas le propriétaire de ce produit");
        }
    }

    private StockResponse mapToResponse(Stock stock) {
        return StockResponse.builder()
                .id_stock(stock.getId_stock())
                .couleur(stock.getCouleur())
                .taille(stock.getTaille())
                .quantite(stock.getQuantite())
                .build();
    }
}