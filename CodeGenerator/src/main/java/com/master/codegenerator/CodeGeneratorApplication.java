package com.master.codegenerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CodeGeneratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeGeneratorApplication.class, args);
    }

    @Bean
    MeterRegistryCustomizer<?> metricsCommonTags() {
        return registry -> registry.config().commonTags("application", "MyApp");
    }
}
