import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Nav";
import Products from "./Components/Products";
import ProductDetail from "./Components/ProductDetail";
import Contact from "./Components/Contact"; 

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/contacts" element={<Contact />} /> {/* "/contacts" yo'li ishlatilmoqda */}
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;
