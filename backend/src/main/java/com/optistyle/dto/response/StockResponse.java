package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockResponse {
    private Integer id_stock;
    private String couleur;
    private String taille;
    private Integer quantite;
}
