package com.master.codegenerator.springGenerator;

public interface SpringGeneratorConstant {
	String DATABASE_NAME = "#{DATABASE_NAME}#";
	String FLL_DATABASE_NAME = "#{FLL_DATABASE_NAME}#"; //first lower letter of database name
	String FUL_DATABASE_NAME = "#{FUL_DATABASE_NAME}#";//first upper letter of database name
	String ALL_DATABASE_NAME = "#{ALL_DATABASE_NAME}#";//all lower letters of database name
	String TABLE_NAME = "#{TABLE_NAME}#";
	String ALL_TABLE_NAME = "#{ALL_TABLE_NAME}#";//all lower letters of table name
	String FLL_TABLE_NAME = "#{FLL_TABLE_NAME}#"; //first lower letter of table name
	String FUL_TABLE_NAME = "#{FUL_TABLE_NAME}#"; //first upper letter of table name
	String IMPORT_MODELS_WHICH_REFERENCE_TABLE = "#{IMPORT_MODELS_WHICH_REFERENCE_TABLE}#";
	String IMPORT_MODELS_WHICH_REFERENCED_BY_TABLE = "#{IMPORT_MODELS_WHICH_REFERENCED_BY_TABLE}#";
	String IMPORT_COLUMN_TYPES = "#{IMPORT_COLUMN_TYPES}#";
	String COLUMNS_TO_ATTRIBUTES = "#{COLUMNS_TO_ATTRIBUTES}#"; //map table columns to model attributes
	String FOREIGN_KEYS_TO_ATTRIBUTES = "#{FOREIGN_KEYS_TO_ATTRIBUTES}#"; //map foreign keys to foreign objects as model attributes
	String MODELS_WHICH_REFERENCE_TABLE_TO_ATTRIBUTES = "#{MODELS_WHICH_REFERENCE_TABLE_TO_ATTRIBUTES}#"; //list of objects which reference current model
	String MODEL_SETTERS_AND_GETTERS = "#{MODEL_SETTERS_AND_GETTERS}#"; //setters and getters for all table columns
	String FOREIGN_OBJECTS_SETTERS_AND_GETTERS= "#{FOREIGN_OBJECTS_SETTERS_AND_GETTERS}#"; //setters and getters for foreign objects
	String MODELS_WHICH_REFERENCE_TABLE_SETTERS_AND_GETTERS= "#{MODELS_WHICH_REFERENCE_TABLE_SETTERS_AND_GETTERS}#"; //setters and getters for list od objects which reference current model
	String PRIMARY_KEY_SPRING_TYPE= "#{PRIMARY_KEY_SPRING_TYPE}#"; //map type of primary key to spring type

}
