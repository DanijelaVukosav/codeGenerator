package com.master.codegenerator.springGenerator;

import com.master.codegenerator.models.Table;

import java.util.ArrayList;
import java.util.HashMap;

public class SpringGenerator {

    public void generateSpringApplication(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName) {

        try {
            new GenericSpringFileGenerator(databaseName).copyGenericFiles();
            for (Table table : tables.values()) {
                TableSpringFileGenerator fileGenerator = new TableSpringFileGenerator(table, databaseName);
                String tableName = StringUtils.firstLatterToUppercase(table.getTableName());
                String[] genericFiles = {"Model.java", "Repository.java", "Service.java" , "Controller.java"};

                String[] filesForGenerating = {StringUtils.firstLatterToUppercase(tableName)+".java", StringUtils.firstLatterToUppercase(tableName)+"Repository.java",
                        StringUtils.firstLatterToUppercase(tableName)+"Service.java",StringUtils.firstLatterToUppercase(tableName)+"Controller.java"};

                fileGenerator.generateFolderStructureOfTable();

                for (int i = 0; i < genericFiles.length; i++) {
                    fileGenerator.generateFile(genericFiles[i], filesForGenerating[i]);
                }


            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
