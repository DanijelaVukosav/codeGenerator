package com.master.codegenerator.reactGenerator;

//import TableParser.TableParser;
//import generator.TableFileGenerator;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.reactUtils.StringUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

public class ReactGenerator {

//    private  String databaseName ="schema";
//   private HashMap<String, Table> tables = new HashMap<String, Table>();
//
//    private HashMap<String, ArrayList<String>> mapOfTableRelationships = new HashMap<String, ArrayList<String>>();
//
//    public ReactGenerator(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName)
//    {
//        this.tables = tables;
//    }
    public void generateReactApplication(HashMap<String, Table> tables, HashMap<String, ArrayList<String>> mapOfTableRelationships, String databaseName){

        try {
            new GenericReactFileGenerator(databaseName).copyGenericFiles();
            for (Table table : tables.values()) {
                TableFileGenerator fileGenerator = new TableFileGenerator(table, databaseName);
                String tableName = StringUtils.firstLatterToUppercase(table.getTableName());
                String[] genericFiles = { "types.tsx", "Index.tsx", "components" + File.separator + "Create.tsx",
                        "components" + File.separator + "Edit.tsx", "components" + File.separator + "Form.tsx",
                        "components" + File.separator + "Page.tsx", "components" + File.separator + "TableRow.tsx",
                        "service" + File.separator + "Service.tsx" };

                String[] filesForGenerating = { "types.tsx", "Index" + tableName+".tsx",
                        "components" + File.separator + "Create" + tableName + ".tsx",
                        "components" + File.separator + "Edit" + tableName + ".tsx", "components" + File.separator + "Form" + tableName + ".tsx",
                        "components" + File.separator + "Page" + tableName + ".tsx", "components" + File.separator + "TableRow.tsx",
                        "service" + File.separator 	 + tableName + "Service.tsx" };

                fileGenerator.generateFolderStructureOfTable();

                for (int i = 0; i < genericFiles.length; i++) {
                    fileGenerator.generateFile(genericFiles[i], filesForGenerating[i]);
                }


            }
            TableFileGenerator.generateAppComponent(databaseName, tables);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
