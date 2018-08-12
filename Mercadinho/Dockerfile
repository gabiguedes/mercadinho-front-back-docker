FROM openjdk:8-jdk-alpine
WORKDIR /usr/src/app
COPY ./Mercadinho/ .
RUN ./mvnw package -Dmaven.test.skip=true
ENTRYPOINT ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"] 