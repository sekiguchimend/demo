import React, { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, Heart, MessageCircle, Share2, Bookmark, Plus, User, Image, Zap, Flame, Sun, Moon, Droplets, Filter, Send } from 'lucide-react';

const HomePage = () => {
  // ステート
  const [activeFilter, setActiveFilter] = useState(null);
  const [likedPosts, setLikedPosts] = useState([2]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showFilterPreview, setShowFilterPreview] = useState(false);
  const [previewFilter, setPreviewFilter] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // コメント関連のステート
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  
  // ページ読み込みアニメーション
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 初期コメントデータのロード
  useEffect(() => {
    // 初期コメントデータをセット
    const initialComments = {
      1: [
        { id: 1, user: "@creative_fan", userName: "ハルカ", avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=70&h=70&auto=format&fit=crop&q=80", text: "このフィルターすごくいい感じ！使ってみたい！", timeAgo: "45分前" },
        { id: 2, user: "@photo_newbie", userName: "ソウタ", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=70&h=70&auto=format&fit=crop&q=80", text: "光の当たり方が絶妙ですね✨", timeAgo: "30分前" }
      ],
      2: [
        { id: 1, user: "@rain_walker", userName: "アイコ", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=70&h=70&auto=format&fit=crop&q=80", text: "雨の日フィルター使ってみました！本当に雰囲気出てすごい🌧", timeAgo: "2時間前" },
        { id: 2, user: "@city_explorer", userName: "レン", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=70&h=70&auto=format&fit=crop&q=80", text: "青みがかった色合いが好きです。フィルターの調整具合を教えてもらえますか？", timeAgo: "1時間前" },
        { id: 3, user: "@filter_master", userName: "マイカ", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&auto=format&fit=crop&q=80", text: "コントラスト110%、彩度90%、色相190度に設定してます！詳細はプロフィールのリンクから見てください💙", timeAgo: "30分前" }
      ],
      3: [
        { id: 1, user: "@architecture_love", userName: "ケイト", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=70&h=70&auto=format&fit=crop&q=80", text: "モノクロームでこの建物の質感がより際立ってますね！素晴らしい一枚です📸", timeAgo: "3時間前" }
      ],
      4: [
        { id: 1, user: "@nature_child", userName: "ミキ", avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=70&h=70&auto=format&fit=crop&q=80", text: "夕焼けの色がとても美しいです！このフィルターほしい！", timeAgo: "6時間前" },
        { id: 2, user: "@travel_pics", userName: "ダイキ", avatar: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=70&h=70&auto=format&fit=crop&q=80", text: "旅行写真にピッタリですね。私も試してみます✈️", timeAgo: "4時間前" }
      ]
    };
    
    setComments(initialComments);
  }, []);

  // フォーマット用のヘルパー関数
  const formatNumber = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num;
  };
  
  // いいねの切り替え
  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      displayNotification('投稿にいいねしました');
    }
  };
  
  // 保存の切り替え
  const toggleSave = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
      displayNotification('投稿を保存しました');
    }
  };
  
  // フィルターの使用
  const useFilter = (filter) => {
    setActiveFilter(filter);
    displayNotification(`${filter.name}フィルターを適用しました`);
  };
  
  // フィルタープレビューを表示
  const showFilterInfo = (filter) => {
    setPreviewFilter(filter);
    setShowFilterPreview(true);
  };
  
  // 通知の表示
  const displayNotification = (text) => {
    setNotificationText(text);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // コメントの表示/非表示を切り替え
  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // コメント入力の更新
  const handleCommentInput = (postId, text) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: text
    }));
  };

  // コメントを投稿
  const postComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || commentText.trim() === '') return;

    const newComment = {
      id: (comments[postId]?.length || 0) + 1,
      user: "@your_username",
      userName: "あなた",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=70&h=70&auto=format&fit=crop&q=80",
      text: commentText,
      timeAgo: "たった今"
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    // 入力をクリア
    setCommentInputs(prev => ({
      ...prev,
      [postId]: ""
    }));

    displayNotification('コメントを投稿しました');
  };
  
  // 人気のフィルター一覧
  const popularFilters = [
    { 
      id: 1, 
      name: "サイバーパンク", 
      creator: "@neon_designer", 
      downloads: 32150,
      icon: <Flame size={18} className="text-pink-500" />,
      style: { filter: 'brightness(110%) contrast(150%) saturate(140%) hue-rotate(275deg)' }
    },
    { 
      id: 2, 
      name: "夏の思い出", 
      creator: "@summer_vibes", 
      downloads: 28764,
      icon: <Sun size={18} className="text-amber-500" />,
      style: { filter: 'brightness(105%) sepia(30%) saturate(120%) hue-rotate(15deg)' }
    },
    { 
      id: 3, 
      name: "モノクローム＋", 
      creator: "@mono_master", 
      downloads: 19532,
      icon: <Moon size={18} className="text-gray-700" />,
      style: { filter: 'grayscale(100%) contrast(120%)' }
    },
    { 
      id: 4, 
      name: "アニメスタイル", 
      creator: "@anime_lover", 
      downloads: 15678,
      icon: <Zap size={18} className="text-blue-500" />,
      style: { filter: 'brightness(108%) contrast(115%) saturate(150%) hue-rotate(350deg)' }
    },
    { 
      id: 5, 
      name: "レトロ", 
      creator: "@vintage_lover", 
      downloads: 12345,
      icon: <Image size={18} className="text-red-500" />,
      style: { filter: 'brightness(105%) sepia(40%) contrast(105%) saturate(85%)' }
    },
    { 
      id: 6, 
      name: "クールブルー", 
      creator: "@cool_visions", 
      downloads: 9876,
      icon: <Droplets size={18} className="text-blue-500" />,
      style: { filter: 'brightness(100%) contrast(110%) saturate(110%) hue-rotate(190deg)' }
    }
  ];
  
  // モックデータ - 投稿
  const feedPosts = [
    {
      id: 1,
      user: "@creative_mind",
      userName: "ユウキ",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=70&h=70&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "ネオンナイト",
      filterCreator: "@tech_artist",
      likes: 843,
      comments: 42,
      caption: "新しく作ったフィルターで撮ってみた！光の加減がお気に入り✨ #オリジナルフィルター #創作",
      timeAgo: "1時間前",
      filterStyle: { filter: 'brightness(110%) contrast(120%) saturate(140%) hue-rotate(30deg)' },
      filterIcon: <Flame size={16} className="text-orange-500" />
    },
    {
      id: 2,
      user: "@filter_master",
      userName: "マイカ",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=70&h=70&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "自作：雨の日",
      filterCreator: "@filter_master",
      likes: 1567,
      comments: 78,
      caption: "雨の日用フィルター完成しました！少し青みがかった色調と水滴エフェクトを追加してみました。ぜひ使ってみてください！ #フィルター配布 #雨の日",
      timeAgo: "3時間前",
      filterStyle: { filter: 'brightness(95%) contrast(110%) saturate(90%) hue-rotate(190deg)' },
      filterIcon: <Droplets size={16} className="text-blue-500" />
    },
    {
      id: 3,
      user: "@photo_lover",
      userName: "タケル",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=70&h=70&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "モノクローム＋",
      filterCreator: "@mono_master",
      likes: 612,
      comments: 23,
      caption: "モノクロームフィルターが繊細な質感を引き出してくれる。建築写真にぴったり。 #モノクローム #建築 #都市",
      timeAgo: "5時間前",
      filterStyle: { filter: 'grayscale(100%) contrast(120%) brightness(110%)' },
      filterIcon: <Moon size={16} className="text-gray-700" />
    },
    {
      id: 4,
      user: "@sunset_chaser",
      userName: "リナ",
      avatar: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=70&h=70&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&auto=format&fit=crop&q=60",
      filter: "サンセットドリーム",
      filterCreator: "@sunset_chaser",
      likes: 972,
      comments: 56,
      caption: "夕暮れの空の色彩をそのまま表現できるフィルターを作りました。暖かみのある色調で日常の一瞬を特別なものに。 #夕焼け #サンセット #フィルター作成",
      timeAgo: "8時間前",
      filterStyle: { filter: 'brightness(102%) contrast(108%) saturate(130%) sepia(15%) hue-rotate(350deg)' },
      filterIcon: <Sun size={16} className="text-amber-500" />
    }
  ];

  // フィルタープレビュー用の画像
  const filterPreviewImages = [
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1576611209860-e47b2d3f1cc1?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&auto=format&fit=crop&q=60"
  ];
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ローディングオーバーレイ */}
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-b-indigo-600 border-l-transparent border-r-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Filter size={24} className="text-purple-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            FilterCraft
          </h2>
          <p className="text-gray-500 mt-2 text-sm">インスピレーションを発見中...</p>
        </div>
      )}
  
      {/* フィルタープレビューモーダル */}
      {showFilterPreview && previewFilter && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-md shadow-2xl animate-fadeIn">
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={filterPreviewImages[previewFilter.id % filterPreviewImages.length]} 
                alt={previewFilter.name} 
                className="w-full h-full object-cover"
                style={previewFilter.style}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center mb-1">
                  {previewFilter.icon}
                  <h3 className="font-bold text-white ml-2">{previewFilter.name}</h3>
                </div>
                <p className="text-white/80 text-sm">by {previewFilter.creator}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Sparkles size={14} className="mr-1 text-purple-500" />
                    {formatNumber(previewFilter.downloads)} ダウンロード
                  </p>
                </div>
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
                  onClick={() => {
                    useFilter(previewFilter);
                    setShowFilterPreview(false);
                  }}
                >
                  <Zap size={16} className="mr-1" />
                  使用する
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1510000000000 + i * 1000}?w=100&h=100&auto=format&fit=crop&q=60`} 
                      alt="サンプル" 
                      className="w-full h-full object-cover"
                      style={previewFilter.style}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&auto=format&fit=crop&q=60";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 pt-0 flex justify-end">
              <button 
                className="text-gray-500 px-4 py-2 rounded-md text-sm"
                onClick={() => setShowFilterPreview(false)}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* 通知トースト */}
      {showNotification && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center">
            <Sparkles size={16} className="mr-2 text-purple-400" />
            {notificationText}
          </div>
        </div>
      )}
      
      {/* ヘッダー - 固定 */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 backdrop-blur-md bg-white/90">
        <div className="max-w-screen-md mx-auto p-3 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            FilterCraft
          </h2>
          <div className="flex space-x-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* フィルターリスト */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200 mb-3">
        <div className="max-w-screen-md mx-auto px-4 py-3">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex-shrink-0 w-16 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 p-[2px] flex items-center justify-center cursor-pointer shadow-md transform transition-transform hover:scale-105">
                <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center">
                  <Plus size={22} className="text-purple-600" />
                </div>
              </div>
              <span className="text-xs mt-1 truncate w-full text-center font-medium">新規作成</span>
            </div>
            
            {popularFilters.map((filter, index) => (
              <div key={filter.id} className="flex-shrink-0 w-16 flex flex-col items-center">
                <button 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px] shadow-md transform transition-transform hover:scale-105"
                  onClick={() => showFilterInfo(filter)}
                >
                  <div className="w-full h-full rounded-full bg-white p-[2px] flex items-center justify-center bg-gray-200 overflow-hidden">
                    <img 
                      src={filterPreviewImages[index % filterPreviewImages.length]} 
                      alt={filter.name}
                      className="w-full h-full object-cover rounded-full"
                      style={filter.style}
                    />
                  </div>
                </button>
                <span className="text-xs mt-1 truncate w-full text-center font-medium">
                  {filter.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* メインコンテンツエリア - 写真サイズ調整 */}
      <div className="max-w-screen-md mx-auto px-4 pb-20">
        {feedPosts.map(post => (
          <div key={post.id} className="bg-white mb-6 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
            <div className="p-3 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-purple-100">
                <img 
                  src={post.avatar} 
                  alt={post.user}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="font-semibold text-sm">{post.userName}</p>
                  <p className="text-xs text-gray-500 ml-1">{post.user}</p>
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  {post.filterIcon}
                  <span className="ml-1">{post.filter} by {post.filterCreator}</span>
                </p>
              </div>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
            </div>
            
            {/* 写真コンテナ - サイズ制限を追加 */}
            <div className="relative mx-auto" style={{ maxWidth: "500px" }}>
              <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={post.image} 
                  alt={`${post.user}の投稿`}
                  className="w-full h-full object-cover"
                  style={post.filterStyle}
                />
              </div>
              <button 
                className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center transition-all hover:bg-black/80"
                onClick={() => {
                  useFilter({
                    id: post.id,
                    name: post.filter,
                    creator: post.filterCreator,
                    style: post.filterStyle,
                    icon: post.filterIcon
                  });
                }}
              >
                <Sparkles size={14} className="mr-1.5 text-purple-400" /> 
                このフィルターを使う
              </button>
            </div>
            
            <div className="p-4 mx-auto" style={{ maxWidth: "500px" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`flex items-center transform transition-transform active:scale-90 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-700'}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart size={22} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    className={`flex items-center transform transition-transform active:scale-90 ${expandedComments[post.id] ? 'text-purple-500' : 'text-gray-700'}`}
                    onClick={() => toggleComments(post.id)}
                  >
                    <MessageCircle size={22} />
                  </button>
                  <button className="flex items-center text-gray-700 transform transition-transform active:scale-90">
                    <Share2 size={22} />
                  </button>
                </div>
                <button 
                  className={`transform transition-transform active:scale-90 ${savedPosts.includes(post.id) ? 'text-purple-500' : 'text-gray-700'}`}
                  onClick={() => toggleSave(post.id)}
                >
                  <Bookmark size={22} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              <p className="text-sm font-semibold mb-2">{formatNumber(likedPosts.includes(post.id) ? post.likes + 1 : post.likes)} いいね</p>
              <p className="text-sm mb-1">
                <span className="font-semibold">{post.userName}</span> {post.caption}
              </p>
              <button 
                className="text-xs text-gray-500 mt-2 hover:text-gray-700"
                onClick={() => toggleComments(post.id)}
              >
                コメント{comments[post.id]?.length || 0}件{expandedComments[post.id] ? 'を隠す' : 'をすべて見る'}
              </button>
              <p className="text-xs text-gray-400 mt-2">{post.timeAgo}</p>
  
              {/* コメントセクション */}
              {expandedComments[post.id] && (
                <div className="mt-3 border-t border-gray-100 pt-3">
                  {/* コメント一覧 */}
                  <div className="space-y-3 mb-3">
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="flex items-start">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                          <img 
                            src={comment.avatar} 
                            alt={comment.user}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-baseline">
                            <p className="text-sm font-medium">{comment.userName}</p>
                            <p className="text-xs text-gray-500 ml-1">{comment.user}</p>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                          <p className="text-xs text-gray-400 mt-1">{comment.timeAgo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* コメント入力フォーム */}
                  <div className="flex items-center mt-3 bg-gray-50 rounded-full p-1 pr-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=70&h=70&auto=format&fit=crop&q=80" 
                        alt="あなたのアイコン"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input 
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentInput(post.id, e.target.value)}
                      className="flex-1 bg-transparent text-sm focus:outline-none py-2"
                      placeholder="コメントを追加..."
                      onKeyPress={(e) => e.key === 'Enter' && postComment(post.id)}
                    />
                    <button 
                      onClick={() => postComment(post.id)}
                      className={`ml-2 text-purple-600 ${!commentInputs[post.id] ? 'opacity-50 cursor-not-allowed' : 'hover:text-purple-700'}`}
                      disabled={!commentInputs[post.id]}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
  
      {/* スタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
  
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
  
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
export default HomePage;