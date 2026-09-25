package com.nba.hoopstore.dto.response;

import java.math.BigDecimal;

public class BalonResponseDTO {
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

    // Liga data
    private Long ligaId;
    private String ligaNombre;
    private String ligaLogo;

    // Equipo data (opcional)
    private Long equipoId;
    private String equipoNombre;
    private String equipoCiudad;
    private String equipoLogo;

    public BalonResponseDTO() {}

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
        private Long ligaId;
        private String ligaNombre;
        private String ligaLogo;
        private Long equipoId;
        private String equipoNombre;
        private String equipoCiudad;
        private String equipoLogo;

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
        public Builder ligaId(Long ligaId) { this.ligaId = ligaId; return this; }
        public Builder ligaNombre(String ligaNombre) { this.ligaNombre = ligaNombre; return this; }
        public Builder ligaLogo(String ligaLogo) { this.ligaLogo = ligaLogo; return this; }
        public Builder equipoId(Long equipoId) { this.equipoId = equipoId; return this; }
        public Builder equipoNombre(String equipoNombre) { this.equipoNombre = equipoNombre; return this; }
        public Builder equipoCiudad(String equipoCiudad) { this.equipoCiudad = equipoCiudad; return this; }
        public Builder equipoLogo(String equipoLogo) { this.equipoLogo = equipoLogo; return this; }

        public BalonResponseDTO build() {
            BalonResponseDTO dto = new BalonResponseDTO();
            dto.id = this.id;
            dto.nombre = this.nombre;
            dto.marca = this.marca;
            dto.descripcion = this.descripcion;
            dto.precio = this.precio;
            dto.stock = this.stock;
            dto.talla = this.talla;
            dto.material = this.material;
            dto.anioEdicion = this.anioEdicion;
            dto.imagenUrl = this.imagenUrl;
            dto.ligaId = this.ligaId;
            dto.ligaNombre = this.ligaNombre;
            dto.ligaLogo = this.ligaLogo;
            dto.equipoId = this.equipoId;
            dto.equipoNombre = this.equipoNombre;
            dto.equipoCiudad = this.equipoCiudad;
            dto.equipoLogo = this.equipoLogo;
            return dto;
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

    public Long getLigaId() { return ligaId; }
    public void setLigaId(Long ligaId) { this.ligaId = ligaId; }

    public String getLigaNombre() { return ligaNombre; }
    public void setLigaNombre(String ligaNombre) { this.ligaNombre = ligaNombre; }

    public String getLigaLogo() { return ligaLogo; }
    public void setLigaLogo(String ligaLogo) { this.ligaLogo = ligaLogo; }

    public Long getEquipoId() { return equipoId; }
    public void setEquipoId(Long equipoId) { this.equipoId = equipoId; }

    public String getEquipoNombre() { return equipoNombre; }
    public void setEquipoNombre(String equipoNombre) { this.equipoNombre = equipoNombre; }

    public String getEquipoCiudad() { return equipoCiudad; }
    public void setEquipoCiudad(String equipoCiudad) { this.equipoCiudad = equipoCiudad; }

    public String getEquipoLogo() { return equipoLogo; }
    public void setEquipoLogo(String equipoLogo) { this.equipoLogo = equipoLogo; }
}
