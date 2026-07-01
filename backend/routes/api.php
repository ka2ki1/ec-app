<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello from Laravel!']);
});

use App\Models\Product;

Route::get('/products', function () {
    return Product::all();
});

Route::get('/products/{id}', function ($id) {
    return Product::findOrFail($id);
});

use App\Http\Controllers\OrderController;

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{id}', [OrderController::class, 'show']);

Route::get('/orders', [OrderController::class, 'index']);
