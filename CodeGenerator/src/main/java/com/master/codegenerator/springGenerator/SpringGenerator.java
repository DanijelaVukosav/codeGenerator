package com.master.codegenerator.springGenerator;

import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SpringGenerator {

    public void generateSpringApplication(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String schemaName) {
        try {
            // Kreiramo ExecutorService za pokretanje paralelnih taskova
            ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
            CountDownLatch latch = new CountDownLatch(tables.size());  // Latch koji čeka sve thread-ove

            // Kreiramo objekat za generisanje osnovnih Spring fajlova
            GenericSpringFileGenerator springFileGenerator = new GenericSpringFileGenerator(schemaName);
            springFileGenerator.copyGenericFiles(schemaName);
            springFileGenerator.replaceSchemaNameInGenericFiles(schemaName, tables);

            // Pokrećemo generisanje za svaki tabelu u paralelnim threadovima
            for (Table table : tables.values()) {
                executorService.submit(() -> {
                    try {
                        TableSpringFileGenerator fileGenerator = new TableSpringFileGenerator(table, schemaName, mapOfTableRelationships);
                        String tableName = StringUtils.firstLatterToUppercase(table.getTableName());
                        String[] genericFiles = {"Model.java", "Repository.java", "Service.java", "Controller.java", "Specification.java"};

                        String[] filesForGenerating = {
                                StringUtils.firstLatterToUppercase(tableName) + ".java",
                                StringUtils.firstLatterToUppercase(tableName) + "Repository.java",
                                StringUtils.firstLatterToUppercase(tableName) + "Service.java",
                                StringUtils.firstLatterToUppercase(tableName) + "Controller.java",
                                StringUtils.firstLatterToUppercase(tableName) + "Specification.java"
                        };

                        fileGenerator.generateFolderStructureOfTable();

                        for (int i = 0; i < genericFiles.length; i++) {
                            fileGenerator.generateFile(genericFiles[i], filesForGenerating[i]);
                        }
                    } catch (Exception e) {
                        // Obrada greške u thread-u
                        e.printStackTrace();
                    } finally {
                        latch.countDown();  // Kada thread završi, smanjujemo broj čekanja na 0
                    }
                });
            }

            // Čekamo da svi thread-ovi završe
            latch.await();

            // Generišemo Build i Settings fajlove nakon što su svi fajlovi generisani
            GenericSpringFileGenerator.generateBuildGradleFile(schemaName, tables);
            GenericSpringFileGenerator.generateSettingsGradleFile(schemaName, tables);

            // Zatvaramo ExecutorService
            executorService.shutdown();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
