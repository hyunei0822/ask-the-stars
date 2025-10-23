import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Home from './pages/Home';
import ArtistProfile from './pages/ArtistProfile';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import { Artist } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <MobileHeader />
        <div className="flex">
          <Sidebar 
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onCategoryChange={setSelectedCategory}
            onSubcategoryChange={setSelectedSubcategory}
          />
          
          <main className="flex-1 ml-0 lg:ml-64 p-4 lg:p-6 pt-20 lg:pt-6">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                  />
                } 
              />
              <Route 
                path="/artist/:id" 
                element={<ArtistProfile />} 
              />
              <Route 
                path="/mypage" 
                element={<MyPage currentUser={currentUser} />} 
              />
              <Route 
                path="/login" 
                element={<Login setCurrentUser={setCurrentUser} />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
