package com.nba.hoopstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ligas")
public class Liga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String nombre; // Ej: "NBA", "EuroLeague", "FIBA", "WNBA"

    @Column(name = "pais_region", length = 80)
    private String paisRegion;

    @Column(name = "logo_url")
    private String logoUrl;

    @OneToMany(mappedBy = "liga", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Equipo> equipos = new ArrayList<>();

    public Liga() {}

    public Liga(Long id, String nombre, String paisRegion, String logoUrl) {
        this.id = id;
        this.nombre = nombre;
        this.paisRegion = paisRegion;
        this.logoUrl = logoUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nombre;
        private String paisRegion;
        private String logoUrl;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder nombre(String nombre) { this.nombre = nombre; return this; }
        public Builder paisRegion(String paisRegion) { this.paisRegion = paisRegion; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }

        public Liga build() {
            return new Liga(id, nombre, paisRegion, logoUrl);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getPaisRegion() { return paisRegion; }
    public void setPaisRegion(String paisRegion) { this.paisRegion = paisRegion; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public List<Equipo> getEquipos() { return equipos; }
    public void setEquipos(List<Equipo> equipos) { this.equipos = equipos; }
}
