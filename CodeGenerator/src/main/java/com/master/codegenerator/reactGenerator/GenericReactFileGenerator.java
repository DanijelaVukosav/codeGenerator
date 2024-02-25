package com.master.codegenerator.reactGenerator;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class GenericReactFileGenerator {
	private String rootGenericFolder = "ReactFileTemplates";
	public String generatedAppFolder;

	public GenericReactFileGenerator(String schemaName) {
		this.generatedAppFolder = "GeneratedApps" + File.separator + schemaName;
	}
	public GenericReactFileGenerator() {
		this.generatedAppFolder = "GeneratedApps" + File.separator + "schema";
	}

	public void copyGenericFiles() throws IOException {
		File schemaFolder = new File(generatedAppFolder);
		if (!schemaFolder.exists())
			schemaFolder.mkdirs(); // make directory for schema

		String[] foldersInRoot = { "public", "src" };
		generateFolders("", foldersInRoot);

		String[] filesInRootFolder = { "package.json", "package-lock.json", "README.md", "tsconfig.json" };
		copyFilesFromGenericFolder("", filesInRootFolder);

		String[] foldersInSrc = { "generalComponents", "generalService", "loginComponents", "loginService", "sidebar" };
		generateFolders("src", foldersInSrc);

		String[] filesInSrcFolder = { "App.css", "Home.tsx","index.css", "index.tsx",  "react-app-env.d.ts", //"logo.svg", izbrisano
				"reportWebVitals.ts", "setupTests.ts" };
		copyFilesFromGenericFolder("src", filesInSrcFolder);
		
		String[] filesInPublicFolder = { "index.html" };
		copyFilesFromGenericFolder("public", filesInPublicFolder);

		String[] filesInGeneralComponents = { "Button.tsx", "GeneralInput.tsx", "GuardedRoute.tsx", 
				"TextInput.tsx", "index.ts" };
		copyFilesFromGenericFolder("src" + File.separator + "generalComponents", filesInGeneralComponents);

		String[] filesInGeneralService = { "index.ts", "Service.tsx", "ServiceResponse.ts" };
		copyFilesFromGenericFolder("src" + File.separator + "generalService", filesInGeneralService);

		String[] filesInLoginComponents = { "Login.tsx", "Profile.js", "Register.js" };
		copyFilesFromGenericFolder("src" + File.separator + "loginComponents", filesInLoginComponents);
		
		String[] filesInLoginservice = { "auth.service.js", "auth-header.js", "user.service.js" };
		copyFilesFromGenericFolder("src" + File.separator + "loginService", filesInLoginservice);
		
		String[] filesInSidebarFolder = { "SideBar.tsx" };
		copyFilesFromGenericFolder("src" + File.separator + "sidebar", filesInSidebarFolder);
	}

	private void generateFolders(String relativeFolderPath, String[] folderNames) {
		for (String folderName : folderNames) {
			File folder = new File(
					generatedAppFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + folderName);
			if (!folder.exists())
				folder.mkdir();
		}
	}

	private void copyFilesFromGenericFolder(String relativeFolderPath, String[] files) throws IOException {
		
		for (String fileName : files) {
			File destFile = new File(
					generatedAppFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + fileName);
			File sourceFile = new File(rootGenericFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + fileName);
			if (!sourceFile.exists()) {
				System.out.println((sourceFile.getName()));
				throw new FileNotFoundException();
			}
			copyFile(sourceFile, destFile);

		}
	}

	private String generateRelativeFolderPath(String relativeFolderPath) {
		
		if ("".equals(relativeFolderPath)) {
			return relativeFolderPath;
		} else {
			return File.separator + relativeFolderPath;
		}
	}

	private void copyFile(File source, File dest) throws IOException {

		Files.copy(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
	}
	

}
