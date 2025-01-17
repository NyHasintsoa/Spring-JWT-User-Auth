package com.group.exercise.project.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class GenerateId {

    public static String generateConstanteLengthId(String input, Integer length) {
        // Créer un hashage SHA-256
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest((generateUUID() + input).getBytes());
            // Convertir le hachage en en chaîne hexadécimale
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            // Limiter à length caractères
            return hexString.toString().substring(0, length);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
