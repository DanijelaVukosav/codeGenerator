package com.master.codegenerator.reactGenerator;

import com.master.codegenerator.generator.ReplaceFunction;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.GeneratorUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

public class TableFileGenerator {
    private final HashMap<String, ArrayList<String>> mapOfTableRelationships;

    public String databaseName;
    private final String genericFolder;
    private final String generateTableFolder;
    private final HashMap<String, Table> allTables;
    private final Table table;

    public TableFileGenerator(Table table, String databaseName, HashMap<String, ArrayList<String>> mapOfTableRelationships, HashMap<String, Table> addTables) throws IOException {
        this.databaseName = databaseName;
        this.table = table;
        this.allTables = addTables;
        this.mapOfTableRelationships = mapOfTableRelationships;

        String reactRootPath = GeneratorUtils.getReactRootFolderPath(databaseName);
        this.generateTableFolder = reactRootPath +
                File.separator + "src" + File.separator + "pages"
                + File.separator + table.getTableName();
        File databaseFolder = new File(this.generateTableFolder);

        if (!databaseFolder.exists()) {
            if (!databaseFolder.mkdirs()) {
                // make directory for selected schema
                throw new IOException("Something went wrong while creating database folder");
            }
        }

        String genericFolderPath = GeneratorUtils.getReactTemplateTableFolderPath();
        Resource genericFolderResource = new ClassPathResource(genericFolderPath);
        this.genericFolder = genericFolderResource.getFile().getAbsolutePath();
    }

    public void generateFolderStructureOfTable() throws IOException {
        File tableFolder = new File(getTableFolderPath());
        if (!tableFolder.exists()){
            if (!tableFolder.mkdirs()) {
                throw new IOException("Something went wrong while creating table folder");
            }
        }

        File componentsFolder = new File(getComponentsFolderPath());
        if (!componentsFolder.exists()){
            if (!componentsFolder.mkdirs()) {
                throw new IOException("Something went wrong while creating components folder");
            }
        }

        File serviceFolder = new File(getServiceFolderPath());
        if (!serviceFolder.exists()){
            if (!serviceFolder.mkdirs()) {
                // make directory for selected schema
                throw new IOException("Something went wrong while creating service folder");
            }
        }

        File singlePageFolder = new File(getSinglePageFolderPath());
        if (!singlePageFolder.exists()){
            if (!singlePageFolder.mkdirs()) {
                throw new IOException("Something went wrong while creating single page folder");
            }
        }
    }

    public void generateFile(String genericFileName, String newFileName) {
        File destFile = new File(getTableFolderPath() + File.separator + newFileName);
        File sourceFile = new File(genericFolder + File.separator + genericFileName);
        if (!destFile.exists()) {
            try {
                if(!destFile.createNewFile()){
                    throw new IOException("Something went wrong while creating dest file");
                }
            } catch (IOException e) {
                //TODO: Log exception
            }
        }

        try {
            BufferedWriter fileWriter = new BufferedWriter(new FileWriter(destFile));
            BufferedReader fileReader = new BufferedReader(new FileReader(sourceFile));

            String line;

            while ((line = fileReader.readLine()) != null) {
                ArrayList<String> codeLines = ReplaceReactPlaceholders.replaceGeneratorConstants(table, line, mapOfTableRelationships, allTables);
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
    private String getComponentsFolderPath() {
        String componentsFolderName = "components";
        return this.generateTableFolder + File.separator + componentsFolderName;
    }

    private String getSinglePageFolderPath() {
        String singlePageFolderName = "singlePage";
        return this.generateTableFolder + File.separator + singlePageFolderName;
    }

    private String getServiceFolderPath() {
        String serviceFolderName = "service";
        return this.generateTableFolder + File.separator + serviceFolderName;
    }

    private String getTableFolderPath() {
        return this.generateTableFolder;
    }


    public static void generateFile(String databaseName, String relativeSourcePath, String relativeDestPath, HashMap<String, Table> tables, ReplaceFunction replaceFunction) throws IOException {
        File destFile = new File(GeneratorUtils.getReactRootFolderPath(databaseName) + File.separator + relativeDestPath);

        Resource genericFolderResource = new ClassPathResource(relativeSourcePath);
        String genericFolderAbsolutePath = genericFolderResource.getFile().getAbsolutePath();
        File sourceFile = new File(genericFolderAbsolutePath);

        if (!destFile.exists()) {
            try {
                if(!destFile.createNewFile()){
                    throw new IOException("Something went wrong while creating dest file");
                }
            } catch (IOException e) {
                //TODO: log exception
            }
        }

        try (BufferedWriter fileWriter = new BufferedWriter(new FileWriter(destFile));
             BufferedReader fileReader = new BufferedReader(new FileReader(sourceFile))) {

            String line;

            while ((line = fileReader.readLine()) != null) {
                ArrayList<String> codeLines = replaceFunction.replaceReactPlaceholders(line, tables);
                for (String codeLine : codeLines) {
                    fileWriter.write(codeLine);
                    fileWriter.newLine();
                }
            }
        } catch (IOException e) {
            System.out.println("An error occurred while generating the file.");
        }
    }

    public static void generateSystemApiRoutes(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "ReactFileTemplates/src/api/apiRoutes.ts";
        String relativeDestPath = File.separator + "src" + File.separator + "api" + File.separator + "apiRoutes.ts";
        generateFile(databaseName, relativeSourcePath, relativeDestPath, tables, ReplaceReactPlaceholders::replaceSystemApiRoutesConstants);
    }

    public static void generateReactApplicationRoutes(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "ReactFileTemplates/src/router/routes.ts";
        String relativeDestPath = File.separator + "src" + File.separator + "router" + File.separator + "routes.ts";
        generateFile(databaseName, relativeSourcePath, relativeDestPath, tables, ReplaceReactPlaceholders::replaceReactApplicationRoutesConstants);
    }

    public static void generateApplicationSidebar(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "ReactFileTemplates/src/generalComponents/sidebar/SideBar.tsx";
        String relativeDestPath = File.separator + "src" + File.separator + "generalComponents" + File.separator + "sidebar" + File.separator + "SideBar.tsx";
        generateFile(databaseName, relativeSourcePath, relativeDestPath, tables, ReplaceReactPlaceholders::replaceApplicationSidebarConstants);
    }

    public static void generateApplicationPrivateRouter(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "ReactFileTemplates/src/router/components/PrivateRouter.tsx";
        String relativeDestPath = File.separator + "src" + File.separator + "router" + File.separator + "components" + File.separator + "PrivateRouter.tsx";
        generateFile(databaseName, relativeSourcePath, relativeDestPath, tables, ReplaceReactPlaceholders::replaceApplicationPrivateRouterConstants);
    }
}
