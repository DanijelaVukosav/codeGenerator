package com.master.codegenerator.generator;
import java.util.HashMap;

public class TypeGenerator {
	
	public static HashMap<String, String> typesHashMap=new HashMap<String, String>();
	public static HashMap<String, String> defaultValueOfType=new HashMap<String, String>();
	public static HashMap<String, String> mapSQLtypeToInputType=new HashMap<String, String>();
	static {
		typesHashMap.put("CHAR", "string");
		typesHashMap.put("VARCHAR", "string");
		typesHashMap.put("BINARY", "string");
		typesHashMap.put("VARBINARY", "string");
		typesHashMap.put("BLOB", "string");
		typesHashMap.put("TEXT", "string");
		typesHashMap.put("ENUM", "string");
		typesHashMap.put("SET", "string");
		
		typesHashMap.put("BIT", "number");
		typesHashMap.put("INTEGER", "number");
		typesHashMap.put("INT", "number");
		typesHashMap.put("SMALLINT", "number");
		typesHashMap.put("TINYINT", "number");
		typesHashMap.put("MEDIUMINT", "number");
		typesHashMap.put("BIGINT", "number");
		typesHashMap.put("DECIMAL", "number");
		typesHashMap.put("NUMERIC", "number");
		typesHashMap.put("FLOAT", "number");
		typesHashMap.put("DOUBLE", "number");
		
		typesHashMap.put("DATE", "Date");
		typesHashMap.put("TIME", "string"); 
		typesHashMap.put("TIMESTAMP", "string"); 
		
		defaultValueOfType.put("CHAR", "\"\"");
		defaultValueOfType.put("VARCHAR", "\"\"");
		defaultValueOfType.put("BINARY", "\"\"");
		defaultValueOfType.put("VARBINARY", "\"\"");
		defaultValueOfType.put("BLOB", "\"\"");
		defaultValueOfType.put("TEXT", "\"\"");
		defaultValueOfType.put("ENUM", "\"\"");
		defaultValueOfType.put("SET", "\"\"");
		
		defaultValueOfType.put("BIT", "0");
		defaultValueOfType.put("INTEGER", "0");
		defaultValueOfType.put("INT", "0");
		defaultValueOfType.put("SMALLINT", "0");
		defaultValueOfType.put("TINYINT", "0");
		defaultValueOfType.put("MEDIUMINT", "0");
		defaultValueOfType.put("BIGINT", "0");
		defaultValueOfType.put("DECIMAL", "0");
		defaultValueOfType.put("NUMERIC", "0");
		defaultValueOfType.put("FLOAT", "0");
		defaultValueOfType.put("DOUBLE", "0");
		
		defaultValueOfType.put("DATE", "new Date()");
		defaultValueOfType.put("TIME", "00:00:00");
		defaultValueOfType.put("TIMESTAMP", "new Date().toString()");
		
		mapSQLtypeToInputType.put("CHAR", "text");
		mapSQLtypeToInputType.put("VARCHAR", "text");
		mapSQLtypeToInputType.put("BINARY", "text");
		mapSQLtypeToInputType.put("VARBINARY", "text");
		mapSQLtypeToInputType.put("BLOB", "text");
		mapSQLtypeToInputType.put("TEXT", "text");
		mapSQLtypeToInputType.put("ENUM", "text");
		mapSQLtypeToInputType.put("SET", "text");
		
		mapSQLtypeToInputType.put("BIT", "number");
		mapSQLtypeToInputType.put("INTEGER", "number");
		mapSQLtypeToInputType.put("INT", "number");
		mapSQLtypeToInputType.put("SMALLINT", "number");
		mapSQLtypeToInputType.put("TINYINT", "number");
		mapSQLtypeToInputType.put("MEDIUMINT", "number");
		mapSQLtypeToInputType.put("BIGINT", "number");
		mapSQLtypeToInputType.put("DECIMAL", "number");
		mapSQLtypeToInputType.put("NUMERIC", "number");
		mapSQLtypeToInputType.put("FLOAT", "number");
		mapSQLtypeToInputType.put("DOUBLE", "number");
		
		mapSQLtypeToInputType.put("DATE", "date");
		mapSQLtypeToInputType.put("TIME", "time"); 
		mapSQLtypeToInputType.put("TIMESTAMP", "datetime-local"); 
		
		
	}

	public TypeGenerator() {
		
	}

}
