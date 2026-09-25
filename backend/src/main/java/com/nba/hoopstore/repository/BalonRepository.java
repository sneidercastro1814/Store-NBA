package com.nba.hoopstore.repository;

import com.nba.hoopstore.entity.Balon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BalonRepository extends JpaRepository<Balon, Long> {
    List<Balon> findByLigaId(Long ligaId);
    List<Balon> findByEquipoId(Long equipoId);
    List<Balon> findByAnioEdicion(Integer anioEdicion);

    @Query("SELECT b FROM Balon b WHERE " +
           "(:ligaId IS NULL OR b.liga.id = :ligaId) AND " +
           "(:equipoId IS NULL OR b.equipo.id = :equipoId) AND " +
           "(:anio IS NULL OR b.anioEdicion = :anio) AND " +
           "(:marca IS NULL OR LOWER(b.marca) = LOWER(:marca))")
    List<Balon> findWithFilters(
            @Param("ligaId") Long ligaId,
            @Param("equipoId") Long equipoId,
            @Param("anio") Integer anio,
            @Param("marca") String marca
    );
}
