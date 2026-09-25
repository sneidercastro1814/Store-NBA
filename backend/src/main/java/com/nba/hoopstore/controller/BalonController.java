package com.nba.hoopstore.controller;

import com.nba.hoopstore.dto.response.BalonResponseDTO;
import com.nba.hoopstore.entity.Balon;
import com.nba.hoopstore.service.BalonService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/balones")
public class BalonController {

    private final BalonService balonService;

    public BalonController(BalonService balonService) {
        this.balonService = balonService;
    }

    @GetMapping
    public ResponseEntity<List<BalonResponseDTO>> getAll(
            @RequestParam(required = false) Long ligaId,
            @RequestParam(required = false) Long equipoId,
            @RequestParam(required = false) Integer anio,
            @RequestParam(required = false) String marca
    ) {
        return ResponseEntity.ok(balonService.getAll(ligaId, equipoId, anio, marca));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BalonResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(balonService.getById(id));
    }

    @PostMapping
    public ResponseEntity<BalonResponseDTO> create(
            @Valid @RequestBody Balon balon,
            @RequestParam Long ligaId,
            @RequestParam(required = false) Long equipoId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(balonService.create(balon, ligaId, equipoId));
    }
}
