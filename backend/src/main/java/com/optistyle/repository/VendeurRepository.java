package com.optistyle.repository;

import com.optistyle.entity.Vendeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendeurRepository extends JpaRepository<Vendeur, Integer> {
}
