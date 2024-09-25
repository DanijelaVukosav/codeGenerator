package com.master.codegenerator.reactGenerator;

import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.GeneratorUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

public class ReactGenerator {
    public void generateReactApplication(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName) {
        try {
            new GenericReactFileGenerator(databaseName).copyGenericFiles();
            for (Table table : tables.values()) {
                TableFileGenerator fileGenerator = new TableFileGenerator(table, databaseName, mapOfTableRelationships, tables);
                String tableName = GeneratorUtils.firstLatterToUppercase(table.getTableName());
                String[] genericFiles = {"types.ts", "Index.tsx", "components" + File.separator + "Form.tsx",
                        "components" + File.separator + "Header.tsx", "components" + File.separator + "Modal.tsx",
                        "components" + File.separator + "Table.tsx", "components" + File.separator + "TableRow.tsx",
                        "service" + File.separator + "Context.tsx", "service" + File.separator + "Service.tsx",
                        "singlePage" + File.separator + "Data.tsx", "singlePage" + File.separator + "Page.tsx"};

                String[] filesForGenerating = {"types.ts", tableName + "Index.tsx", "components" + File.separator + tableName + "Form.tsx",
                        "components" + File.separator + tableName + "Header.tsx", "components" + File.separator + tableName + "Modal.tsx",
                        "components" + File.separator + tableName + "Table.tsx", "components" + File.separator + tableName + "TableRow.tsx",
                        "service" + File.separator + tableName + "Context.tsx", "service" + File.separator + tableName + "Service.tsx",
                        "singlePage" + File.separator + tableName + "Data.tsx", "singlePage" + File.separator + tableName + "Page.tsx"};

                fileGenerator.generateFolderStructureOfTable();

                for (int i = 0; i < genericFiles.length; i++) {
                    fileGenerator.generateFile(genericFiles[i], filesForGenerating[i]);
                }
            }

            TableFileGenerator.generateSystemApiRoutes(databaseName, tables);
            TableFileGenerator.generateReactApplicationRoutes(databaseName, tables);
            TableFileGenerator.generateApplicationSidebar(databaseName, tables);
            TableFileGenerator.generateApplicationPrivateRouter(databaseName, tables);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
