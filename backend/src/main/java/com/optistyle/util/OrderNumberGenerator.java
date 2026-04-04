package com.optistyle.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class OrderNumberGenerator {

    public static String generateOrderNumber() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String timestamp = now.format(formatter);
        String uuidPart = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "CMD-" + timestamp + "-" + uuidPart;
    }
}
