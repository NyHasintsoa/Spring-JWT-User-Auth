package com.group.exercise.project.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class GenerateId {

    /**
     * Generate a id by an input string
     * @param input Input String to generate the key
     * @param length Length of the id generated
     * @return Return the string to be generated
     */
    public static String generateConstanteLengthId(String input) {
        // Créer un hashage SHA-256
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest((generateUUID() + input).getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static String generateUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
