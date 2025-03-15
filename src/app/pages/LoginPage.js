// pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // ページ読み込み時のアニメーション
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert('メールアドレスとパスワードを入力してください');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 px-6 py-10">
      <div className={`w-full max-w-md transition-all duration-500 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold mb-3 tracking-tight">FilterCraft</h1>
          <p className="text-purple-200 text-lg">自分だけのフィルターを作って、世界と共有しよう</p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">ログイン</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-purple-500" />
                </div>
                <input 
                  type="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-3 transition-all duration-200" 
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-purple-500" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-10 p-3 transition-all duration-200" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-500 hover:text-purple-500 transition-colors" />
                  ) : (
                    <Eye size={18} className="text-gray-500 hover:text-purple-500 transition-colors" />
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
            >
              <LogIn size={18} className="mr-2" />
              ログイン
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800 transition-colors">パスワードをお忘れですか？</a>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center">
          <p className="text-gray-700">アカウントをお持ちでない方は 
            <a href="#" className="text-purple-600 font-medium ml-1 inline-flex items-center group">
              新規登録
              <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </p>
        </div>
        
        <div className="mt-10 flex justify-center space-x-6">
          <a href="#" className="text-sm text-white hover:text-purple-200 transition-colors">利用規約</a>
          <a href="#" className="text-sm text-white hover:text-purple-200 transition-colors">プライバシーポリシー</a>
          <a href="#" className="text-sm text-white hover:text-purple-200 transition-colors">ヘルプ</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;