package com.example.ppeinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ppeinventory.model.Vital;

import java.util.List;

public interface VitalRepository extends JpaRepository<Vital, Long> {
    List<Vital> findByClientId(Long clientId);
}
