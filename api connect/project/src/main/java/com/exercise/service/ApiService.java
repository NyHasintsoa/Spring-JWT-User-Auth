package com.exercise.service;

import java.util.List;

import com.exercise.model.Product;
import com.exercise.response.ApiResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiService {

    @GET("products")
    Call<ApiResponse<List<Product>>> getAllProducts();

    @GET("products/{id}")
    Call<ApiResponse<Product>> getProductById(@Path("id") String id);

}
