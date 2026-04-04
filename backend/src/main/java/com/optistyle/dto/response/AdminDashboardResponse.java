package com.optistyle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private Long totalCommandes;
    private Long totalAcheteurs;
    private Long totalVendeurs;
    private BigDecimal totalRevenue;
    private Map<String, Long> commandesParStatut;
    private Map<String, Long> paiementsParStatut;
}
