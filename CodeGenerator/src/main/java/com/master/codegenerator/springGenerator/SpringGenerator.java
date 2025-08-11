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
            ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
            CountDownLatch latch = new CountDownLatch(tables.size());

            GenericSpringFileGenerator springFileGenerator = new GenericSpringFileGenerator(schemaName);
            springFileGenerator.copyGenericFiles(schemaName);
            springFileGenerator.replaceSchemaNameInGenericFiles(schemaName, tables);

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
                        e.printStackTrace();
                    } finally {
                        latch.countDown();
                    }
                });
            }

            latch.await();

            GenericSpringFileGenerator.generateBuildGradleFile(schemaName, tables);
            GenericSpringFileGenerator.generateSettingsGradleFile(schemaName, tables);

            executorService.shutdown();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
