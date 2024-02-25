package com.master.codegenerator.reactGenerator;

import com.master.codegenerator.models.Table;
import com.master.codegenerator.reactUtils.ReplaceConst;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;

public class TableFileGenerator {
	private String componentsFolderName = "components";
	private String serviceFolderName = "service";
	public static String generatedAppsFolder = "GeneratedApps";
	public String databaseName = "schema";
	private String genericFolder = "FilesForGenerator" + File.separator + "src" + File.separator + "TableName";

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

	public TableFileGenerator(Table table, String databaseName) {
		this.databaseName = databaseName;
		this.generateTableFolder = generatedAppsFolder + File.separator + databaseName + File.separator + "src"
				+ File.separator + table.getTableName();
		File databaseFolder = new File(generatedAppsFolder + File.separator + databaseName + File.separator + "src");
		this.table=table;
		if (!databaseFolder.exists())
			databaseFolder.mkdirs(); // make directory for selected schema
	}

	public void generateFolderStructureOfTable() {
		File tableFolder = new File(getTableFolderPath());
		if (!tableFolder.exists())
			tableFolder.mkdirs(); // make directory for table

		File componentsFolder = new File(getComponentsFolderPath());
		if (!componentsFolder.exists())
			componentsFolder.mkdirs(); // make directory for components

		File serviceFolder = new File(getServiceFolderPath());
		if (!serviceFolder.exists())
			serviceFolder.mkdirs(); // make directory for components
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
				ArrayList<String> codeLines = ReplaceConst.replaceGeneratorConstants(table, line);
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

	private String getComponentsFolderPath() {
		return this.generateTableFolder + File.separator + componentsFolderName;
	}

	private String getServiceFolderPath() {
		return this.generateTableFolder + File.separator + serviceFolderName;
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
