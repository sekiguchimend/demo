// pages/LoginPage.js
import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold mb-2">FilterCraft</h1>
          <p className="text-purple-200">自分だけのフィルターを作って、世界と共有しよう</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">ログイン</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2.5" 
                  placeholder="example@mail.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 pr-10 p-2.5" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center"
              onClick={onLogin}
            >
              <LogIn size={18} className="mr-2" />
              ログイン
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">パスワードをお忘れですか？</a>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-purple-200">アカウントをお持ちでない方は <a href="#" className="text-white font-medium">新規登録</a></p>
        </div>
        
        <div className="mt-10 flex justify-center space-x-4">
          <a href="#" className="text-xs text-purple-200 hover:text-white">利用規約</a>
          <a href="#" className="text-xs text-purple-200 hover:text-white">プライバシーポリシー</a>
          <a href="#" className="text-xs text-purple-200 hover:text-white">ヘルプ</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;