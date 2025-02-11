package com.master.codegenerator.utils;


public class StringUtils {

	public StringUtils() {
		// TODO Auto-generated constructor stub
	}
	
	public static String firstLatterToUppercase(String string)
	{
		return string.substring(0, 1).toUpperCase() + string.substring(1);
	}
	public static String firstLatterToLowercase(String string)
	{
		return string.substring(0, 1).toLowerCase() + string.substring(1);
	}

	public static String convertToCamelCase(String snakeCase) {
		StringBuilder camelCase = new StringBuilder();
		boolean nextIsUpper = false;

		for (int i = 0; i < snakeCase.length(); i++) {
			char currentChar = snakeCase.charAt(i);

			if (currentChar == '_') {
				nextIsUpper = true;
			} else {
				if (nextIsUpper) {
					camelCase.append(Character.toUpperCase(currentChar));
					nextIsUpper = false;
				} else {
					camelCase.append(Character.toLowerCase(currentChar));
				}
			}
		}
		return camelCase.toString();
	}
}
