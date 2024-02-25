package com.master.codegenerator.springGenerator;


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


}
