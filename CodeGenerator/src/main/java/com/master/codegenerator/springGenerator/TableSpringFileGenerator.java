package com.master.codegenerator.springGenerator;

import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.GeneratorUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

public class TableSpringFileGenerator {
    public String databaseName;
    private final String genericFolder;
    private final String generateTableFolder;
    private final Table table;
    private final HashMap<String, ArrayList<String>> mapOfTableRelationships;


    public TableSpringFileGenerator(Table table, String databaseName, HashMap<String, ArrayList<String>> mapOfTableRelationships) throws IOException {
        this.databaseName = databaseName;
        String folderPath = GeneratorUtils.getSpringRootFolderPath(databaseName) + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + databaseName.toLowerCase()+ File.separator + "api" + File.separator + table.getTableName().toLowerCase();
        this.generateTableFolder = folderPath;
        File tableFolder = new File(folderPath);
        this.table = table;
        if (!tableFolder.exists()) {
            tableFolder.mkdirs(); // make directory for selected schema
        }
        String genericFolderPath = "SpringFileTemplates" + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + "database" + File.separator + "table";
        Resource genericFolderResource = new ClassPathResource(genericFolderPath);
        this.genericFolder = genericFolderResource.getFile().getAbsolutePath();
        this.mapOfTableRelationships = mapOfTableRelationships;
    }

    public void generateFolderStructureOfTable() {
        File tableFolder = new File(getTableFolderPath());
        if (!tableFolder.exists())
            tableFolder.mkdirs(); // make directory for table
    }

    public void generateFile(String genericFileName, String newFileName) {

        File destFile = new File(getTableFolderPath() + File.separator + newFileName);
        File sourceFile = new File(genericFolder + File.separator + genericFileName);
        if (!destFile.exists()) {
            try {
                destFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            BufferedWriter fileWriter = new BufferedWriter(new FileWriter(destFile));
            BufferedReader fileReader = new BufferedReader(new FileReader(sourceFile));

            String line;

            while ((line = fileReader.readLine()) != null) {
                ArrayList<String> codeLines = ReplaceSpringPlaceholders.replaceSpringConstants(databaseName, table, line, mapOfTableRelationships);
                for (String codeLine : codeLines) {
                    fileWriter.write(codeLine);
                    fileWriter.newLine();
                }
            }
            fileWriter.close();
            fileReader.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            //TODO: Log exception
        }
    }

    private String getTableFolderPath() {
        return this.generateTableFolder;
    }

}
