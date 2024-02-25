package com.master.codegenerator.generator;

import com.master.codegenerator.models.Column;
import com.master.codegenerator.models.Table;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public class TableGenerator {

	public static HashMap<String, Table> tables = new HashMap<String, Table>();

	public static HashMap<String, ArrayList<String>> mapOfTableRelationships = new HashMap<String, ArrayList<String>>();

	public TableGenerator() {
		// TODO Auto-generated constructor stub
	}

	public static void generateTables(DatabaseMetaData databaseMetaData, String schema) {
		System.out.println(schema);

		try (ResultSet resultSet = databaseMetaData.getTables(schema, null, null, new String[] { "TABLE" })) {
			while (resultSet.next()) {
				String tableName = resultSet.getString("TABLE_NAME");
				Table newTable = new Table();
				newTable.setTableName(tableName);
				HashMap<String, String> foreignKeys = new HashMap<String, String>();
				ResultSet rs = databaseMetaData.getImportedKeys(null, null, tableName);
				
				while (rs.next()) {
					foreignKeys.put(rs.getString("FKCOLUMN_NAME"), rs.getString("PKTABLE_NAME"));
				}
				
				ResultSet pkColumns = databaseMetaData.getPrimaryKeys(null, null, tableName);
				ArrayList<String> primaryKeys = new ArrayList<String>();
				
				while (pkColumns.next()) {
					primaryKeys.add(pkColumns.getString("COLUMN_NAME"));
				}
				
				try (ResultSet columns = databaseMetaData.getColumns(null, null, tableName, null)) {
					while (columns.next()) {
						Column column = new Column();
						String columnName = columns.getString("COLUMN_NAME");
						column.setColumnName(columnName);
						column.setColumnSize(Integer.parseInt(columns.getString("COLUMN_SIZE")));
						column.setColumnType(columns.getString("TYPE_NAME"));
						column.setColumnIsNullable("YES".equals(columns.getString("IS_NULLABLE")) ? true : false);
						column.setColumnIsAutoIncrement(
								"YES".equals(columns.getString("IS_AUTOINCREMENT")) ? true : false);
						column.setTableName(tableName);
						column.setPrimaryKey(primaryKeys.contains(columnName));
						if (foreignKeys.containsKey(columnName)) {
							String foreignTableName = foreignKeys.get(columnName);
							System.out.println("Foreeeeeeeign table " + foreignTableName);
							column.setIsForignKey(true);
							column.setForeignTableName(foreignTableName);
							if (mapOfTableRelationships.containsKey(foreignTableName)) {
								mapOfTableRelationships.get(foreignTableName).add(tableName);
							} else {
								ArrayList<String> newList = new ArrayList<String>();
								newList.add(tableName);
								mapOfTableRelationships.put(foreignTableName, newList);
							}
						} else {
							column.setIsForignKey(false);
						}
						newTable.addColumn(column);
					}
				}
				System.out.println(tableName);
				tables.put(tableName, newTable);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
