package com.master.codegenerator.controller;

import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.reactGenerator.ReactGenerator;
import com.master.codegenerator.springGenerator.SpringGenerator;
import com.master.codegenerator.utils.GeneratorUtils;
import com.master.codegenerator.utils.ZipDirectory;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class GenerateCodeFile {
    private final ExecutorService executor = Executors.newFixedThreadPool(2);

    private final MeterRegistry meterRegistry;
    private final Timer springGenerationTimer;
    private final Timer reactGenerationTimer;
    private final Counter successCounter;
    private final Counter errorCounter;

    private double currentSpringDuration = 0.0;
    private double currentReactDuration = 0.0;
    private final Gauge springIndividualMeasurements;
    private final Gauge reactIndividualMeasurements;

    @Autowired
    public GenerateCodeFile(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.springGenerationTimer = Timer.builder("generation_spring_time")
                .description("Time taken to generate Spring application")
                .publishPercentiles(0.5, 0.95, 0.99)
                .publishPercentileHistogram()
                .register(meterRegistry);

        this.reactGenerationTimer = Timer.builder("generation_react_time")
                .description("Time taken to generate React application")
                .publishPercentiles(0.5, 0.95, 0.99)
                .publishPercentileHistogram()
                .register(meterRegistry);

        this.successCounter = Counter.builder("generation.success.count")
                .description("Number of successful generation tasks")
                .register(meterRegistry);

        this.errorCounter = Counter.builder("generation.error.count")
                .description("Number of failed generation tasks")
                .register(meterRegistry);

        this.springIndividualMeasurements = Gauge.builder("generation_spring_individual",  () -> currentSpringDuration)
                .description("Individual spring generation measurements")
                .register(meterRegistry);

        this.reactIndividualMeasurements = Gauge.builder("generation_react_individual",  () -> currentReactDuration)
                .description("Individual react generation measurements")
                .register(meterRegistry);
    }

    @PostMapping("/download")
    public ResponseEntity<FileSystemResource> downloadZip(@RequestBody SchemaData data) throws IOException, InterruptedException, ExecutionException {
        if (data.getDatabaseName() == null || data.getDatabaseName().isEmpty()) {
            data.setDatabaseName(GeneratorUtils.DEFAULT_SCHEMA_NAME);
        }
        String sourceDirPath = GeneratorUtils.getSchemaRootFolderPath(data.getDatabaseName());
        String zipFilePath = "GeneratedApps" + File.separator + data.getDatabaseName() + "Project" + ".zip";

        long systemStartTime = System.nanoTime();
        Timer.Sample springSample = Timer.start(meterRegistry);
        CompletableFuture<Void> springTask = CompletableFuture.runAsync(() -> {
            try {
                long startTime = System.nanoTime();
                new SpringGenerator().generateSpringApplication(data.getTables(), data.getMapOfTableRelationships(), data.getDatabaseName());
                long endTime = System.nanoTime();

                double duration = (endTime - startTime) / 1_000_000.0; // Konverzija u milisekunde
                currentSpringDuration = duration;
                springSample.stop(springGenerationTimer);

                System.out.println("Spring generation completed in " + duration + " ms");
//                springIndividualMeasurements.set(duration);
            } catch (Exception e) {
                errorCounter.increment();
                throw new RuntimeException("Failed to generate Spring application", e);
            }
        });

        Timer.Sample reactSample = Timer.start(meterRegistry);
        CompletableFuture<Void> reactTask = CompletableFuture.runAsync(() -> {
            try {
                long startTime = System.nanoTime();
                new ReactGenerator().generateReactApplication(data.getTables(), data.getMapOfTableRelationships(), data.getDatabaseName());
                long endTime = System.nanoTime();
                double duration = (endTime - startTime) / 1_000_000.0; // Konverzija u milisekunde
                currentReactDuration = duration;
                reactSample.stop(reactGenerationTimer);

                System.out.println("React generation completed in " + duration + " ms");
            } catch (Exception e) {
                errorCounter.increment();
                throw new RuntimeException("Failed to generate React application", e);
            }
        });

        CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(springTask, reactTask);
        combinedFuture.get();
        long systemEndTime = System.nanoTime();

        double systemDuration = (systemEndTime - systemStartTime) / 1_000_000.0; // Konverzija u milisekunde
        System.out.println("System generation completed in " + systemDuration + " ms");

        File zipFile = new File(zipFilePath);
        if (!zipFile.exists()) zipFile.createNewFile();

        ZipDirectory.zipDirectory(sourceDirPath, zipFilePath);

        Path path = Paths.get(zipFilePath);
        FileSystemResource resource = new FileSystemResource(path.toFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + data.getDatabaseName() + ".zip");

        ResponseEntity<FileSystemResource> response = ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

        successCounter.increment();

//         Optional: Cleanup after zipping
         try {
             FileUtils.deleteDirectory(new File(sourceDirPath));
             System.out.println("Directory deleted successfully.");
         } catch (IOException e) {
             System.err.println("Failed to delete directory: " + e.getMessage());
         }

        return response;
    }
}