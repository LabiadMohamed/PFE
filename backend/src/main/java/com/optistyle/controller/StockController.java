package com.optistyle.controller;

import com.optistyle.dto.request.StockRequest;
import com.optistyle.dto.response.StockResponse;
import com.optistyle.service.StockService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping("/produit/{id_produit}")
    public ResponseEntity<List<StockResponse>> getStocksByProduit(@PathVariable Integer id_produit) {
        return ResponseEntity.ok(stockService.getStocksByProduit(id_produit));
    }

    @PostMapping
    public ResponseEntity<StockResponse> addStock(@Valid @RequestBody StockRequest request) {
        return new ResponseEntity<>(stockService.addStock(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockResponse> updateStock(@PathVariable Integer id, @Valid @RequestBody StockRequest request) {
        return ResponseEntity.ok(stockService.updateStock(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Integer id) {
        stockService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }
}
