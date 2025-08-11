package com.master.codegenerator.controller;

import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.reactGenerator.ReactGenerator;
import com.master.codegenerator.springGenerator.SpringGenerator;
import com.master.codegenerator.utils.GeneratorUtils;
import com.master.codegenerator.utils.ZipDirectory;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PreDestroy;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
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

    private final Counter successCounter;
    private final Counter errorCounter;

    @Autowired
    public GenerateCodeFile(MeterRegistry meterRegistry) {
        this.successCounter = Counter.builder("generation.success.count")
                .description("Number of successful generation tasks")
                .register(meterRegistry);

        this.errorCounter = Counter.builder("generation.error.count")
                .description("Number of failed generation tasks")
                .register(meterRegistry);
    }

    @PostMapping("/download")
    public ResponseEntity<FileSystemResource> downloadZip(@RequestBody SchemaData data,
                                                          HttpServletRequest request)
            throws IOException, InterruptedException, ExecutionException {

        if (data.getDatabaseName() == null || data.getDatabaseName().isEmpty()) {
            data.setDatabaseName(GeneratorUtils.DEFAULT_SCHEMA_NAME);
        }

        String sourceDirPath = GeneratorUtils.getSchemaRootFolderPath(data.getDatabaseName());
        String zipFilePath = "GeneratedApps" + File.separator + data.getDatabaseName() + "Project" + ".zip";

        long systemStartTime = System.nanoTime();

        CompletableFuture<Void> springTask = CompletableFuture.runAsync(() -> {
            try {
                long startTime = System.nanoTime();
                if (data.isEnabledBackend()) {
                    new SpringGenerator().generateSpringApplication(
                            data.getTables(),
                            data.getMapOfTableRelationships(),
                            data.getDatabaseName()
                    );
                }
                long endTime = System.nanoTime();
                double duration = (endTime - startTime) / 1_000_000.0;
                System.out.println("Spring generation completed in " + duration + " ms");
            } catch (Exception e) {
                errorCounter.increment();
                throw new RuntimeException("Failed to generate Spring application", e);
            }
        }, executor);

        CompletableFuture<Void> reactTask = CompletableFuture.runAsync(() -> {
            try {
                long startTime = System.nanoTime();
                if (data.isEnabledFrontend()) {
                    new ReactGenerator().generateReactApplication(
                            data.getTables(),
                            data.getMapOfTableRelationships(),
                            data.getDatabaseName()
                    );
                }
                long endTime = System.nanoTime();
                double duration = (endTime - startTime) / 1_000_000.0;
                System.out.println("React generation completed in " + duration + " ms");
            } catch (Exception e) {
                errorCounter.increment();
                throw new RuntimeException("Failed to generate React application", e);
            }
        }, executor);

        CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(springTask, reactTask);
        combinedFuture.get();

        long systemEndTime = System.nanoTime();
        double systemDuration = (systemEndTime - systemStartTime) / 1_000_000.0;
        System.out.println("System generation completed in " + systemDuration + " ms");

        // Create zip file
        File zipFile = new File(zipFilePath);
        if (!zipFile.exists()) {
            zipFile.createNewFile();
        }

        ZipDirectory.zipDirectory(sourceDirPath, zipFilePath);

        Path path = Paths.get(zipFilePath);
        FileSystemResource resource = new FileSystemResource(path.toFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + data.getDatabaseName() + ".zip");

        ResponseEntity<FileSystemResource> response = ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

        // Mark file for cleanup after response is sent
        request.setAttribute("fileToDelete", zipFilePath);

        successCounter.increment();

        // Cleanup source directory immediately
        try {
            FileUtils.deleteDirectory(new File(sourceDirPath));
            System.out.println("Source directory deleted successfully.");
        } catch (IOException e) {
            System.err.println("Failed to delete source directory: " + e.getMessage());
        }

        return response;
    }

    @PreDestroy
    public void shutdown() {
        executor.shutdown();
        try {
            if (!executor.awaitTermination(60, java.util.concurrent.TimeUnit.SECONDS)) {
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}