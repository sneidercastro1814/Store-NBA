package com.nba.hoopstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class OrderItemRequest {
    @NotNull(message = "El id del balón es obligatorio")
    private Long balonId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad mínima es 1")
    private Integer cantidad;

    public OrderItemRequest() {}

    public OrderItemRequest(Long balonId, Integer cantidad) {
        this.balonId = balonId;
        this.cantidad = cantidad;
    }

    public Long getBalonId() { return balonId; }
    public void setBalonId(Long balonId) { this.balonId = balonId; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
