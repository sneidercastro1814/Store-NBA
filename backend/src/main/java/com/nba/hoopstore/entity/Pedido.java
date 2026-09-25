package com.nba.hoopstore.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_pedido", updatable = false)
    private LocalDateTime fechaPedido;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoPedido estado;

    @Column(name = "direccion_envio", nullable = false)
    private String direccionEnvio;

    @Column(name = "metodo_pago")
    private String metodoPago;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();

    public Pedido() {}

    public Pedido(Long id, Usuario usuario, LocalDateTime fechaPedido, BigDecimal total,
                  EstadoPedido estado, String direccionEnvio, String metodoPago, List<DetallePedido> detalles) {
        this.id = id;
        this.usuario = usuario;
        this.fechaPedido = fechaPedido;
        this.total = total;
        this.estado = estado;
        this.direccionEnvio = direccionEnvio;
        this.metodoPago = metodoPago;
        if (detalles != null) this.detalles = detalles;
    }

    @PrePersist
    public void prePersist() {
        this.fechaPedido = LocalDateTime.now();
        if (this.estado == null) {
            this.estado = EstadoPedido.PENDIENTE;
        }
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Usuario usuario;
        private LocalDateTime fechaPedido;
        private BigDecimal total;
        private EstadoPedido estado;
        private String direccionEnvio;
        private String metodoPago;
        private List<DetallePedido> detalles = new ArrayList<>();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder usuario(Usuario usuario) { this.usuario = usuario; return this; }
        public Builder fechaPedido(LocalDateTime fechaPedido) { this.fechaPedido = fechaPedido; return this; }
        public Builder total(BigDecimal total) { this.total = total; return this; }
        public Builder estado(EstadoPedido estado) { this.estado = estado; return this; }
        public Builder direccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; return this; }
        public Builder metodoPago(String metodoPago) { this.metodoPago = metodoPago; return this; }
        public Builder detalles(List<DetallePedido> detalles) { this.detalles = detalles; return this; }

        public Pedido build() {
            return new Pedido(id, usuario, fechaPedido, total, estado, direccionEnvio, metodoPago, detalles);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public LocalDateTime getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDateTime fechaPedido) { this.fechaPedido = fechaPedido; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public EstadoPedido getEstado() { return estado; }
    public void setEstado(EstadoPedido estado) { this.estado = estado; }

    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public List<DetallePedido> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedido> detalles) { this.detalles = detalles; }
}
