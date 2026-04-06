package com.example.ppeinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ppeinventory.model.PPEItem;

public interface PPEItemRepository extends JpaRepository<PPEItem, Long> {
}
