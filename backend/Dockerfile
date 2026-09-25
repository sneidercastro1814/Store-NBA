# ----------------------------------------------------
# Etapa 1: Build (Maven + OpenJDK 21)
# ----------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cachear dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Compilar
COPY src ./src
RUN mvn clean package -DskipTests

# ----------------------------------------------------
# Etapa 2: Runtime ligero
# ----------------------------------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/target/*.jar app.jar

ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
