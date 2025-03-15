"use client"
import React, { useState, useEffect } from 'react';
import { User, X, Camera, Save, ArrowLeft, Sparkles, Check, Mail, AtSign, Edit3, Lock, BellRing, Globe } from 'lucide-react';
import { useRouter } from "next/navigation";

const ProfileEditPage = () => {
  // ユーザープロフィールの状態
  const [profile, setProfile] = useState({
    username: '@your_username',
    bio: 'フィルター作成とカメラエフェクトが好きです。オリジナルフィルターを公開中 ✨',
    displayName: 'ユーザー名',
    email:  'user@example.com',
  });
  
  // 戻るハンドラー
 

  // アニメーション用の状態
  const [animateIn, setAnimateIn] = useState(false);
  const [activeField, setActiveField] = useState(null);
  
  // 保存ボタンの状態
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // 画像アップロード用の参照
  const fileInputRef = React.useRef(null);

  // コンポーネントがマウントされた後にアニメーションを開始
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // 入力変更のハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 保存ボタンクリック時の処理
  const handleSave = () => {
    setIsSaving(true);
    
    // 保存アニメーション
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      
      // 実際の実装では、ここでAPIリクエストなどを行う
      console.log('保存されたプロフィール:', profile);
      
      // 保存成功アニメーションの後に閉じる
      setTimeout(() => {
        onClose(profile); // 更新されたプロフィール情報を親コンポーネントに渡す
      }, 1000);
    }, 1500);
  };

  // フォーカス時のハンドラー
  const handleFocus = (field) => {
    setActiveField(field);
  };

  // フォーカスアウト時のハンドラー
  const handleBlur = () => {
    setActiveField(null);
  };

  // 画像アップロードハンドラー
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };
  const router = useRouter()
  return (
    <div className={`fixed inset-0 bg-gray-50 z-50 overflow-y-auto transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* 背景の装飾的な要素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-purple-100 to-transparent rounded-full transform translate-x-16 -translate-y-24 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-indigo-100 to-transparent rounded-full transform -translate-x-8 translate-y-16 opacity-60"></div>
      </div>
      
      {/* ヘッダー */}
      <div className="bg-white p-4 border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => router.push("./")}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold flex-1 text-center">プロフィール編集</h1>
          <button 
            className={`relative overflow-hidden px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all ${isSaving ? 'bg-indigo-400 text-white w-24' : saved ? 'bg-green-500 text-white w-24' : 'bg-purple-600 text-white'}`}
            onClick={handleSave}
            disabled={isSaving || saved}
          >
            {isSaving ? (
              <div className="flex items-center justify-center w-full">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                <span>保存中...</span>
              </div>
            ) : saved ? (
              <div className="flex items-center justify-center w-full">
                <Check size={16} className="mr-1" />
                <span>保存完了!</span>
              </div>
            ) : (
              <>
                <Save size={16} className="mr-1" />
                保存
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto p-4">
        {/* プロフィール画像 */}
        <div className={`flex flex-col items-center mb-8 transform transition-all duration-500 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative mb-2 group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[3px] shadow-lg">
              <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center bg-gray-200 overflow-hidden">
                <User size={48} className="text-gray-400" />
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all group-hover:bg-opacity-20 rounded-full">
                  <div className="transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                    <div className="text-white text-xs font-medium">写真を変更</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg transform transition-transform hover:scale-110"
              onClick={handleImageUpload}
            >
              <Camera size={16} />
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => console.log('File selected:', e.target.files[0])}
            />
          </div>
          <div className="mt-2 bg-purple-50 text-xs text-purple-700 px-3 py-1 rounded-full font-medium">
            <span className="animate-pulse">✨</span> プロフィール写真をアップロード
          </div>
        </div>

        {/* フォーム */}
        <div className={`bg-white rounded-xl shadow-sm mb-6 overflow-hidden transition-all duration-500 delay-100 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="p-5 border-b relative">
            <div className="absolute top-5 left-5 text-gray-400">
              <AtSign size={18} />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-8">ユーザーネーム</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={handleBlur}
              className={`w-full p-2 pl-8 border rounded-lg transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${activeField === 'username' ? 'bg-purple-50' : 'bg-white'}`}
              placeholder="@username"
            />
          </div>
          
          <div className="p-5 border-b relative">
            <div className="absolute top-5 left-5 text-gray-400">
              <User size={18} />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-8">表示名</label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              onFocus={() => handleFocus('displayName')}
              onBlur={handleBlur}
              className={`w-full p-2 pl-8 border rounded-lg transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${activeField === 'displayName' ? 'bg-purple-50' : 'bg-white'}`}
              placeholder="表示名"
            />
          </div>
          
          <div className="p-5 border-b relative">
            <div className="absolute top-5 left-5 text-gray-400">
              <Mail size={18} />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-8">メールアドレス</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`w-full p-2 pl-8 border rounded-lg transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${activeField === 'email' ? 'bg-purple-50' : 'bg-white'}`}
              placeholder="email@example.com"
            />
          </div>
          
          <div className="p-5 relative">
            <div className="absolute top-5 left-5 text-gray-400">
              <Edit3 size={18} />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-8">自己紹介</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              onFocus={() => handleFocus('bio')}
              onBlur={handleBlur}
              className={`w-full p-3 pl-8 border rounded-lg transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent h-28 resize-none ${activeField === 'bio' ? 'bg-purple-50' : 'bg-white'}`}
              placeholder="自己紹介を入力してください"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">あなたについて簡単に説明してください（150文字以内）</p>
              <p className="text-xs font-medium text-purple-600">{profile.bio.length}/150</p>
            </div>
          </div>
        </div>
        
        {/* アカウント設定セクション */}
        <div className={`bg-white rounded-xl shadow-sm mb-6 overflow-hidden transition-all duration-500 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="p-5 border-b font-medium flex items-center">
            <Sparkles size={16} className="mr-2 text-purple-500" />
            アカウント設定
          </h3>
          
          <div className="p-5 border-b flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Lock size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">プライバシー設定</p>
                <p className="text-sm text-gray-500">アカウントの公開範囲を設定する</p>
              </div>
            </div>
            <button className="text-purple-600 text-sm py-1 px-3 rounded-lg hover:bg-purple-50 transition-colors">変更</button>
          </div>
          
          <div className="p-5 border-b flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <BellRing size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">通知設定</p>
                <p className="text-sm text-gray-500">通知の受け取り方を設定する</p>
              </div>
            </div>
            <button className="text-purple-600 text-sm py-1 px-3 rounded-lg hover:bg-purple-50 transition-colors">変更</button>
          </div>
          
          <div className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <Globe size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">言語設定</p>
                <p className="text-sm text-gray-500">アプリの表示言語を変更する</p>
              </div>
            </div>
            <button className="text-purple-600 text-sm py-1 px-3 rounded-lg hover:bg-purple-50 transition-colors">変更</button>
          </div>
        </div>
        
        {/* 追加のボタン */}
        <div className={`mt-6 space-y-3 transition-all duration-500 delay-300 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button className="w-full py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center">
            <Lock size={16} className="mr-2" />
            パスワードを変更
          </button>
          
          <button className="w-full py-3 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
            ログアウト
          </button>
        </div>
      </div>
      
      {/* フッター */}
      <div className={`text-center p-6 text-xs text-gray-500 transition-all duration-500 delay-400 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <p>© 2025 ✨ Filter App</p>
      </div>
    </div>
  );
};

export default ProfileEditPage;