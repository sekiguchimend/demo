// pages/HomePage.js
import React from 'react';
import { Search, Bell, Sparkles, Heart, MessageCircle, Share2, Bookmark, Plus, User } from 'lucide-react';

const HomePage = () => {
  // フォーマット用のヘルパー関数
  const formatNumber = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
  };
  
  // 人気のフィルター一覧
  const popularFilters = [
    { id: 1, name: "サイバーパンク", creator: "@neon_designer", downloads: 32150 },
    { id: 2, name: "夏の思い出", creator: "@summer_vibes", downloads: 28764 },
    { id: 3, name: "モノクローム＋", creator: "@mono_master", downloads: 19532 },
    { id: 4, name: "アニメスタイル", creator: "@anime_lover", downloads: 15678 }
  ];
  
  // モックデータ - 投稿
  const feedPosts = [
    {
      id: 1,
      user: "@creative_mind",
      avatar: "/api/placeholder/35/35",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "ネオンナイト",
      filterCreator: "@tech_artist",
      likes: 843,
      comments: 42,
      caption: "新しく作ったフィルターで撮ってみた！光の加減がお気に入り✨ #オリジナルフィルター #創作",
      timeAgo: "1時間前",
      filterStyle: { filter: 'brightness(110%) contrast(120%) saturate(140%)' }
    },
    {
      id: 2,
      user: "@filter_master",
      avatar: "/api/placeholder/35/35",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "自作：雨の日",
      filterCreator: "@filter_master",
      likes: 1567,
      comments: 78,
      caption: "雨の日用フィルター完成しました！少し青みがかった色調と水滴エフェクトを追加してみました。ぜひ使ってみてください！ #フィルター配布 #雨の日",
      timeAgo: "3時間前",
      filterStyle: { filter: 'brightness(95%) contrast(110%) saturate(90%) hue-rotate(190deg)' }
    },
    {
      id: 3,
      user: "@photo_lover",
      avatar: "/api/placeholder/35/35",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "モノクローム＋",
      filterCreator: "@mono_master",
      likes: 612,
      comments: 23,
      caption: "モノクロームフィルターが繊細な質感を引き出してくれる。建築写真にぴったり。 #モノクローム #建築 #都市",
      timeAgo: "3時間前",
      filterStyle: { filter: 'grayscale(100%) contrast(120%) brightness(110%)' }
    }
  ];

  // アバター画像コレクション
  const avatarImages = [
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=70&h=70&auto=format&fit=crop&q=80", 
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=70&h=70&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=70&h=70&auto=format&fit=crop&q=80"
  ];

  // フィルタープレビュー用の画像
  const filterPreviewImages = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1576611209860-e47b2d3f1cc1?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=100&h=100&auto=format&fit=crop&q=60"
  ];

  // フィルタースタイル
  const filterStyles = [
    { filter: 'brightness(110%) contrast(150%) saturate(140%)' },
    { filter: 'brightness(105%) sepia(30%) saturate(120%)' },
    { filter: 'grayscale(100%) contrast(120%)' },
    { filter: 'hue-rotate(40deg) brightness(102%) saturate(110%)' }
  ];

  return (
    // スタイル適用のため、div要素はそのままにして、必要なスタイルを追加
    <div className="bg-gray-100" style={{ height: "100vh", overflow: "auto" }}>
      {/* ヘッダー - 固定 */}
      <div className="sticky top-0 z-10 bg-white border-b w-full">
        <div className="max-w-screen-md mx-auto p-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">FilterCraft</h2>
          <div className="flex space-x-3">
            <button className="p-2">
              <Search size={20} />
            </button>
            <button className="p-2">
              <Bell size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* フィルターリスト */}
      <div className="w-full border-b bg-white">
        <div className="max-w-screen-md mx-auto p-3">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <div className="flex-shrink-0 w-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-[2px] flex items-center justify-center cursor-pointer">
                <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center">
                  <Plus size={20} className="text-purple-600" />
                </div>
              </div>
              <span className="text-xs mt-1 truncate w-full text-center">新規作成</span>
            </div>
            
            {popularFilters.map((filter, index) => (
              <div key={index} className="flex-shrink-0 w-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center bg-gray-200 overflow-hidden">
                    <img 
                      src={filterPreviewImages[index % filterPreviewImages.length]} 
                      alt={filter.name}
                      className="w-full h-full object-cover rounded-full"
                      style={filterStyles[index % filterStyles.length]}
                    />
                  </div>
                </div>
                <span className="text-xs mt-1 truncate w-full text-center">{filter.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* メインコンテンツエリア */}
      <div className="max-w-screen-md mx-auto">
        {feedPosts.map(post => (
          <div key={post.id} className="bg-white mb-3 border-b">
            <div className="p-3 flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img 
                  src={avatarImages[(post.id - 1) % avatarImages.length]} 
                  alt={post.user}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{post.user}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Sparkles size={10} className="mr-1 text-purple-400" />
                  {post.filter} by {post.filterCreator}
                </p>
              </div>
              <button className="text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
            
            <div className="relative">
              {/* 投稿画像 - 正方形に固定して中央配置 */}
              <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={post.image} 
                  alt={`${post.user}の投稿`}
                  className="w-full h-full object-cover"
                  style={post.filterStyle}
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Sparkles size={12} className="mr-1 text-purple-400" /> 
                <button className="text-white text-xs">このフィルターを使う</button>
              </div>
            </div>
            
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-4">
                  <button className="flex items-center">
                    <Heart size={22} className={post.id === 2 ? "text-red-500" : "text-gray-800"} />
                  </button>
                  <button className="flex items-center">
                    <MessageCircle size={22} className="text-gray-800" />
                  </button>
                  <button className="flex items-center">
                    <Share2 size={22} className="text-gray-800" />
                  </button>
                </div>
                <button>
                  <Bookmark size={22} className="text-gray-800" />
                </button>
              </div>
              
              <p className="text-sm font-semibold mb-1">{formatNumber(post.likes)}いいね</p>
              <p className="text-sm">
                <span className="font-semibold">{post.user}</span> {post.caption}
              </p>
              <p className="text-xs text-gray-500 mt-1">コメント{post.comments}件をすべて見る</p>
              <p className="text-xs text-gray-400 mt-2">{post.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;