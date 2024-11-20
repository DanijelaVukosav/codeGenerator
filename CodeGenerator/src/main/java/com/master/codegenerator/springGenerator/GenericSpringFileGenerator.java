package com.master.codegenerator.springGenerator;

import com.master.codegenerator.generator.SpringReplaceFunction;
import com.master.codegenerator.models.Table;
import com.master.codegenerator.utils.GeneratorUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;

public class GenericSpringFileGenerator {
    private final String rootGenericFolder;
    public String generatedAppFolder;

    public GenericSpringFileGenerator(String schemaName) throws IOException {
        this.generatedAppFolder = GeneratorUtils.getSpringRootFolderPath(schemaName);
        Resource sourceResource = new ClassPathResource("SpringFileTemplates");
        this.rootGenericFolder = sourceResource.getFile().getAbsolutePath();
    }

    public void copyGenericFiles(String schemaName) throws IOException {
        File schemaFolder = new File(generatedAppFolder);
        if (!schemaFolder.exists())
            schemaFolder.mkdirs(); // make directory for schema

        String[] foldersInRoot = {"gradle", "src"};
        generateFolders("", foldersInRoot);

        String[] filesInRootFolder = {"gradlew", "gradlew.bat"}; //".gitignore",
        copyFilesFromGenericFolder("", filesInRootFolder);

        String[] foldersInGradle = {"wrapper"};
        generateFolders("gradle", foldersInGradle);

        String[] filesInGradleWrapper = {"gradle-wrapper.jar", "gradle-wrapper.properties"};
        copyFilesFromGenericFolder("gradle" + File.separator + "wrapper", filesInGradleWrapper);

        String[] foldersInSrc = {"main", "test"};
        generateFolders("src", foldersInSrc);

        String[] foldersInMain = {"java", "resources"};
        generateFolders("src" + File.separator + "main", foldersInMain);

        String[] foldersInResources = {"static", "templates"};
        generateFolders("src" + File.separator + "main" + File.separator + "resources", foldersInResources);

        String[] filesInResources = {"application.properties"};
        copyFilesFromGenericFolder("src" + File.separator + "main" + File.separator + "resources", filesInResources);

        String apiRelativePath = getDestinationApiRelativePath(schemaName);
        String[] foldersInJava = {apiRelativePath};
        generateFolders("", foldersInJava);

        String[] foldersInApi = {"audit", "auth", "security", "utils"};
        generateFolders(apiRelativePath, foldersInApi);

        String[] foldersInApiAuth = {"advice", "config", "controllers", "exception", "models", "payload", "repository", "service"};
        generateFolders(apiRelativePath + File.separator + "auth", foldersInApiAuth);

        String[] foldersInApiAuthPayload = {"request", "response"};
        generateFolders(apiRelativePath + File.separator + "auth" + File.separator + "payload", foldersInApiAuthPayload);

        String[] foldersInApiSecurity = {"jwt", "services"};
        generateFolders(apiRelativePath + File.separator + "security", foldersInApiSecurity);
    }

    public void replaceSchemaNameInGenericFiles(String schemaName, HashMap<String, Table> tables) throws IOException {
        String apiSourceRelativePath = "SpringFileTemplates" + File.separator + getSourceApiRelativePath(schemaName);
        String apiDestinationRelativePath = getDestinationApiRelativePath(schemaName);
        String[] apiGenericFiles = {
                "ApiApplication.java",
                "utils" + File.separator + "FilterAndSortUtils.java",
                "utils" + File.separator + "FilterCriteria.java",
                "utils" + File.separator + "FilterData.java",
                "utils" + File.separator + "StringUtils.java",
                "audit" + File.separator + "AuditorAwareImpl.java",
                "audit" + File.separator + "JacksonConfig.java",
                "audit" + File.separator + "JpaConfig.java",
                "auth" + File.separator + "advice" + File.separator + "ErrorMessage.java",
                "auth" + File.separator + "advice" + File.separator + "TokenControllerAdvice.java",
                "auth" + File.separator + "config" + File.separator + "CorsConfig.java",
                "auth" + File.separator + "controllers" + File.separator + "AuthController.java",
                "auth" + File.separator + "controllers" + File.separator + "UserController.java",
                "auth" + File.separator + "exception" + File.separator + "TokenRefreshException.java",
                "auth" + File.separator + "models" + File.separator + "Permission.java",
                "auth" + File.separator + "models" + File.separator + "PermissionEnum.java",
                "auth" + File.separator + "models" + File.separator + "RefreshToken.java",
                "auth" + File.separator + "models" + File.separator + "User.java",
                "auth" + File.separator + "models" + File.separator + "UserRoles.java",
                "auth" + File.separator + "models" + File.separator + "UserSpecification.java",
                "auth" + File.separator + "payload" + File.separator + "request" + File.separator + "ActivateUserRequest.java",
                "auth" + File.separator + "payload" + File.separator + "request" + File.separator + "EditUserRequest.java",
                "auth" + File.separator + "payload" + File.separator + "request" + File.separator + "LoginRequest.java",
                "auth" + File.separator + "payload" + File.separator + "request" + File.separator + "SignupRequest.java",
                "auth" + File.separator + "payload" + File.separator + "request" + File.separator + "TokenRefreshRequest.java",
                "auth" + File.separator + "payload" + File.separator + "response" + File.separator + "JwtResponse.java",
                "auth" + File.separator + "payload" + File.separator + "response" + File.separator + "MessageResponse.java",
                "auth" + File.separator + "payload" + File.separator + "response" + File.separator + "TokenRefreshResponse.java",
                "auth" + File.separator + "repository" + File.separator + "PermissionRepository.java",
                "auth" + File.separator + "repository" + File.separator + "RefreshTokenRepository.java",
                "auth" + File.separator + "repository" + File.separator + "UserRepository.java",
                "auth" + File.separator + "service" + File.separator + "PermissionService.java",
                "auth" + File.separator + "service" + File.separator + "UserService.java",
                "security" + File.separator + "jwt" + File.separator + "AuthEntryPointJwt.java",
                "security" + File.separator + "jwt" + File.separator + "AuthTokenFilter.java",
                "security" + File.separator + "jwt" + File.separator + "JwtUtils.java",
                "security" + File.separator + "services" + File.separator + "RefreshTokenService.java",
                "security" + File.separator + "services" + File.separator + "UserDetailsImpl.java",
                "security" + File.separator + "services" + File.separator + "UserDetailsServiceImpl.java",
                "security" + File.separator + "WebSecurityConfig.java"
        };
        for (String apiGenericFile : apiGenericFiles) {
            generateFile(schemaName, tables,
                    apiSourceRelativePath + File.separator + apiGenericFile,
                    apiDestinationRelativePath + File.separator + apiGenericFile,
                    ReplaceSpringPlaceholders::replaceSchemaConstants);
        }
    }

    private void generateFolders(String relativeFolderPath, String[] folderNames) {
        for (String folderName : folderNames) {
            File folder = new File(
                    generatedAppFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + folderName);
            if (!folder.exists())
                folder.mkdirs();
        }
    }

    private void copyFilesFromGenericFolder(String relativeFolderPath, String[] files) throws IOException {
        for (String fileName : files) {
            File destFile = new File(
                    generatedAppFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + fileName);
            File sourceFile = new File(rootGenericFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + fileName);
            if (!sourceFile.exists()) {
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

    public static void generateFile(String databaseName, HashMap<String, Table> tables, String relativeSourcePath, String relativeDestPath, SpringReplaceFunction replaceFunction) throws IOException {
        File destFile = new File(GeneratorUtils.getSpringRootFolderPath(databaseName) + File.separator + relativeDestPath);

        Resource genericFolderResource = new ClassPathResource(relativeSourcePath);
        String genericFolderAbsolutePath = genericFolderResource.getFile().getAbsolutePath();
        File sourceFile = new File(genericFolderAbsolutePath);


        destFile.getParentFile().mkdirs();

        if (!destFile.exists()) {
            try {
                destFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try (BufferedWriter fileWriter = new BufferedWriter(new FileWriter(destFile));
             BufferedReader fileReader = new BufferedReader(new FileReader(sourceFile))) {

            String line;

            while ((line = fileReader.readLine()) != null) {
                ArrayList<String> codeLines = replaceFunction.replaceSpringPlaceholders(line, databaseName, tables);
                for (String codeLine : codeLines) {
                    fileWriter.write(codeLine);
                    fileWriter.newLine();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void generateBuildGradleFile(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "SpringFileTemplates" + File.separator + "build.gradle";
        String relativeDestPath = "build.gradle";
        generateFile(databaseName, tables, relativeSourcePath, relativeDestPath, ReplaceSpringPlaceholders::replaceSchemaConstants);
    }

    public static void generateSettingsGradleFile(String databaseName, HashMap<String, Table> tables) throws IOException {
        String relativeSourcePath = "SpringFileTemplates" + File.separator + "settings.gradle";
        String relativeDestPath = "settings.gradle";
        generateFile(databaseName, tables, relativeSourcePath, relativeDestPath, ReplaceSpringPlaceholders::replaceSchemaConstants);
    }

    private static String getDestinationApiRelativePath(String schemaName) {
        return "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + schemaName.toLowerCase() + File.separator + "api";
    }

    private static String getSourceApiRelativePath(String schemaName) {
        return "src" + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator + "database";
    }

}