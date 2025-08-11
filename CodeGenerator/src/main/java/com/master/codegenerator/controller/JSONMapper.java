package com.master.codegenerator.controller;

import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.validator.JsonSchemaValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JSONMapper {

    private final JsonSchemaValidator schemaValidator;

    @Autowired
    public JSONMapper(JsonSchemaValidator schemaValidator) {
        this.schemaValidator = schemaValidator;
    }

    @PostMapping("/json-mapper")
    public ResponseEntity<?> uploadData(@RequestParam("jsonFile") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            SchemaData schema = objectMapper.readValue(file.getInputStream(), SchemaData.class);

            JsonSchemaValidator.ValidationResult validationResult = schemaValidator.validateAndPopulateSchema(schema);

            if (!validationResult.isValid()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Schema validation failed");
                errorResponse.put("errors", validationResult.getErrors());

                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
            }

            for (Table table : schema.getTables().values()) {
                table.populateColumnsMap();
            }

            schema.createMapOfTableRelationships();

            Map<String, Object> successResponse = new HashMap<>();
            successResponse.put("success", true);
            successResponse.put("message", "Schema validated and processed successfully");
            successResponse.put("data", schema);

            return new ResponseEntity<>(successResponse, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to parse JSON file: " + e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Internal server error: " + e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}