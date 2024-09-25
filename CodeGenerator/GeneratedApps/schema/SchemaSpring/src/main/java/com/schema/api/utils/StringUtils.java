package com.schema.api.utils;

public class StringUtils {

    public static String changeFirstLatterToLoweCase(String str) {
        char[] charArray = str.toCharArray();
        for (int i = 0; i < charArray.length; i++) {
            if (Character.isUpperCase(charArray[i])) {
                charArray[i] = Character.toUpperCase(charArray[i]);
                break;
            }
        }
        return new String(charArray);
    }
}
