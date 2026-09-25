package com.nba.hoopstore.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "equipos")
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String nombre; // Ej: "Los Angeles Lakers", "Boston Celtics"

    @Column(length = 60)
    private String ciudad;

    @Column(length = 30)
    private String conferencia; // Este / Oeste

    @Column(name = "logo_url")
    private String logoUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "liga_id", nullable = false)
    private Liga liga;

    public Equipo() {}

    public Equipo(Long id, String nombre, String ciudad, String conferencia, String logoUrl, Liga liga) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.conferencia = conferencia;
        this.logoUrl = logoUrl;
        this.liga = liga;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nombre;
        private String ciudad;
        private String conferencia;
        private String logoUrl;
        private Liga liga;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder nombre(String nombre) { this.nombre = nombre; return this; }
        public Builder ciudad(String ciudad) { this.ciudad = ciudad; return this; }
        public Builder conferencia(String conferencia) { this.conferencia = conferencia; return this; }
        public Builder logoUrl(String logoUrl) { this.logoUrl = logoUrl; return this; }
        public Builder liga(Liga liga) { this.liga = liga; return this; }

        public Equipo build() {
            return new Equipo(id, nombre, ciudad, conferencia, logoUrl, liga);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }

    public String getConferencia() { return conferencia; }
    public void setConferencia(String conferencia) { this.conferencia = conferencia; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public Liga getLiga() { return liga; }
    public void setLiga(Liga liga) { this.liga = liga; }
}
