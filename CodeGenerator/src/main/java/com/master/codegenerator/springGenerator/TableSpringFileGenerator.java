package com.master.codegenerator.springGenerator;

import com.master.codegenerator.models.Table;
import com.master.codegenerator.reactUtils.ReplaceConst;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

public class TableSpringFileGenerator {
    //	private String componentsFolderName = "components";
//	private String serviceFolderName = "service";
    public static String generatedAppsFolder = "GeneratedApps";
    public String databaseName;
    private String genericFolder = "SpringFileTemplates" + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + "database" + File.separator + "table";

    private String generateTableFolder;
    private Table table;

//	public TableFileGenerator(Table table) {
//		this.generateTableFolder = generatedAppsFolder + File.separator + databaseName + File.separator + "src"
//				+ File.separator + table.getTableName();
//		File databaseFolder = new File(generatedAppsFolder + File.separator + databaseName + File.separator + "src");
//		this.table=table;
//		if (!databaseFolder.exists())
//			databaseFolder.mkdirs(); // make directory for selected schema
//	}

    public TableSpringFileGenerator(Table table, String databaseName) throws IOException {
        this.databaseName = databaseName;
        String folderPath = generatedAppsFolder + File.separator + "Spring" + databaseName + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + databaseName + File.separator + table.getTableName();
        this.generateTableFolder = folderPath;
//        Resource resource = new ClassPathResource(folderPath);
//        this.generateTableFolder = resource.getFile().getAbsolutePath();
//        File tableFolder = new File(generatedAppsFolder + File.separator + "Spring" + databaseName + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + databaseName + File.separator + table.getTableName());
        File tableFolder = new File(folderPath);
        this.table = table;
        if (!tableFolder.exists()) {
            tableFolder.mkdirs(); // make directory for selected schema
        }
        String genericFolderPath = "SpringFileTemplates" + File.separator + "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + "database" + File.separator + "table";
        Resource genericFolderResource = new ClassPathResource(genericFolderPath);
        this.genericFolder = genericFolderResource.getFile().getAbsolutePath();
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
                ArrayList<String> codeLines = ReplaceSpringConstants.replaceSpringConstants(databaseName, table, line);
                for (String codeLine : codeLines) {
                    fileWriter.write(codeLine);
                    fileWriter.newLine();
                }

            }

            fileWriter.close();
            fileReader.close();

        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

    }

    private String getTableFolderPath() {
        return this.generateTableFolder;
    }

    public static void generateAppComponent(String databaseName, HashMap<String, Table> tables) {
        File destFile = new File(generatedAppsFolder + File.separator + databaseName + File.separator + "src"
                + File.separator + "App.tsx");
        File sourceFile = new File("FilesForGenerator" + File.separator + "src" + File.separator + "App.tsx");
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
                ArrayList<String> codeLines = ReplaceConst.replaceGeneratorAppConstants(line, tables);
                for (String codeLine : codeLines) {
                    fileWriter.write(codeLine);
                    fileWriter.newLine();
                }

            }

            fileWriter.close();
            fileReader.close();

        } catch (IOException e) {
            System.out.println("An error occurred of App component.");
            e.printStackTrace();
        }
    }

}
