package com.master.codegenerator.controller;

import com.master.codegenerator.TableParser.TableParser;
import com.master.codegenerator.models.SchemaData;
import com.master.codegenerator.models.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ParseSQLFile {

    @PostMapping("/upload")
    public ResponseEntity<SchemaData>  uploadData(@RequestParam("sqlFile") MultipartFile file) {
        if (!file.isEmpty()) {
            StringBuilder databaseName = new StringBuilder();
            HashMap<String, Table> tables = new HashMap<>();

            HashMap<String, ArrayList<String>> mapOfTableRelationships = new HashMap<String, ArrayList<String>>();

            if(databaseName.isEmpty())
                databaseName.append("schema");
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

                TableParser.generateTables(reader, tables, mapOfTableRelationships, databaseName);

                return new ResponseEntity<>(new SchemaData(tables, mapOfTableRelationships, databaseName.toString()), HttpStatus.OK);
            } catch (IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
