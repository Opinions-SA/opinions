package com.opinions.service;

import java.lang.reflect.Field;

public class BasicService {

    public class ObjectUtils {

        public static <T> void emptyToNull(T obj) {
            Class<?> clazz = obj.getClass();
            Field[] fields = clazz.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object value = field.get(obj);
                    if (value instanceof String && ((String) value).isEmpty()) {
                        field.set(obj, null);
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
