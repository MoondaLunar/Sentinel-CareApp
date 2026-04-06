package com.example.ppeinventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ppeinventory.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
