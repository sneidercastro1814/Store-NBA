package com.nba.hoopstore.controller;

import com.nba.hoopstore.entity.Equipo;
import com.nba.hoopstore.entity.Liga;
import com.nba.hoopstore.repository.EquipoRepository;
import com.nba.hoopstore.repository.LigaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ligas")
public class LigaController {

    private final LigaRepository ligaRepository;
    private final EquipoRepository equipoRepository;

    public LigaController(LigaRepository ligaRepository, EquipoRepository equipoRepository) {
        this.ligaRepository = ligaRepository;
        this.equipoRepository = equipoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Liga>> getLigas() {
        return ResponseEntity.ok(ligaRepository.findAll());
    }

    @GetMapping("/{id}/equipos")
    public ResponseEntity<List<Equipo>> getEquiposByLiga(@PathVariable Long id) {
        return ResponseEntity.ok(equipoRepository.findByLigaId(id));
    }
}
