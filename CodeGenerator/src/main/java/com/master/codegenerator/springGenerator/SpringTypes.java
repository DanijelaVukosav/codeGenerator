package com.master.codegenerator.springGenerator;
import java.util.HashMap;

public class SpringTypes {
    public static HashMap<String, String> sqlToSpringTypesMap =new HashMap<String, String>();
    static {
        sqlToSpringTypesMap.put("CHAR", "String");
        sqlToSpringTypesMap.put("VARCHAR", "String");
        sqlToSpringTypesMap.put("BINARY", "String");
        sqlToSpringTypesMap.put("VARBINARY", "String");
        sqlToSpringTypesMap.put("BLOB", "String");
        sqlToSpringTypesMap.put("TEXT", "String");
        sqlToSpringTypesMap.put("ENUM", "String");
        sqlToSpringTypesMap.put("SET", "String");

        sqlToSpringTypesMap.put("BIT", "Integer");
        sqlToSpringTypesMap.put("INTEGER", "Integer");
        sqlToSpringTypesMap.put("INT", "Integer");
        sqlToSpringTypesMap.put("SMALLINT", "Integer");
        sqlToSpringTypesMap.put("TINYINT", "Integer");
        sqlToSpringTypesMap.put("MEDIUMINT", "Integer");
        sqlToSpringTypesMap.put("BIGINT", "Long");
        sqlToSpringTypesMap.put("DECIMAL", "Double");
        sqlToSpringTypesMap.put("NUMERIC", "Double");
        sqlToSpringTypesMap.put("FLOAT", "Float");
        sqlToSpringTypesMap.put("DOUBLE", "Double");

        sqlToSpringTypesMap.put("DATE", "Date");
        sqlToSpringTypesMap.put("TIME", "Date");
        sqlToSpringTypesMap.put("TIMESTAMP", "Date");
        sqlToSpringTypesMap.put("DATETIME", "LocalDateTime");
    }

    public SpringTypes() {

    }

}
