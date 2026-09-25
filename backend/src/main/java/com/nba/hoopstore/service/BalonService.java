package com.nba.hoopstore.service;

import com.nba.hoopstore.dto.response.BalonResponseDTO;
import com.nba.hoopstore.entity.Balon;
import com.nba.hoopstore.entity.Equipo;
import com.nba.hoopstore.entity.Liga;
import com.nba.hoopstore.exception.ResourceNotFoundException;
import com.nba.hoopstore.repository.BalonRepository;
import com.nba.hoopstore.repository.EquipoRepository;
import com.nba.hoopstore.repository.LigaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BalonService {

    private final BalonRepository balonRepository;
    private final LigaRepository ligaRepository;
    private final EquipoRepository equipoRepository;

    public BalonService(BalonRepository balonRepository,
                        LigaRepository ligaRepository,
                        EquipoRepository equipoRepository) {
        this.balonRepository = balonRepository;
        this.ligaRepository = ligaRepository;
        this.equipoRepository = equipoRepository;
    }

    @Transactional(readOnly = true)
    public List<BalonResponseDTO> getAll(Long ligaId, Long equipoId, Integer anio, String marca) {
        List<Balon> balones;
        if (ligaId == null && equipoId == null && anio == null && marca == null) {
            balones = balonRepository.findAll();
        } else {
            balones = balonRepository.findWithFilters(ligaId, equipoId, anio, marca);
        }
        return balones.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BalonResponseDTO getById(Long id) {
        Balon balon = balonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Balón no encontrado con id: " + id));
        return mapToDTO(balon);
    }

    @Transactional
    public BalonResponseDTO create(Balon balon, Long ligaId, Long equipoId) {
        Liga liga = ligaRepository.findById(ligaId)
                .orElseThrow(() -> new ResourceNotFoundException("Liga no encontrada con id: " + ligaId));
        balon.setLiga(liga);

        if (equipoId != null) {
            Equipo equipo = equipoRepository.findById(equipoId)
                    .orElseThrow(() -> new ResourceNotFoundException("Equipo no encontrado con id: " + equipoId));
            balon.setEquipo(equipo);
        }

        Balon saved = balonRepository.save(balon);
        return mapToDTO(saved);
    }

    public BalonResponseDTO mapToDTO(Balon balon) {
        BalonResponseDTO.Builder builder = BalonResponseDTO.builder()
                .id(balon.getId())
                .nombre(balon.getNombre())
                .marca(balon.getMarca())
                .descripcion(balon.getDescripcion())
                .precio(balon.getPrecio())
                .stock(balon.getStock())
                .talla(balon.getTalla())
                .material(balon.getMaterial())
                .anioEdicion(balon.getAnioEdicion())
                .imagenUrl(balon.getImagenUrl());

        if (balon.getLiga() != null) {
            builder.ligaId(balon.getLiga().getId())
                   .ligaNombre(balon.getLiga().getNombre())
                   .ligaLogo(balon.getLiga().getLogoUrl());
        }

        if (balon.getEquipo() != null) {
            builder.equipoId(balon.getEquipo().getId())
                   .equipoNombre(balon.getEquipo().getNombre())
                   .equipoCiudad(balon.getEquipo().getCiudad())
                   .equipoLogo(balon.getEquipo().getLogoUrl());
        }

        return builder.build();
    }
}
