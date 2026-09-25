package com.nba.hoopstore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "balones")
public class Balon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 150)
    private String nombre;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String marca;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @NotNull
    @DecimalMin("0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull
    @Min(0)
    @Column(nullable = false)
    private Integer stock;

    @Column(length = 20)
    private String talla;

    @Column(length = 50)
    private String material;

    @Column(name = "anio_edicion")
    private Integer anioEdicion;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "liga_id", nullable = false)
    private Liga liga;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipo_id")
    private Equipo equipo;

    public Balon() {}

    public Balon(Long id, String nombre, String marca, String descripcion, BigDecimal precio,
                 Integer stock, String talla, String material, Integer anioEdicion,
                 String imagenUrl, Liga liga, Equipo equipo) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.talla = talla;
        this.material = material;
        this.anioEdicion = anioEdicion;
        this.imagenUrl = imagenUrl;
        this.liga = liga;
        this.equipo = equipo;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nombre;
        private String marca;
        private String descripcion;
        private BigDecimal precio;
        private Integer stock;
        private String talla;
        private String material;
        private Integer anioEdicion;
        private String imagenUrl;
        private Liga liga;
        private Equipo equipo;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder nombre(String nombre) { this.nombre = nombre; return this; }
        public Builder marca(String marca) { this.marca = marca; return this; }
        public Builder descripcion(String descripcion) { this.descripcion = descripcion; return this; }
        public Builder precio(BigDecimal precio) { this.precio = precio; return this; }
        public Builder stock(Integer stock) { this.stock = stock; return this; }
        public Builder talla(String talla) { this.talla = talla; return this; }
        public Builder material(String material) { this.material = material; return this; }
        public Builder anioEdicion(Integer anioEdicion) { this.anioEdicion = anioEdicion; return this; }
        public Builder imagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; return this; }
        public Builder liga(Liga liga) { this.liga = liga; return this; }
        public Builder equipo(Equipo equipo) { this.equipo = equipo; return this; }

        public Balon build() {
            return new Balon(id, nombre, marca, descripcion, precio, stock, talla, material, anioEdicion, imagenUrl, liga, equipo);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getTalla() { return talla; }
    public void setTalla(String talla) { this.talla = talla; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public Integer getAnioEdicion() { return anioEdicion; }
    public void setAnioEdicion(Integer anioEdicion) { this.anioEdicion = anioEdicion; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Liga getLiga() { return liga; }
    public void setLiga(Liga liga) { this.liga = liga; }

    public Equipo getEquipo() { return equipo; }
    public void setEquipo(Equipo equipo) { this.equipo = equipo; }
}
