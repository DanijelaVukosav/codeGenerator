package com.master.codegenerator.springGenerator;

public interface SpringGeneratorConstant {
	String SPRING_PROJECT_NAME = "#{SPRING_PROJECT_NAME}#";
	String ALL_SCHEMA_NAME= "#{ALL_SCHEMA_NAME}#";
	String SCHEMA_PERMISSIONS = "#{SCHEMA_PERMISSIONS}#";
		String TABLE_NAME = "#{TABLE_NAME}#";
	String ALL_TABLE_NAME = "#{ALL_TABLE_NAME}#";
	String FLL_TABLE_NAME = "#{FLL_TABLE_NAME}#";
	String FUL_TABLE_NAME = "#{FUL_TABLE_NAME}#";

	String AUL_TABLE_NAME = "#{AUL_TABLE_NAME}#";
	String IMPORT_FOREIGN_REPOSITORIES_AND_MODELS = "#{IMPORT_FOREIGN_REPOSITORIES_AND_MODELS}#";
	String IMPORT_FOREIGN_MODELS = "#{IMPORT_FOREIGN_MODELS}#";
	String INSTANCE_FOREIGN_REPOSITORIES = "#{INSTANCE_FOREIGN_REPOSITORIES}#";
	String SERVICE_CREATE_FOREIGN_OBJECTS = "#{SERVICE_CREATE_FOREIGN_OBJECTS}#";
	String MODEL_ATTRIBUTES = "#{MODEL_ATTRIBUTES}#";
	String MODEL_FOREIGN_ATTRIBUTES = "#{MODEL_FOREIGN_ATTRIBUTES}#";

	String MODEL_SETTERS_AND_GETTERS = "#{MODEL_SETTERS_AND_GETTERS}#"; //setters and getters for all table columns
	String PRIMARY_KEY_SPRING_TYPE= "#{PRIMARY_KEY_SPRING_TYPE}#"; //map type of primary key to spring type
	String SET_PRIMARY_KEY= "#{SET_PRIMARY_KEY}#"; //column setter function name
	String SERVICE_CONSTRUCTOR_PARAMS = "#{SERVICE_CONSTRUCTOR_PARAMS}#"; //make service constructor params for current table, and foreign repositories
	String SERVICE_CONSTRUCTOR_VALUE_ASSIGMENT = "#{SERVICE_CONSTRUCTOR_VALUE_ASSIGMENT}#"; //make service constructor params for current table, and foreign repositories
	String ADD_AUDIT_CLASS_DECORATOR = "#{ADD_AUDIT_CLASS_DECORATOR}#";
	String MODEL_AUDIT_ATTRIBUTES = "#{MODEL_AUDIT_ATTRIBUTES}#";
	String MODEL_AUDIT_SETTERS_AND_GETTERS = "#{MODEL_AUDIT_SETTERS_AND_GETTERS}#";
}
