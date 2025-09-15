# syntax=docker/dockerfile:1

# --- Stage 1: build với Maven wrapper ---
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# copy wrapper và pom trước để cache dependency
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw -q -DskipTests dependency:go-offline

# copy src rồi build
COPY src src
RUN ./mvnw -q -DskipTests clean package

# --- Stage 2: runtime JRE nhẹ ---
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# (tuỳ chọn) chạy user không phải root
RUN useradd -m spring
USER spring

# copy JAR từ stage build
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=prod

# Render cấp biến PORT khi chạy -> map vào Spring Boot
CMD ["sh","-c","java -Dserver.port=${PORT:-8080} -jar app.jar"]
