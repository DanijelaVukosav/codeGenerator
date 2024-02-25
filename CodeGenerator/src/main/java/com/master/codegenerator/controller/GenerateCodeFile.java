package com.master.codegenerator.controller;

import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.springGenerator.SpringGenerator;
import com.master.codegenerator.utils.ZipDirectory;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class GenerateCodeFile {

    @PostMapping("/download")
    public ResponseEntity<FileSystemResource> downloadZip(@RequestBody SchemaData data) throws IOException { //FileSystemResource
        String sourceDirPath = "GeneratedApps" + File.separator + "Spring" + data.getDatabaseName();
        String zipFilePath = "GeneratedApps" + File.separator + "Spring" + data.getDatabaseName() + ".zip";

        new SpringGenerator().generateSpringApplication(data.getTables(), data.getMapOfTableRelationships(), data.getDatabaseName());

        File zipFile = new File(zipFilePath);
        if (!zipFile.exists()) zipFile.createNewFile();

        // Zipiranje foldera
        ZipDirectory.zipDirectory(sourceDirPath, zipFilePath);

        System.out.println("izasaoaooaoaooaoaoa");
        // Slanje zip datoteke kao odgovor
        Path path = Paths.get(zipFilePath);
        FileSystemResource resource = new FileSystemResource(path.toFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+ data.getDatabaseName()+".zip");

        // Slanje odgovora
        ResponseEntity<FileSystemResource> response = ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

        // Brisanje zip datoteke nakon slanja odgovora
//        Files.deleteIfExists(path);
        try {
            FileUtils.deleteDirectory(new File(sourceDirPath));
            System.out.println("Directory deleted successfully.");
        } catch (IOException e) {
            System.err.println("Failed to delete directory: " + e.getMessage());
        }

        return response;
    }
}
