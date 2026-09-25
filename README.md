# 🏀 HoopStore — Full-Stack Basketball E-Commerce

Plataforma de comercio electrónico de balones de baloncesto (NBA, FIBA, EuroLeague) desarrollada con **Spring Boot 3** en el Backend y **Angular 19** en el Frontend, con diseño inspirado en la estética oficial de la NBA.

---

## 📁 Estructura del Proyecto

```text
hoopstore/
├── backend/                  # API REST con Spring Boot 3 (Java 17/21)
│   ├── src/main/java/com/nba/hoopstore/
│   │   ├── config/           # DataInitializer (carga balones NBA, FIBA, EuroLeague)
│   │   ├── controller/       # Auth, Balones, Ligas y Pedidos
│   │   ├── dto/              # DTOs de Request y Response
│   │   ├── entity/           # Entidades JPA (Usuario, Balón, Liga, Equipo, Pedido)
│   │   ├── exception/        # GlobalExceptionHandler (@RestControllerAdvice)
│   │   ├── repository/       # Repositorios Spring Data JPA
│   │   ├── security/         # Spring Security 6, JWT Filter, BCrypt, CORS
│   │   └── service/          # Lógica de negocio (Auth, Catálogo, Checkout)
│   ├── Dockerfile            # Multi-stage build con Eclipse Temurin 21 Alpine
│   └── pom.xml
├── frontend/                 # SPA con Angular 19 Standalone Components & Signals
│   ├── src/app/
│   │   ├── core/             # Servicios reactivos, Models, AuthGuard & Interceptor
│   │   ├── features/         # Catálogo con filtros dinámicos, Checkout, Auth & Carrito
│   │   └── shared/           # Navbar y Footer con temática oficial NBA
│   └── styles.scss           # Paleta oficial NBA (#006BB6, #C9082A, Dark Navy)
├── docker-compose.yml        # Orquestación de PostgreSQL 16 y Spring Boot
└── README.md
```

---

## 🚀 Puesta en Marcha Rápida

### Opción 1: Desarrollo Local

#### 1. Iniciar el Backend (Spring Boot):
> El backend cuenta con una base de datos **H2 en memoria** preconfigurada para desarrollo local sin dependencias externas, y soporte para **PostgreSQL** mediante variables de entorno.

```bash
cd backend
mvn spring-boot:run
```
* **API REST:** `http://localhost:8080/api`
* **Consola H2:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:hoopstoredb`, Usuario: `sa`, Contraseña: vacía)
* **Datos iniciales:** Se precargan automáticamente 11 balones oficiales (Wilson NBA Horween, Molten FIBA World Cup, Spalding EuroLeague, etc.), ligas, equipos y usuarios.

#### 2. Iniciar el Frontend (Angular):
```bash
cd frontend
npm start
```
* Abre tu navegador en: `http://localhost:4200`

---

### Opción 2: Ejecución con Docker Compose

Para desplegar el backend y la base de datos PostgreSQL 16 en contenedores:

```bash
docker compose up --build
```

---

## 🔐 Cuentas de Prueba Pre-cargadas

| Rol | Correo Electrónico | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Cliente / Fan** | `fan@nba.com` | `Hoops2024!` | Realizar compras, ver catálogo, pedidos |
| **Administrador** | `admin@hoopstore.com` | `Admin1234!` | Gestión de productos, ligas y equipos |

*(En la pantalla de login del frontend tienes botones de acceso rápido de un clic para ambas cuentas).*

---

## 🎨 Paleta de Colores Oficial NBA

* **Azul Oficial NBA:** `#006BB6`
* **Rojo Oficial NBA:** `#C9082A`
* **Blanco / Texto:** `#FFFFFF` / `#F8FAFC`
* **Fondo Cancha Oscuro:** `#070B14` y `#121A2D`
* **Acento Cuero / Balón:** `#D9822B`

---

## ☁️ Despliegue en Railway

1. **Crear Servicio PostgreSQL en Railway:**
   - En tu panel de Railway, añade una base de datos **PostgreSQL**.
2. **Desplegar el Backend:**
   - Vincula el repositorio de GitHub y selecciona el directorio raíz `/backend`.
   - Railway detectará automáticamente el `Dockerfile`.
   - Configura las variables de entorno en Railway:
     - `SPRING_DATASOURCE_URL`: `jdbc:${{Postgres.DATABASE_URL}}`
     - `SPRING_DATASOURCE_DRIVER`: `org.postgresql.Driver`
     - `SPRING_JPA_DIALECT`: `org.hibernate.dialect.PostgreSQLDialect`
     - `SPRING_JPA_HIBERNATE_DDL_AUTO`: `update`
     - `APP_JWT_SECRET`: Llave segura de 64 caracteres.
3. **Desplegar el Frontend:**
   - Conecta el directorio `/frontend` a Vercel, Netlify o Railway con comando de build `npm run build` y directorio de salida `dist/frontend/browser`.
