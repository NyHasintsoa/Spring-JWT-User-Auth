package com.exercise.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private String id;

    private String name;

    private Double price;

    private String image;

    private Date createdAt;

    private Date updatedAt;

    @Override
    public String toString() {
        return "id => " + id + ", name => " + name;
    }

}
