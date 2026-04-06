package com.example.ppeinventory;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.example.ppeinventory.model.PPEItem;
import com.example.ppeinventory.model.Client;
import com.example.ppeinventory.repository.PPEItemRepository;
import com.example.ppeinventory.repository.ClientRepository;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    @Profile("h2")
    @ConditionalOnBean({PPEItemRepository.class, ClientRepository.class})
    CommandLineRunner seedH2(PPEItemRepository ppeRepo, ClientRepository clientRepo) {
        return args -> {
            if (ppeRepo.count() == 0) {
                ppeRepo.save(new PPEItem("N95 Mask", 500, "Storage A"));
                ppeRepo.save(new PPEItem("Gloves", 2000, "Storage B"));
            }
            if (clientRepo.count() == 0) {
                clientRepo.save(new Client("Alice Smith", "1990-05-01"));
                clientRepo.save(new Client("Bob Jones", "1985-11-20"));
            }
        };
    }

    @Bean
    @Profile("postgresql")
    @ConditionalOnBean({PPEItemRepository.class, ClientRepository.class})
    CommandLineRunner seedPostgresql(PPEItemRepository ppeRepo, ClientRepository clientRepo) {
        return args -> {
            if (ppeRepo.count() == 0) {
                ppeRepo.save(new PPEItem("Surgical Mask", 1000, "Main Warehouse"));
                ppeRepo.save(new PPEItem("Face Shield", 250, "Secondary Storage"));
                ppeRepo.save(new PPEItem("Isolation Gown", 320, "Main Warehouse"));
            }
            if (clientRepo.count() == 0) {
                clientRepo.save(new Client("Charlie Example", "1979-02-14"));
                clientRepo.save(new Client("Dana Lee", "1988-08-08"));
            }
        };
    }
}
