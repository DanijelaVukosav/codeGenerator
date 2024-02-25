package com.master.codegenerator.springGenerator;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class GenericSpringFileGenerator {
    private String rootGenericFolder = "SpringFileTemplates";
    public String generatedAppFolder;

    public GenericSpringFileGenerator(String schemaName) throws IOException {
        String destFolder = "GeneratedApps" + File.separator + "Spring" + schemaName;
//        Resource resource = new ClassPathResource(destFolder);
        System.out.println('6');
//        this.generatedAppFolder = resource.getFile().getAbsolutePath() ;
        this.generatedAppFolder = destFolder;
        System.out.println('5');
        Resource sourceResource = new ClassPathResource("SpringFileTemplates");
        this.rootGenericFolder = sourceResource.getFile().getAbsolutePath();
        System.out.println('4');
    }

    public GenericSpringFileGenerator() throws IOException {

        Resource resource = new ClassPathResource("");
        System.out.println('1');
        this.generatedAppFolder = resource.getFile().getAbsolutePath() + File.separator + "GeneratedApps" + File.separator + "Spring" + "schema";
        System.out.println('2');
        this.rootGenericFolder = resource.getFile().getAbsolutePath() + File.separator + "SpringFileTemplates";
        System.out.println('3');
    }

    public void copyGenericFiles() throws IOException {

        File schemaFolder = new File(generatedAppFolder);
        System.out.println("schema folder  " + schemaFolder.getPath());
        if (!schemaFolder.exists())
            schemaFolder.mkdirs(); // make directory for schema

        String[] foldersInRoot = {"gradle", "src"};
        generateFolders("", foldersInRoot);

        String[] filesInRootFolder = {"build.gradle", "gradlew", "gradlew.bat", "HELP.md", "settings.gradle"};
        copyFilesFromGenericFolder("", filesInRootFolder);

        String[] foldersInSrc = {"main", "test"};
        generateFolders("src", foldersInSrc);

        String[] foldersInMain = {"java", "resources"};
        generateFolders("src" + File.separator + "main", foldersInMain);

        String[] foldersInJava = {"com"};
        generateFolders("src" + File.separator + "main" + File.separator + "java", foldersInJava);

        String[] foldersInResources = {"static", "templates"};
        generateFolders("src" + File.separator + "main" + File.separator + "resources", foldersInResources);

        String[] filesInResources = {"application.properties"};
        copyFilesFromGenericFolder("src" + File.separator + "main" + File.separator + "resources", filesInResources);
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
            System.out.println("sourde file " + sourceFile.getPath());
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
