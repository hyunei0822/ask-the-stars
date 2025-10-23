import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import Home from './pages/Home';
import ArtistProfile from './pages/ArtistProfile';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import CreateService from './pages/CreateService';
import CreatePost from './pages/CreatePost';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // 컴포넌트 마운트 시 localStorage에서 로그인 상태 복원
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  // currentUser가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

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
                    currentUser={currentUser}
                    onScrollToArtists={true}
                  />
                } 
              />
              <Route 
                path="/artist/:id" 
                element={<ArtistProfile />} 
              />
              <Route 
                path="/mypage" 
                element={<MyPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} 
              />
              <Route 
                path="/login" 
                element={<Login setCurrentUser={setCurrentUser} />} 
              />
              <Route 
                path="/create-service" 
                element={<CreateService />} 
              />
              <Route 
                path="/create-post" 
                element={<CreatePost />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
