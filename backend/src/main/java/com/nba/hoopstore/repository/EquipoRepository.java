package com.nba.hoopstore.repository;

import com.nba.hoopstore.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {
    List<Equipo> findByLigaId(Long ligaId);
    Optional<Equipo> findByNombre(String nombre);
}
