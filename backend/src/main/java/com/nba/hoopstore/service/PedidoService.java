package com.nba.hoopstore.service;

import com.nba.hoopstore.dto.request.CreateOrderRequest;
import com.nba.hoopstore.dto.request.OrderItemRequest;
import com.nba.hoopstore.dto.response.PedidoResponseDTO;
import com.nba.hoopstore.entity.*;
import com.nba.hoopstore.exception.BadRequestException;
import com.nba.hoopstore.exception.ResourceNotFoundException;
import com.nba.hoopstore.repository.BalonRepository;
import com.nba.hoopstore.repository.PedidoRepository;
import com.nba.hoopstore.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final BalonRepository balonRepository;
    private final UsuarioRepository usuarioRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         BalonRepository balonRepository,
                         UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.balonRepository = balonRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public PedidoResponseDTO createOrder(String userEmail, CreateOrderRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + userEmail));

        BigDecimal total = BigDecimal.ZERO;
        List<DetallePedido> detalles = new ArrayList<>();

        Pedido pedido = Pedido.builder()
                .usuario(usuario)
                .direccionEnvio(request.getDireccionEnvio())
                .metodoPago(request.getMetodoPago() != null ? request.getMetodoPago() : "Tarjeta de Crédito")
                .estado(EstadoPedido.PAGADO)
                .total(BigDecimal.ZERO)
                .build();

        for (OrderItemRequest item : request.getItems()) {
            Balon balon = balonRepository.findById(item.getBalonId())
                    .orElseThrow(() -> new ResourceNotFoundException("Balón no encontrado con id: " + item.getBalonId()));

            if (balon.getStock() < item.getCantidad()) {
                throw new BadRequestException("Stock insuficiente para el balón: " + balon.getNombre() + ". Disponible: " + balon.getStock());
            }

            // Descontar stock
            balon.setStock(balon.getStock() - item.getCantidad());
            balonRepository.save(balon);

            BigDecimal subtotal = balon.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad()));
            total = total.add(subtotal);

            DetallePedido detalle = DetallePedido.builder()
                    .pedido(pedido)
                    .balon(balon)
                    .cantidad(item.getCantidad())
                    .precioUnitario(balon.getPrecio())
                    .subtotal(subtotal)
                    .build();

            detalles.add(detalle);
        }

        pedido.setTotal(total);
        pedido.setDetalles(detalles);

        Pedido saved = pedidoRepository.save(pedido);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<PedidoResponseDTO> getOrdersByUser(String userEmail) {
        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + userEmail));

        return pedidoRepository.findByUsuarioIdOrderByFechaPedidoDesc(usuario.getId())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private PedidoResponseDTO mapToDTO(Pedido p) {
        return PedidoResponseDTO.builder()
                .id(p.getId())
                .usuarioId(p.getUsuario().getId())
                .usuarioEmail(p.getUsuario().getEmail())
                .usuarioNombre(p.getUsuario().getNombre())
                .fechaPedido(p.getFechaPedido())
                .total(p.getTotal())
                .estado(p.getEstado().name())
                .direccionEnvio(p.getDireccionEnvio())
                .metodoPago(p.getMetodoPago())
                .detalles(p.getDetalles().stream().map(d -> PedidoResponseDTO.DetallePedidoDTO.builder()
                        .id(d.getId())
                        .balonId(d.getBalon().getId())
                        .balonNombre(d.getBalon().getNombre())
                        .balonImagen(d.getBalon().getImagenUrl())
                        .cantidad(d.getCantidad())
                        .precioUnitario(d.getPrecioUnitario())
                        .subtotal(d.getSubtotal())
                        .build()
                ).collect(Collectors.toList()))
                .build();
    }
}
