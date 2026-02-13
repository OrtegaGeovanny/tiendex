"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getProducts } from "@/lib/firebase/products";
import { Product } from "@/lib/firebase/types";
import { Search, Plus, Package, Edit } from "lucide-react";

function ProductsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const uid = user?.uid;
    if (!uid) return;

    async function loadProducts() {
      try {
        const productsData = await getProducts(uid as string);
        setProducts(productsData);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [user]);

  const handleProductClick = (productId: string) => {
    router.push(`/dashboard/products/${productId}/edit`);
  };

  const handleAddProduct = () => {
    router.push("/dashboard/products/new");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">Manage your store&apos;s inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="pl-10 block w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No products found" : "No products yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? "Try a different search term"
              : "Get started by adding your first product"}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white rounded-lg shadow p-6 text-left hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {product.name}
                </h3>
                <Edit className="h-5 w-5 text-gray-400 ml-2" />
              </div>
              <p className="text-2xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Tap to edit details
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => window.history.back()}
                  className="text-gray-600 hover:text-gray-900 mr-4"
                >
                  ← Back
                </button>
                <h1 className="text-xl font-bold text-gray-900">TiendexApp</h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ProductsContent />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
