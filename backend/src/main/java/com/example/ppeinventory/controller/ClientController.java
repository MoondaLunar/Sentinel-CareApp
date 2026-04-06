package com.example.ppeinventory.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import java.util.List;

import com.example.ppeinventory.model.Client;
import com.example.ppeinventory.model.Vital;
import com.example.ppeinventory.model.AuditLog;
import com.example.ppeinventory.repository.ClientRepository;
import com.example.ppeinventory.repository.VitalRepository;
import com.example.ppeinventory.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientRepository clientRepo;
    private final VitalRepository vitalRepo;
    private final AuditLogRepository auditRepo;

    public ClientController(ClientRepository clientRepo, VitalRepository vitalRepo, AuditLogRepository auditRepo) {
        this.clientRepo = clientRepo; this.vitalRepo = vitalRepo; this.auditRepo = auditRepo;
    }

    @GetMapping
    public List<Client> list() { return clientRepo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Client> get(@PathVariable Long id) {
        return clientRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Client create(@RequestBody Client client, Authentication auth) {
        Client saved = clientRepo.save(client);
        auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "CREATE", "Client", saved.getId(), "created: name="+saved.getName()));
        return saved;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client updated, @RequestParam String reason, Authentication auth) {
        return clientRepo.findById(id).map(existing -> {
            String before = String.format("name=%s,dob=%s", existing.getName(), existing.getDateOfBirth());
            existing.setName(updated.getName()); existing.setDateOfBirth(updated.getDateOfBirth());
            Client saved = clientRepo.save(existing);
            String after = String.format("name=%s,dob=%s", saved.getName(), saved.getDateOfBirth());
            auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "UPDATE", "Client", saved.getId(), "before: "+before+"; after: "+after, reason));
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        return clientRepo.findById(id).map(existing -> {
            clientRepo.delete(existing);
            auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "DELETE", "Client", id, "deleted"));
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/vitals")
    public List<Vital> vitals(@PathVariable Long id) { return vitalRepo.findByClientId(id); }

    @PostMapping("/{id}/vitals")
    public Vital addVital(@PathVariable Long id, @RequestBody Vital v, Authentication auth) {
        Client c = clientRepo.findById(id).orElseThrow();
        v.setClient(c);
        Vital saved = vitalRepo.save(v);
        String details = String.format("client=%d,hr=%s,bp=%s", id, saved.getHeartRate(), saved.getBloodPressure());
        auditRepo.save(new AuditLog(auth==null?"anonymous":auth.getName(), "CREATE", "Vital", saved.getId(), "vital added: "+details));
        return saved;
    }
}
