package com.nba.hoopstore.controller;

import com.nba.hoopstore.dto.request.CreateOrderRequest;
import com.nba.hoopstore.dto.response.PedidoResponseDTO;
import com.nba.hoopstore.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponseDTO> createOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.createOrder(userDetails.getUsername(), request));
    }

    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(pedidoService.getOrdersByUser(userDetails.getUsername()));
    }
}
