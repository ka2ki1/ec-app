<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'シンプルTシャツ', 'description' => '綿100%の定番Tシャツです。', 'price' => 2500, 'stock' => 30, 'image_url' => null],
            ['name' => 'デニムパンツ', 'description' => '丈夫でカジュアルなデニムパンツ。', 'price' => 6800, 'stock' => 15, 'image_url' => null],
            ['name' => 'スニーカー', 'description' => '軽量で歩きやすいスニーカー。', 'price' => 8900, 'stock' => 10, 'image_url' => null],
            ['name' => 'レザーバッグ', 'description' => '本革を使用したシンプルなバッグ。', 'price' => 15000, 'stock' => 5, 'image_url' => null],
            ['name' => 'ウールニット', 'description' => '暖かく肌触りの良いニットセーター。', 'price' => 7200, 'stock' => 20, 'image_url' => null],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
