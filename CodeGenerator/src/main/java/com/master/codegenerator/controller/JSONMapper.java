package com.master.codegenerator.controller;

import com.master.codegenerator.TableParser.TableParser;
import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.models.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JSONMapper {

    @PostMapping("/json-mapper")
    public ResponseEntity<SchemaData>  uploadData(@RequestParam("jsonFile") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SchemaData schema = objectMapper.readValue(file.getInputStream(), SchemaData.class);

            for (Table table : schema.getTables().values()) {
                table.populateColumnsMap();
            }
            schema.createMapOfTableRelationships();

            return new ResponseEntity<>(schema, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
