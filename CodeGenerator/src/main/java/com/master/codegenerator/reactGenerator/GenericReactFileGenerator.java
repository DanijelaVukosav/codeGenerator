package com.master.codegenerator.reactGenerator;

import com.master.codegenerator.utils.GeneratorUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class GenericReactFileGenerator {
    private final String rootGenericFolder;
    public String generatedAppFolder;

    public GenericReactFileGenerator(String schemaName) throws IOException {
        this.generatedAppFolder = GeneratorUtils.getReactRootFolderPath(schemaName);
        Resource sourceResource = new ClassPathResource(GeneratorUtils.REACT_GENERIC_FOLDER_NAME);
        this.rootGenericFolder = sourceResource.getFile().getAbsolutePath();
    }

    public GenericReactFileGenerator() throws IOException {
        this.generatedAppFolder = GeneratorUtils.getReactRootFolderPath(GeneratorUtils.DEFAULT_SCHEMA_NAME);
        Resource sourceResource = new ClassPathResource(GeneratorUtils.REACT_GENERIC_FOLDER_NAME);
        this.rootGenericFolder = sourceResource.getFile().getAbsolutePath();

    }

    public void copyGenericFiles() throws IOException {
        File schemaFolder = new File(generatedAppFolder);
        if (!schemaFolder.exists()){
            if (!schemaFolder.mkdirs()) {
                throw new IOException("Something went wrong while schema folder");
            }
        }

        String[] foldersInRoot = {"public", "src"};
        generateFolders("", foldersInRoot);

        String[] filesInPublicFolder = {"index.html"};
        copyFilesFromGenericFolder("public", filesInPublicFolder);


        String[] foldersInPublic = {"svg"};
        generateFolders("public", foldersInPublic);

        String[] filesInPublicSvg = {"add.svg", "add-user.svg", "add-white.svg",
                "checkbox-checked.svg", "chevron-down.svg", "chevron-up.svg", "clear-filter.svg", "dashboard.png", "dashboard-graph-analytics-report.svg", "edit.svg", "filter.png",
                "filter-search.svg", "login.svg", "login-email.svg", "login-icon.png", "login-icon1.png", "login-password.png", "login-password.svg", "login-username.png", "logout.png",
                "new-password.svg", "no-icon.svg", "sort.svg", "welcome-screen.png"};
        copyFilesFromGenericFolder("public" + File.separator + "svg", filesInPublicSvg);

        String[] filesInRootFolder = {"package.json", "package-lock.json", "README.md", "tsconfig.json"};
        copyFilesFromGenericFolder("", filesInRootFolder);

        String[] foldersInSrc = {"api", "authService", "generalComponents", "hooks", "loginComponents", "pages", "router", "styles", "systemUsers"};
        generateFolders("src", foldersInSrc);

        String[] filesInSrcFolder = {"App.tsx", "Home.tsx", "index.css", "index.tsx", "react-app-env.d.ts",
                "reportWebVitals.ts", "setupTests.ts"};
        copyFilesFromGenericFolder("src", filesInSrcFolder);


        String[] filesInSrcApi = {"axios.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "api", filesInSrcApi);

        String[] foldersInSrcApi = {"generalService", "hooks"};
        generateFolders("src" + File.separator + "api", foldersInSrcApi);

        String[] filesInSrcApiHooks = {"useAxiosPrivate.ts", "useRefreshToken.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "api" + File.separator + "hooks", filesInSrcApiHooks);

        String[] filesInSrcApiGeneralService = {"index.ts", "Service.tsx", "types.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "api" + File.separator + "generalService", filesInSrcApiGeneralService);


        String[] filesInSrcAuthService = {"types.ts", "UserProvider.tsx", "userService.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "authService", filesInSrcAuthService);


        String[] filesInGeneralComponents = {"index.ts", "types.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents", filesInGeneralComponents);

        String[] foldersInSrcGeneralComponents = {"common", "filtering", "form", "index", "sidebar", "singlePage"};
        generateFolders("src" + File.separator + "generalComponents", foldersInSrcGeneralComponents);

        String[] filesInGeneralComponentsCommon = {"Button.tsx", "CustomModal.tsx", "Dropdown.tsx", "GeneralInput.tsx", "PageLoader.tsx", "Sort.tsx", "TableUtils.tsx", "Wrappers.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "common", filesInGeneralComponentsCommon);

        String[] filesInGeneralComponentsFiltering = {"ChosenFilterCriteriaContainer.tsx", "FilterCheckboxField.tsx", "FilterComponents.tsx", "FilterContainer.tsx", "FilterInputField.tsx",
                "FilterNumberInputField.tsx", "OptionDropdown.tsx", "StringFilterOperationDropdown.tsx", "TableFilterFields.tsx", "TimeFilterOperationDropdown.tsx", "utilsFunction.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "filtering", filesInGeneralComponentsFiltering);

        String[] filesInGeneralComponentsForm = {"FormBody.tsx", "FormComponents.tsx", "FormDropdown.tsx", "FormForeignObjectField.tsx", "FormInputField.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "form", filesInGeneralComponentsForm);

        String[] filesInGeneralComponentsIndex = {"IndexComponents.tsx", "TableRowContent.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "index", filesInGeneralComponentsIndex);

        String[] filesInGeneralComponentsSidebar = {"ThemeToggle.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "sidebar", filesInGeneralComponentsSidebar);

        String[] filesInGeneralComponentsSinglePage = {"ObjectDetails.tsx", "TabsComponent.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "generalComponents" + File.separator + "singlePage", filesInGeneralComponentsSinglePage);


        String[] filesInHooks = {"useFilterAndSort.ts", "usePagination.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "hooks", filesInHooks);

        String[] foldersInHooks = {"utilFunctions"};
        generateFolders("src" + File.separator + "hooks", foldersInHooks);

        String[] filesInHooksUtilFunctions = {"formatDate.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "hooks" + File.separator + "utilFunctions", filesInHooksUtilFunctions);


        String[] filesInLoginComponents = {"Login.tsx", "RegisterComponent.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "loginComponents", filesInLoginComponents);


        String[] filesInRouter = {"history.ts", "index.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "router", filesInRouter);

        String[] foldersInRouter = {"casl", "components"};
        generateFolders("src" + File.separator + "router", foldersInRouter);

        String[] filesInRouterCasl = {"ability.ts", "AbilityContext.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "router" + File.separator + "casl", filesInRouterCasl);

        String[] filesInRouterComponents = {"PublicRouter.tsx", "WrappedRoute.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "router" + File.separator + "components", filesInRouterComponents);


        String[] filesInStyles = {"app.css", "dropdown.css", "filterContainer.css", "form.css", "home.css", "index.css", "loader.css", "login.css",
                "modal.css", "registration.css", "sidebar.css", "singlePage.css", "theme-config.json", "utils.css"};
        copyFilesFromGenericFolder("src" + File.separator + "styles", filesInStyles);

        String[] filesInSystemUsers = {"SystemUserIndex.tsx", "types.ts"};
        copyFilesFromGenericFolder("src" + File.separator + "systemUsers", filesInSystemUsers);

        String[] foldersInSystemUsers = {"components", "service"};
        generateFolders("src" + File.separator + "systemUsers", foldersInSystemUsers);

        String[] filesInSystemUsersComponents = {"SystemUserForm.tsx", "SystemUserHeader.tsx", "SystemUserModal.tsx", "SystemUserTable.tsx", "TableRow.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "systemUsers" + File.separator + "components", filesInSystemUsersComponents);

        String[] filesInSystemUsersService = {"SystemUserContext.tsx", "SystemUserService.tsx"};
        copyFilesFromGenericFolder("src" + File.separator + "systemUsers" + File.separator + "service", filesInSystemUsersService);
    }

    private void generateFolders(String relativeFolderPath, String[] folderNames) throws IOException {
        for (String folderName : folderNames) {
            File folder = new File(
                    generatedAppFolder + generateRelativeFolderPath(relativeFolderPath) + File.separator + folderName);
            if (!folder.exists()) {
                if (!folder.mkdirs()) {
                    throw new IOException("Something went wrong while folder");
                }
            }
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


}
