package com.example.ppeinventory.model;

import jakarta.persistence.*;
import org.hibernate.envers.Audited;
import java.time.LocalDateTime;

@Entity
@Audited
public class Vital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer heartRate;
    private String bloodPressure;
    private LocalDateTime timestamp = LocalDateTime.now();

    @ManyToOne
    private Client client;

    public Vital() {}
    public Vital(Client client, Integer hr, String bp) { this.client = client; this.heartRate = hr; this.bloodPressure = bp; }

    public Long getId() { return id; }
    public Integer getHeartRate() { return heartRate; }
    public void setHeartRate(Integer heartRate) { this.heartRate = heartRate; }
    public String getBloodPressure() { return bloodPressure; }
    public void setBloodPressure(String bloodPressure) { this.bloodPressure = bloodPressure; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
}
