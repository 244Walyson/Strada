FROM maven:3.8.7-openjdk-18-slim AS builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

FROM openjdk:18-slim
WORKDIR /app
COPY --from=builder /app/target/notification-service-0.0.1-SNAPSHOT.jar ./
CMD ["java", "-jar", "notification-service-0.0.1-SNAPSHOT.jar"]