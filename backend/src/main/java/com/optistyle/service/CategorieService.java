package com.optistyle.service;

import com.optistyle.dto.response.CategorieResponse;
import com.optistyle.entity.Categorie;
import com.optistyle.exception.ResourceNotFoundException;
import com.optistyle.repository.CategorieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategorieService {

    private final CategorieRepository categorieRepository;

    public List<CategorieResponse> getAllCategories() {
        return categorieRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CategorieResponse createCategorie(Categorie categorie) {
        return mapToResponse(categorieRepository.save(categorie));
    }

    public CategorieResponse updateCategorie(Integer id, Categorie request) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categorie non trouvée"));
                
        categorie.setType(request.getType());
        categorie.setDescription(request.getDescription());
        
        return mapToResponse(categorieRepository.save(categorie));
    }

    public void deleteCategorie(Integer id) {
        if (!categorieRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categorie non trouvée");
        }
        categorieRepository.deleteById(id);
    }

    public CategorieResponse mapToResponse(Categorie categorie) {
        return CategorieResponse.builder()
                .id_categorie(categorie.getId_categorie())
                .type(categorie.getType())
                .description(categorie.getDescription())
                .build();
    }
}
