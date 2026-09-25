package com.nba.hoopstore.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponseDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioEmail;
    private String usuarioNombre;
    private LocalDateTime fechaPedido;
    private BigDecimal total;
    private String estado;
    private String direccionEnvio;
    private String metodoPago;
    private List<DetallePedidoDTO> detalles;

    public PedidoResponseDTO() {}

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long usuarioId;
        private String usuarioEmail;
        private String usuarioNombre;
        private LocalDateTime fechaPedido;
        private BigDecimal total;
        private String estado;
        private String direccionEnvio;
        private String metodoPago;
        private List<DetallePedidoDTO> detalles;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder usuarioId(Long usuarioId) { this.usuarioId = usuarioId; return this; }
        public Builder usuarioEmail(String usuarioEmail) { this.usuarioEmail = usuarioEmail; return this; }
        public Builder usuarioNombre(String usuarioNombre) { this.usuarioNombre = usuarioNombre; return this; }
        public Builder fechaPedido(LocalDateTime fechaPedido) { this.fechaPedido = fechaPedido; return this; }
        public Builder total(BigDecimal total) { this.total = total; return this; }
        public Builder estado(String estado) { this.estado = estado; return this; }
        public Builder direccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; return this; }
        public Builder metodoPago(String metodoPago) { this.metodoPago = metodoPago; return this; }
        public Builder detalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; return this; }

        public PedidoResponseDTO build() {
            PedidoResponseDTO dto = new PedidoResponseDTO();
            dto.id = this.id;
            dto.usuarioId = this.usuarioId;
            dto.usuarioEmail = this.usuarioEmail;
            dto.usuarioNombre = this.usuarioNombre;
            dto.fechaPedido = this.fechaPedido;
            dto.total = this.total;
            dto.estado = this.estado;
            dto.direccionEnvio = this.direccionEnvio;
            dto.metodoPago = this.metodoPago;
            dto.detalles = this.detalles;
            return dto;
        }
    }

    public static class DetallePedidoDTO {
        private Long id;
        private Long balonId;
        private String balonNombre;
        private String balonImagen;
        private Integer cantidad;
        private BigDecimal precioUnitario;
        private BigDecimal subtotal;

        public DetallePedidoDTO() {}

        public static DetalleBuilder builder() {
            return new DetalleBuilder();
        }

        public static class DetalleBuilder {
            private Long id;
            private Long balonId;
            private String balonNombre;
            private String balonImagen;
            private Integer cantidad;
            private BigDecimal precioUnitario;
            private BigDecimal subtotal;

            public DetalleBuilder id(Long id) { this.id = id; return this; }
            public DetalleBuilder balonId(Long balonId) { this.balonId = balonId; return this; }
            public DetalleBuilder balonNombre(String balonNombre) { this.balonNombre = balonNombre; return this; }
            public DetalleBuilder balonImagen(String balonImagen) { this.balonImagen = balonImagen; return this; }
            public DetalleBuilder cantidad(Integer cantidad) { this.cantidad = cantidad; return this; }
            public DetalleBuilder precioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; return this; }
            public DetalleBuilder subtotal(BigDecimal subtotal) { this.subtotal = subtotal; return this; }

            public DetallePedidoDTO build() {
                DetallePedidoDTO dto = new DetallePedidoDTO();
                dto.id = this.id;
                dto.balonId = this.balonId;
                dto.balonNombre = this.balonNombre;
                dto.balonImagen = this.balonImagen;
                dto.cantidad = this.cantidad;
                dto.precioUnitario = this.precioUnitario;
                dto.subtotal = this.subtotal;
                return dto;
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getBalonId() { return balonId; }
        public void setBalonId(Long balonId) { this.balonId = balonId; }

        public String getBalonNombre() { return balonNombre; }
        public void setBalonNombre(String balonNombre) { this.balonNombre = balonNombre; }

        public String getBalonImagen() { return balonImagen; }
        public void setBalonImagen(String balonImagen) { this.balonImagen = balonImagen; }

        public Integer getCantidad() { return cantidad; }
        public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

        public BigDecimal getPrecioUnitario() { return precioUnitario; }
        public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }

        public BigDecimal getSubtotal() { return subtotal; }
        public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getUsuarioEmail() { return usuarioEmail; }
    public void setUsuarioEmail(String usuarioEmail) { this.usuarioEmail = usuarioEmail; }

    public String getUsuarioNombre() { return usuarioNombre; }
    public void setUsuarioNombre(String usuarioNombre) { this.usuarioNombre = usuarioNombre; }

    public LocalDateTime getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDateTime fechaPedido) { this.fechaPedido = fechaPedido; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public List<DetallePedidoDTO> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedidoDTO> detalles) { this.detalles = detalles; }
}
