package com.nba.hoopstore.dto.response;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String nombre;
    private String email;
    private String rol;

    public AuthResponse() {}

    public AuthResponse(String token, String type, Long id, String nombre, String email, String rol) {
        this.token = token;
        this.type = type != null ? type : "Bearer";
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String nombre;
        private String email;
        private String rol;

        public Builder token(String token) { this.token = token; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder id(Long id) { this.id = id; return this; }
        public Builder nombre(String nombre) { this.nombre = nombre; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder rol(String rol) { this.rol = rol; return this; }

        public AuthResponse build() {
            return new AuthResponse(token, type, id, nombre, email, rol);
        }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
