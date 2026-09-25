package com.nba.hoopstore.config;

import com.nba.hoopstore.entity.*;
import com.nba.hoopstore.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UsuarioRepository usuarioRepository;
    private final LigaRepository ligaRepository;
    private final EquipoRepository equipoRepository;
    private final BalonRepository balonRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository,
                           LigaRepository ligaRepository,
                           EquipoRepository equipoRepository,
                           BalonRepository balonRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.ligaRepository = ligaRepository;
        this.equipoRepository = equipoRepository;
        this.balonRepository = balonRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() > 0) {
            log.info("Datos ya inicializados.");
            return;
        }

        log.info("Inicializando catálogo HoopStore NBA & Baloncesto...");

        // 1. Usuarios de prueba
        Usuario admin = Usuario.builder()
                .nombre("Admin HoopStore")
                .email("admin@hoopstore.com")
                .password(passwordEncoder.encode("Admin1234!"))
                .rol(Rol.ROLE_ADMIN)
                .build();

        Usuario customer = Usuario.builder()
                .nombre("LeBron Fan")
                .email("fan@nba.com")
                .password(passwordEncoder.encode("Hoops2024!"))
                .rol(Rol.ROLE_USER)
                .build();

        usuarioRepository.saveAll(List.of(admin, customer));

        // 2. Ligas
        Liga nba = Liga.builder()
                .nombre("NBA")
                .paisRegion("Estados Unidos")
                .logoUrl("https://cdn.nba.com/logos/leagues/L/nba.svg")
                .build();

        Liga fiba = Liga.builder()
                .nombre("FIBA")
                .paisRegion("Internacional")
                .logoUrl("https://upload.wikimedia.org/wikipedia/commons/4/4e/FIBA_logo.svg")
                .build();

        Liga euroleague = Liga.builder()
                .nombre("EuroLeague")
                .paisRegion("Europa")
                .logoUrl("https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/EuroLeague_logo.svg/1200px-EuroLeague_logo.svg.png")
                .build();

        Liga wnba = Liga.builder()
                .nombre("WNBA")
                .paisRegion("Estados Unidos")
                .logoUrl("https://cdn.wnba.com/sites/4/2021/04/WNBA_Logo_Primary_RGB.svg")
                .build();

        ligaRepository.saveAll(List.of(nba, fiba, euroleague, wnba));

        // 3. Equipos
        Equipo lakers = Equipo.builder()
                .nombre("Los Angeles Lakers")
                .ciudad("Los Angeles")
                .conferencia("Oeste")
                .logoUrl("https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg")
                .liga(nba)
                .build();

        Equipo celtics = Equipo.builder()
                .nombre("Boston Celtics")
                .ciudad("Boston")
                .conferencia("Este")
                .logoUrl("https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg")
                .liga(nba)
                .build();

        Equipo warriors = Equipo.builder()
                .nombre("Golden State Warriors")
                .ciudad("San Francisco")
                .conferencia("Oeste")
                .logoUrl("https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg")
                .liga(nba)
                .build();

        Equipo bulls = Equipo.builder()
                .nombre("Chicago Bulls")
                .ciudad("Chicago")
                .conferencia("Este")
                .logoUrl("https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg")
                .liga(nba)
                .build();

        Equipo realMadrid = Equipo.builder()
                .nombre("Real Madrid Baloncesto")
                .ciudad("Madrid")
                .conferencia("EuroLeague")
                .logoUrl("https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png")
                .liga(euroleague)
                .build();

        equipoRepository.saveAll(List.of(lakers, celtics, warriors, bulls, realMadrid));

        // 4. Balones
        Balon b1 = Balon.builder()
                .nombre("Wilson Official NBA Game Ball")
                .marca("Wilson")
                .descripcion("El balón de juego oficial de la NBA fabricado en 100% cuero genuino Horween. Utilizado por las superestrellas en cada partido oficial.")
                .precio(new BigDecimal("199.99"))
                .stock(25)
                .talla("Talla 7 (Oficial)")
                .material("Cuero Genuino Horween")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .build();

        Balon b2 = Balon.builder()
                .nombre("Wilson NBA Authentic Series Indoor/Outdoor")
                .marca("Wilson")
                .descripcion("La cubierta Pure Feel proporciona una sensación de nivel profesional y durabilidad excepcional en cualquier superficie.")
                .precio(new BigDecimal("69.95"))
                .stock(40)
                .talla("Talla 7 (Oficial)")
                .material("Cuero Composite Pure Feel")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .build();

        Balon b3 = Balon.builder()
                .nombre("Wilson NBA City Edition - Los Angeles Lakers")
                .marca("Wilson")
                .descripcion("Edición especial Lakers con los colores púrpura y oro legendarios y el logotipo oficial serigrafiado.")
                .precio(new BigDecimal("49.99"))
                .stock(30)
                .talla("Talla 7 (Oficial)")
                .material("Composite All-Surface")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .equipo(lakers)
                .build();

        Balon b4 = Balon.builder()
                .nombre("Wilson NBA City Edition - Boston Celtics")
                .marca("Wilson")
                .descripcion("Celebrando el campeonato número 18 de la franquicia verde con diseño conmemorativo y agarre superior.")
                .precio(new BigDecimal("49.99"))
                .stock(35)
                .talla("Talla 7 (Oficial)")
                .material("Composite All-Surface")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .equipo(celtics)
                .build();

        Balon b5 = Balon.builder()
                .nombre("Wilson NBA Golden State Warriors Tribute")
                .marca("Wilson")
                .descripcion("Diseño emblemático 'The Bay' en azul y amarillo característicos de Stephen Curry y los Warriors.")
                .precio(new BigDecimal("44.95"))
                .stock(20)
                .talla("Talla 7 (Oficial)")
                .material("Composite All-Surface")
                .anioEdicion(2023)
                .imagenUrl("https://images.unsplash.com/photo-1518407613690-d9fc990e795f?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .equipo(warriors)
                .build();

        Balon b6 = Balon.builder()
                .nombre("Wilson NBA Chicago Bulls Retro Edition")
                .marca("Wilson")
                .descripcion("Homenaje a la era dorada de los 90s con acabado en rojo intenso y negro mate de los Bulls.")
                .precio(new BigDecimal("45.00"))
                .stock(28)
                .talla("Talla 7 (Oficial)")
                .material("Composite High-Grip")
                .anioEdicion(2023)
                .imagenUrl("https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=800&q=80")
                .liga(nba)
                .equipo(bulls)
                .build();

        Balon b7 = Balon.builder()
                .nombre("Molten BG5000 FIBA World Cup Official")
                .marca("Molten")
                .descripcion("El balón insignia del baloncesto internacional y Juegos Olímpicos. Cuero natural premium de 12 paneles con agarre hidrófugo.")
                .precio(new BigDecimal("185.00"))
                .stock(18)
                .talla("Talla 7 (Oficial)")
                .material("Cuero Natural Premium")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80")
                .liga(fiba)
                .build();

        Balon b8 = Balon.builder()
                .nombre("Molten BG3800 FIBA Approved Indoor/Outdoor")
                .marca("Molten")
                .descripcion("Balón de entrenamiento y competición homologado por la FIBA con alta durabilidad y canales profundos.")
                .precio(new BigDecimal("59.50"))
                .stock(32)
                .talla("Talla 7 (Oficial)")
                .material("Cuero Sintético de Alta Densidad")
                .anioEdicion(2023)
                .imagenUrl("https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80")
                .liga(fiba)
                .build();

        Balon b9 = Balon.builder()
                .nombre("Spalding TF-1000 Legacy EuroLeague Official")
                .marca("Spalding")
                .descripcion("El balón de las noches mágicas europeas. Microfibra ZK con tecnología de control de humedad avanzada.")
                .precio(new BigDecimal("119.00"))
                .stock(22)
                .talla("Talla 7 (Oficial)")
                .material("Microfibra ZK Composite")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80")
                .liga(euroleague)
                .build();

        Balon b10 = Balon.builder()
                .nombre("Spalding Real Madrid EuroLeague Edition")
                .marca("Spalding")
                .descripcion("Edición oficial del club más laureado de Europa con escudo serigrafiado y agarre especial para pistas cubiertas.")
                .precio(new BigDecimal("55.00"))
                .stock(24)
                .talla("Talla 7 (Oficial)")
                .material("Composite Indoor")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80")
                .liga(euroleague)
                .equipo(realMadrid)
                .build();

        Balon b11 = Balon.builder()
                .nombre("Wilson WNBA Official Game Ball")
                .marca("Wilson")
                .descripcion("El balón oficial de la WNBA con diseño en blanco y naranja fuego. Cubierta Micro-Touch para máxima suavidad.")
                .precio(new BigDecimal("129.99"))
                .stock(15)
                .talla("Talla 6 (Oficial Femenil)")
                .material("Micro-Touch Composite")
                .anioEdicion(2024)
                .imagenUrl("https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80")
                .liga(wnba)
                .build();

        balonRepository.saveAll(List.of(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11));

        log.info("Catálogo inicializado con éxito: {} balones, {} ligas y {} usuarios.",
                balonRepository.count(), ligaRepository.count(), usuarioRepository.count());
    }
}
