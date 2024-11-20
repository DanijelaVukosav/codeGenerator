package com.master.codegenerator.controller;

import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.reactGenerator.ReactGenerator;
import com.master.codegenerator.springGenerator.SpringGenerator;
import com.master.codegenerator.utils.GeneratorUtils;
import com.master.codegenerator.utils.ZipDirectory;
import org.apache.tomcat.util.http.fileupload.FileUtils;
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

@RestController
public class GenerateCodeFile {

    @PostMapping("/download")
    public ResponseEntity<FileSystemResource> downloadZip(@RequestBody SchemaData data) throws IOException { //FileSystemResource
        if (data.getDatabaseName() == null || data.getDatabaseName().isEmpty()) {
            data.setDatabaseName(GeneratorUtils.DEFAULT_SCHEMA_NAME);
        }
        //TODO: BRISIII
        data.setDatabaseName(GeneratorUtils.DEFAULT_SCHEMA_NAME);
        String sourceDirPath = GeneratorUtils.getSchemaRootFolderPath(data.getDatabaseName());
        String zipFilePath = "GeneratedApps" + File.separator + data.getDatabaseName() + "Project" + ".zip";

        new SpringGenerator().generateSpringApplication(data.getTables(), data.getMapOfTableRelationships(), data.getDatabaseName());
        new ReactGenerator().generateReactApplication(data.getTables(), data.getMapOfTableRelationships(), data.getDatabaseName());

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

//        try {
//            FileUtils.deleteDirectory(new File(sourceDirPath));
//            System.out.println("Directory deleted successfully.");
//        } catch (IOException e) {
//            System.err.println("Failed to delete directory: " + e.getMessage());
//        }

        return response;
    }
}
