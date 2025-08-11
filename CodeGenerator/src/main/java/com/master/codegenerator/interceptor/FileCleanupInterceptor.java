package com.master.codegenerator.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

@Component
public class FileCleanupInterceptor implements HandlerInterceptor {

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        String fileToDelete = (String) request.getAttribute("fileToDelete");
        if (fileToDelete != null) {
            CompletableFuture.runAsync(() -> {
                try {
                    // Small delay to ensure response is fully sent
                    Thread.sleep(2000);
                    boolean deleted = Files.deleteIfExists(Paths.get(fileToDelete));
                    if (deleted) {
                        System.out.println("Zip file deleted successfully: " + fileToDelete);
                    } else {
                        System.out.println("Zip file was not found for deletion: " + fileToDelete);
                    }
                } catch (Exception e) {
                    System.err.println("Failed to delete zip file: " + e.getMessage());
                }
            });
        }
    }
}