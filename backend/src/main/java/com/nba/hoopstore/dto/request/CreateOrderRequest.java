package com.nba.hoopstore.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class CreateOrderRequest {

    @NotBlank(message = "La dirección de envío es obligatoria")
    private String direccionEnvio;

    private String metodoPago;

    @NotEmpty(message = "El pedido debe contener al menos un producto")
    @Valid
    private List<OrderItemRequest> items;

    public CreateOrderRequest() {}

    public CreateOrderRequest(String direccionEnvio, String metodoPago, List<OrderItemRequest> items) {
        this.direccionEnvio = direccionEnvio;
        this.metodoPago = metodoPago;
        this.items = items;
    }

    public String getDireccionEnvio() { return direccionEnvio; }
    public void setDireccionEnvio(String direccionEnvio) { this.direccionEnvio = direccionEnvio; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public List<OrderItemRequest> getItems() { return items; }
    public void setItems(List<OrderItemRequest> items) { this.items = items; }
}
