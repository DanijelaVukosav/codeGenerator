package com.master.codegenerator.springGenerator;

import com.master.codegenerator.models.Table;

import java.util.ArrayList;
import java.util.HashMap;

public class SpringGenerator {

    public void generateSpringApplication(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String schemaName) {

        try {
            GenericSpringFileGenerator springFileGenerator = new GenericSpringFileGenerator(schemaName);
            springFileGenerator.copyGenericFiles(schemaName);
            springFileGenerator.replaceSchemaNameInGenericFiles(schemaName, tables);
            for (Table table : tables.values()) {
                TableSpringFileGenerator fileGenerator = new TableSpringFileGenerator(table, schemaName, mapOfTableRelationships);
                String tableName = StringUtils.firstLatterToUppercase(table.getTableName());
                String[] genericFiles = {"Model.java", "Repository.java", "Service.java", "Controller.java", "Specification.java"};

                String[] filesForGenerating = {StringUtils.firstLatterToUppercase(tableName) + ".java", StringUtils.firstLatterToUppercase(tableName) + "Repository.java",
                        StringUtils.firstLatterToUppercase(tableName) + "Service.java", StringUtils.firstLatterToUppercase(tableName) + "Controller.java", StringUtils.firstLatterToUppercase(tableName) + "Specification.java"};

                fileGenerator.generateFolderStructureOfTable();

                for (int i = 0; i < genericFiles.length; i++) {
                    fileGenerator.generateFile(genericFiles[i], filesForGenerating[i]);
                }


            }

            GenericSpringFileGenerator.generateBuildGradleFile(schemaName, tables);
            GenericSpringFileGenerator.generateSettingsGradleFile(schemaName, tables);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
