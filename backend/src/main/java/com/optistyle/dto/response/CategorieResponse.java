package com.optistyle.dto.response;

import com.optistyle.entity.Categorie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategorieResponse {
    private Integer id_categorie;
    private Categorie.TypeCategorie type;
    private String description;
}
