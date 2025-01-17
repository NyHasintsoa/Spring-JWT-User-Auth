package com.exercise;

import java.util.List;

import com.exercise.model.Product;
import com.exercise.response.ApiResponse;
import com.exercise.service.ApiService;
import com.exercise.utils.ApiClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Run => mvn exec:java
 */
public class App {
    public static void main(String[] args) {
        try {
            ApiService apiService = ApiClient.getClient().create(ApiService.class);

            /*
             * GET ALL PRODUCTS
             */
            Call<ApiResponse<List<Product>>> callAllProduct = apiService.getAllProducts();
            callAllProduct.enqueue(new Callback<ApiResponse<List<Product>>>() {
                @Override
                public void onResponse(
                        Call<ApiResponse<List<Product>>> call,
                        Response<ApiResponse<List<Product>>> response) {
                }

                @Override
                public void onFailure(
                        Call<ApiResponse<List<Product>>> call,
                        Throwable t) {
                }
            });

            System.out.println("#########################################");
            System.out.println("TRAIT DE SEPARATION DE 2 REQUÊTES HTTP");
            System.out.println("#########################################");

            /*
             * GET PRODUCT BY ID
             */
            Call<ApiResponse<Product>> callProductById = apiService.getProductById("d586031af6");
            callProductById.enqueue(new Callback<ApiResponse<Product>>() {
                @Override
                public void onResponse(Call<ApiResponse<Product>> call, Response<ApiResponse<Product>> response) {

                }

                @Override
                public void onFailure(Call<ApiResponse<Product>> call, Throwable T) {

                }
            });
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
