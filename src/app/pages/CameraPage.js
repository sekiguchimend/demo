// pages/CameraPage.js - パート1：インポートとステート設定
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Settings, RefreshCw, Image, Zap, Layers, Palette, FlipHorizontal, CameraOff, ChevronLeft, Heart, MessageCircle, Share2, Bookmark, Smile, Home } from 'lucide-react';
import Link from 'next/link';

const CameraPage = () => {
  // ステート変数
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  const [cameraError, setCameraError] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [gradientFilter, setGradientFilter] = useState('none');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    grayscale: 0,
    blur: 0,
    hueRotate: 0,
    invert: 0,
    opacity: 100,
  });
  const [videoElement, setVideoElement] = useState(null);
  
  // レイアウトの状態
  const [mode, setMode] = useState('camera'); // camera, preview, feed
  const [feedImages, setFeedImages] = useState([
    { id: 1, url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80', 
      user: 'アレックス', likes: 342, caption: '素敵な1日でした！#カフェ #友達 #休日' },
    { id: 2, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', 
      user: 'マリア', likes: 518, caption: '新しい写真を撮りました。みなさんどう思いますか？ #ポートレート #写真' },
  ]);

  // refs
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  
  // videoRefコールバック - 要素がDOMに追加されたときに実行
  const videoRefCallback = (element) => {
    if (element) {
      console.log('ビデオ要素が準備できました');
      setVideoElement(element);
    }
  };
  
  // フィルタープリセット
  const filterPresets = [
    { 
      name: 'ノスタルジック', 
      icon: '🌅',
      values: { brightness: 90, contrast: 110, saturate: 80, sepia: 30, grayscale: 0, blur: 0, hueRotate: 0, invert: 0, opacity: 100 } 
    },
    { 
      name: 'サイバーパンク', 
      icon: '🌃',
      values: { brightness: 110, contrast: 130, saturate: 170, sepia: 0, grayscale: 0, blur: 0, hueRotate: 280, invert: 0, opacity: 100 } 
    },
    { 
      name: 'ドリーミー', 
      icon: '✨',
      values: { brightness: 105, contrast: 90, saturate: 110, sepia: 10, grayscale: 0, blur: 2, hueRotate: 0, invert: 0, opacity: 95 } 
    },
    { 
      name: 'モノクローム', 
      icon: '🖤',
      values: { brightness: 100, contrast: 120, saturate: 0, sepia: 0, grayscale: 100, blur: 0, hueRotate: 0, invert: 0, opacity: 100 } 
    },
    { 
      name: 'ネガティブ', 
      icon: '🔄',
      values: { brightness: 100, contrast: 100, saturate: 100, sepia: 0, grayscale: 0, blur: 0, hueRotate: 180, invert: 100, opacity: 100 } 
    },
    { 
      name: 'サンセット', 
      icon: '🌇',
      values: { brightness: 105, contrast: 110, saturate: 130, sepia: 20, grayscale: 0, blur: 0, hueRotate: 30, invert: 0, opacity: 100 } 
    },
  ];

  // CSSSクラス用オブジェクト（グラデーションフィルター適用用）
  const gradientFilters = {
    none: '',
    rainbow: 'rainbow-gradient',
    sunset: 'sunset-gradient',
    neon: 'neon-gradient',
    cool: 'cool-gradient',
    warm: 'warm-gradient'
  };

  // コンポーネントのマウント時およびアンマウント時のハンドラ
  useEffect(() => {
    // コンポーネントのクリーンアップ
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  // videoElementが更新されたときにカメラを再接続（マウント後の初回のみ）
  useEffect(() => {
    let isMounted = true;
    
    // videoElementが存在する場合、遅延してカメラを自動起動
    if (videoElement && !isCapturing && !capturedImage && mode === 'camera') {
      console.log('ビデオ要素が確認できました。カメラを起動します...');
      
      // DOMの完全な読み込みを待つため少し遅延させる
      const timer = setTimeout(() => {
        if (isMounted) {
          startCamera();
        }
      }, 500);
      
      return () => {
        clearTimeout(timer);
      }
    }
    
    return () => {
      isMounted = false;
    };
  }, [videoElement, mode]);
  // pages/CameraPage.js - パート2：関数と機能実装

  // カメラの起動
  const startCamera = async () => {
    try {
      // 既存のストリームがあれば停止
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setCameraError(false);
      
      console.log('カメラを起動中...');
      
      // より詳細な制約を設定
      const constraints = {
        audio: false,
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      console.log('要求するカメラ設定:', JSON.stringify(constraints));
      
      // カメラストリームを取得
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('メディアストリーム取得成功:', mediaStream.id);
      console.log('ビデオトラック:', mediaStream.getVideoTracks().length);
      
      if (mediaStream.getVideoTracks().length === 0) {
        throw new Error('ビデオトラックが見つかりません');
      }
      
      const videoTrack = mediaStream.getVideoTracks()[0];
      console.log('ビデオトラック情報:', videoTrack.label);
      
      // ストリームを保存
      setStream(mediaStream);
      
      // ビデオ要素にセット - videoElementステートを使用
      if (videoElement) {
        console.log('ビデオ要素にストリームをセット中...');
        videoElement.srcObject = mediaStream;
        
        // 再生が始まるまで監視
        videoElement.onloadedmetadata = () => {
          console.log('ビデオメタデータ読み込み完了!');
        };
        
        videoElement.onloadeddata = () => {
          console.log('ビデオデータ読み込み完了!');
        };
        
        videoElement.onplaying = () => {
          console.log('ビデオ再生開始!');
        };
        
        // 明示的に再生を試みる
        try {
          await videoElement.play();
          console.log('ビデオ再生成功!');
          setIsCapturing(true);
        } catch (playErr) {
          console.warn('ビデオ自動再生エラー:', playErr);
          // 自動再生ポリシーによる拒否の可能性があるが、ストリームは取得済み
          setIsCapturing(true);
        }
      } else {
        console.error('ビデオ要素が見つかりません');
        throw new Error('ビデオ要素が見つかりません');
      }
      
      console.log('カメラが起動しました');
    } catch (err) {
      console.error('カメラの起動に失敗しました:', err);
      setCameraError(true);
      alert(`カメラにアクセスできません: ${err.message}`);
    }
  };

  // カメラの停止
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    
    if (videoElement) {
      videoElement.srcObject = null;
    }
    
    setIsCapturing(false);
  };

  // カメラの切り替え
  const switchCamera = () => {
    // 現在のカメラを停止
    stopCamera();
    
    // カメラの向きを切り替え
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    // 少し待ってから新しいカメラを起動
    setTimeout(() => {
      startCamera();
    }, 300);
  };

  // 写真を撮る
  const captureImage = () => {
    if (!videoElement || !canvasRef.current) {
      console.error('ビデオまたはキャンバス要素が見つかりません');
      return;
    }
    
    try {
      const video = videoElement;
      const canvas = canvasRef.current;
      
      console.log('画像をキャプチャ中...');
      console.log('ビデオサイズ:', video.videoWidth, 'x', video.videoHeight);
      
      // ビデオサイズが0の場合はクライアントサイズを使用
      const width = video.videoWidth || video.clientWidth || 640;
      const height = video.videoHeight || video.clientHeight || 480;
      
      console.log('キャプチャサイズ:', width, 'x', height);
      
      // キャンバスのサイズを設定
      canvas.width = width;
      canvas.height = height;
      
      // コンテキストを取得
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('キャンバスコンテキストを取得できません');
      }
      
      // キャンバスをクリア
      ctx.clearRect(0, 0, width, height);
      
      // フロントカメラの場合、水平反転
      if (facingMode === 'user') {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
      
      // フィルターを適用
      try {
        ctx.filter = getFilterString();
      } catch (filterErr) {
        console.warn('フィルター適用エラー:', filterErr);
        // フィルターが原因のエラーなら、フィルターなしで続行
      }
      
      console.log('ビデオをキャンバスに描画中...');
      // ビデオの描画
      ctx.drawImage(video, 0, 0, width, height);
      
      // 元の座標系に戻す
      if (facingMode === 'user') {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      
      // グラデーションフィルター効果を追加（キャンバスに直接描画）
      if (gradientFilter !== 'none') {
        try {
          applyGradientToCanvas(ctx, width, height, gradientFilter);
        } catch (gradientErr) {
          console.warn('グラデーション適用エラー:', gradientErr);
        }
      }
      
      try {
        // 画像データを取得
        const imageDataURL = canvas.toDataURL('image/png');
        console.log('画像データ取得成功');
        setCapturedImage(imageDataURL);
        setMode('preview');
      } catch (dataErr) {
        console.error('画像データURL取得エラー:', dataErr);
        alert('画像の取得に失敗しました。ブラウザの設定を確認してください。');
      }
    } catch (err) {
      console.error('画像のキャプチャに失敗しました:', err);
      alert('画像の撮影に失敗しました。もう一度お試しください。');
    }
  };

  // キャンバスにグラデーション効果を適用
  const applyGradientToCanvas = (ctx, width, height, gradientType) => {
    let gradient;
    
    switch (gradientType) {
      case 'rainbow':
        gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
        gradient.addColorStop(0.2, 'rgba(255, 165, 0, 0.2)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 0, 0.2)');
        gradient.addColorStop(0.6, 'rgba(0, 128, 0, 0.2)');
        gradient.addColorStop(0.8, 'rgba(0, 0, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(128, 0, 128, 0.2)');
        break;
      case 'sunset':
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 102, 0, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 102, 0.2)');
        gradient.addColorStop(1, 'rgba(51, 0, 102, 0.3)');
        break;
      case 'neon':
        gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0.2)');
        break;
      case 'cool':
        gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(0, 102, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(102, 0, 255, 0.3)');
        break;
      case 'warm':
        gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(255, 102, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.3)');
        break;
      default:
        return;
    }
    
    // オーバーレイモードで描画
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
  };

  // フィルタープリセットを適用
  const applyPreset = (preset) => {
    setFilters(preset.values);
    setSelectedPreset(preset.name);
  };

  // フィルターを動的に更新
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setSelectedPreset(null);
  };

  // グラデーションフィルターを変更
  const handleGradientChange = (value) => {
    setGradientFilter(value);
  };

  // CSSフィルター文字列の生成
  const getFilterString = () => {
    return `
      brightness(${filters.brightness}%) 
      contrast(${filters.contrast}%) 
      saturate(${filters.saturate}%) 
      sepia(${filters.sepia}%) 
      grayscale(${filters.grayscale}%) 
      blur(${filters.blur}px) 
      hue-rotate(${filters.hueRotate}deg)
      invert(${filters.invert}%)
      opacity(${filters.opacity}%)
    `;
  };

  // フィルターをリセット
  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      sepia: 0,
      grayscale: 0,
      blur: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100
    });
    setGradientFilter('none');
    setSelectedPreset(null);
  };

  // 新しい写真を撮るためにキャプチャした画像をクリア
  const newPhoto = () => {
    setCapturedImage(null);
    setMode('camera');
    setTimeout(() => {
      startCamera();
    }, 300);
  };

  // 画像を保存する
  const saveImage = () => {
    if (!capturedImage) return;
    
    // 仮想的に投稿するとフィードに追加
    const newPost = {
      id: Date.now(),
      url: capturedImage,
      user: 'あなた',
      likes: 0,
      caption: '新しい投稿 #フォトカメラアプリ'
    };
    
    setFeedImages([newPost, ...feedImages]);
    alert('投稿が完了しました！');
    
    // フィードモードに切り替え
    setMode('feed');
    stopCamera();
  };
  
  // 投稿のいいね操作
  const likePost = (id) => {
    setFeedImages(prev => 
      prev.map(post => 
        post.id === id ? {...post, likes: post.likes + 1} : post
      )
    );
  };

  // グラデーションフィルターのCSSスタイル
  const gradientStyles = `
    .rainbow-gradient::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,0,0,0.2), rgba(255,165,0,0.2), rgba(255,255,0,0.2), rgba(0,128,0,0.2), rgba(0,0,255,0.2), rgba(128,0,128,0.2));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .sunset-gradient::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(255,102,0,0.3), rgba(255,0,102,0.2), rgba(51,0,102,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .neon-gradient::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2), rgba(0,255,0,0.2));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .cool-gradient::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, rgba(0,102,255,0.3), rgba(102,0,255,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
    
    .warm-gradient::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, rgba(255,102,0,0.3), rgba(255,0,0,0.3));
      pointer-events: none;
      mix-blend-mode: overlay;
      border-radius: 0.5rem;
    }
  `;
  // pages/CameraPage.js - パート3：レンダリング部分

  return (
    <div className="bg-gray-100" style={{ height: "100vh", overflow: "auto" }}>
      <style>{gradientStyles}</style>
      
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 py-2 px-4 sticky top-0 z-10">
        <div className="max-w-screen-md mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="./" className="mr-4" onClick={() => setActiveTab('home')}>
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </Link>
            <h1 className="text-xl font-semibold">
              {mode === 'camera' ? 'カメラ' : mode === 'preview' ? 'プレビュー' : 'フィード'}
            </h1>
          </div>
          
          <div className="flex gap-3">
            <Link href="./" className="flex items-center">
              <Home className="h-6 w-6 text-gray-800" />
            </Link>
            {mode === 'camera' && isCapturing && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-500 flex items-center"
              >
                <Settings size={24} />
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* メインコンテンツ */}
      <main className="max-w-screen-md mx-auto">
        {mode === 'camera' && (
          <div className="relative">
            {isCapturing && !capturedImage ? (
              <div className={`relative ${gradientFilters[gradientFilter]}`}>
                <video 
                  ref={videoRefCallback} 
                  autoPlay 
                  playsInline
                  muted
                  width="100%"
                  height="auto"
                  className="w-full h-full object-cover"
                  style={{ 
                    filter: getFilterString(),
                    transform: facingMode === 'user' ? 'scaleX(-1)' : 'none', // フロントカメラの場合は水平反転
                    backgroundColor: 'black',
                    aspectRatio: '9/16',
                    maxHeight: '80vh',
                    objectFit: 'cover'
                  }}
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                  {facingMode === 'user' ? '内側カメラ' : '外側カメラ'}
                </div>
              </div>
            ) : (
              <div className="w-full h-[80vh] bg-black flex flex-col items-center justify-center">
                {/* 非表示のビデオ要素（DOM初期化用） */}
                <video 
                  ref={videoRefCallback}
                  style={{ display: 'none' }}
                  muted
                  playsInline
                />
                
                {cameraError ? (
                  <>
                    <CameraOff size={48} className="text-red-400 mb-2" />
                    <p className="text-red-400">カメラエラー</p>
                    <p className="text-gray-400 text-sm text-center max-w-xs mt-2">
                      カメラへのアクセスができませんでした。
                      <br />
                      ブラウザの設定でカメラのアクセスを許可してください。
                    </p>
                  </>
                ) : (
                  <>
                    <Camera size={48} className="text-white mb-2" />
                    <p className="text-white">カメラが起動していません</p>
                    <p className="text-gray-300 text-sm">「カメラを起動」ボタンをクリックしてください</p>
                  </>
                )}
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* カメラ操作ボタン */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              {!isCapturing ? (
                <button 
                  onClick={startCamera} 
                  className="bg-white text-black p-3 rounded-full shadow-lg"
                >
                  <Camera size={32} />
                </button>
              ) : (
                <>
                  <button 
                    onClick={switchCamera} 
                    className="bg-black bg-opacity-70 text-white p-3 rounded-full"
                  >
                    <FlipHorizontal size={28} />
                  </button>
                  <button 
                    onClick={captureImage} 
                    className="bg-white border-4 border-gray-300 text-black p-4 rounded-full shadow-lg"
                  >
                    <div className="h-12 w-12 rounded-full"></div>
                  </button>
                  <button 
                    onClick={() => setShowFilters(!showFilters)} 
                    className="bg-black bg-opacity-70 text-white p-3 rounded-full"
                  >
                    <Zap size={28} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        {mode === 'preview' && capturedImage && (
          <div className="relative h-full">
            <img 
              ref={photoRef}
              src={capturedImage} 
              alt="撮影した写真" 
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
              <button 
                onClick={newPhoto} 
                className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                撮り直す
              </button>
              <button 
                onClick={saveImage}
                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                投稿する
              </button>
            </div>
          </div>
        )}
        
        {mode === 'feed' && (
          <div className="pb-20">
            {feedImages.map((post) => (
              <div key={post.id} className="bg-white mb-6 border border-gray-200">
                {/* 投稿ヘッダー */}
                <div className="flex items-center p-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">{post.user}</span>
                </div>
                
                {/* 投稿画像 */}
                <div className="aspect-square overflow-hidden">
                  <img src={post.url} alt="投稿" className="w-full h-full object-cover" />
                </div>
                
                {/* 投稿アクション */}
                <div className="p-3">
                  <div className="flex justify-between mb-2">
                    <div className="flex gap-4">
                      <button onClick={() => likePost(post.id)}>
                        <Heart size={24} className="text-gray-800 hover:text-red-500 transition-colors" />
                      </button>
                      <button>
                        <MessageCircle size={24} className="text-gray-800" />
                      </button>
                      <button>
                      <Share2 size={24} className="text-gray-800" />
                      </button>
                    </div>
                    <button>
                      <Bookmark size={24} className="text-gray-800" />
                    </button>
                  </div>
                  
                  {/* いいね数 */}
                  <p className="font-bold mb-1">{post.likes}件のいいね</p>
                  
                  {/* キャプション */}
                  <p className="mb-2">
                    <span className="font-medium mr-2">{post.user}</span>
                    {post.caption}
                  </p>
                  
                  {/* コメント入力 */}
                  <div className="flex items-center border-t border-gray-200 pt-3 mt-3">
                    <Smile size={24} className="text-gray-400 mr-2" />
                    <input 
                      type="text"
                      placeholder="コメントを追加..."
                      className="flex-1 outline-none text-sm"
                    />
                    <button className="text-blue-500 font-medium text-sm">投稿する</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* フィルター設定パネル */}
      {mode === 'camera' && showFilters && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-4 rounded-t-xl z-20 max-h-[60vh] overflow-y-auto">
          <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Settings size={20} />
                フィルター設定
              </h2>
              <button 
                onClick={resetFilters}
                className="text-blue-400 flex items-center gap-1"
              >
                <RefreshCw size={16} />
                リセット
              </button>
            </div>
            
            {/* フィルタープリセット */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Zap size={16} />
                フィルタープリセット
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={`p-2 text-sm rounded border ${selectedPreset === preset.name ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                  >
                    <span className="mr-1">{preset.icon}</span> {preset.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* グラデーションフィルター */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Layers size={16} />
                グラデーションフィルター
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleGradientChange('none')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'none' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  なし
                </button>
                <button 
                  onClick={() => handleGradientChange('rainbow')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'rainbow' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  🌈 レインボー
                </button>
                <button 
                  onClick={() => handleGradientChange('sunset')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'sunset' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  🌅 サンセット
                </button>
                <button 
                  onClick={() => handleGradientChange('neon')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'neon' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  ✨ ネオン
                </button>
                <button 
                  onClick={() => handleGradientChange('cool')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'cool' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  ❄️ クール
                </button>
                <button 
                  onClick={() => handleGradientChange('warm')}
                  className={`p-2 text-sm rounded border ${gradientFilter === 'warm' ? 'bg-blue-600 border-blue-400' : 'bg-black border-gray-700'}`}
                >
                  🔥 ウォーム
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Palette size={16} />
                詳細調整
              </h3>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>明るさ</span>
                  <span>{filters.brightness}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.brightness} 
                  onChange={(e) => handleFilterChange('brightness', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>コントラスト</span>
                  <span>{filters.contrast}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.contrast} 
                  onChange={(e) => handleFilterChange('contrast', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>彩度</span>
                  <span>{filters.saturate}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.saturate} 
                  onChange={(e) => handleFilterChange('saturate', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>セピア</span>
                  <span>{filters.sepia}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.sepia} 
                  onChange={(e) => handleFilterChange('sepia', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>グレースケール</span>
                  <span>{filters.grayscale}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.grayscale} 
                  onChange={(e) => handleFilterChange('grayscale', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>ぼかし</span>
                  <span>{filters.blur}px</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={filters.blur} 
                  onChange={(e) => handleFilterChange('blur', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>色相回転</span>
                  <span>{filters.hueRotate}°</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={filters.hueRotate} 
                  onChange={(e) => handleFilterChange('hueRotate', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>ネガティブ</span>
                  <span>{filters.invert}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.invert} 
                  onChange={(e) => handleFilterChange('invert', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between">
                  <span>不透明度</span>
                  <span>{filters.opacity}%</span>
                </label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={filters.opacity} 
                  onChange={(e) => handleFilterChange('opacity', e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
            
            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 font-medium"
            >
              完了
            </button>
          </div>
        </div>
      )}
      
      {/* フッターナビゲーション（フィードモード時） */}
      {mode === 'feed' && (
        <footer className="bg-white border-t border-gray-200 py-3 fixed bottom-0 left-0 right-0">
          <div className="max-w-screen-md mx-auto flex justify-around">
            <Link href="/" className="flex flex-col items-center text-xs">
              <Home size={24} className="mb-1" />
              ホーム
            </Link>
            <button className="flex flex-col items-center text-xs">
              <Search size={24} className="mb-1" />
              検索
            </button>
            <button 
              onClick={() => {
                setMode('camera');
                setTimeout(() => {
                  startCamera();
                }, 300);
              }}
              className="flex flex-col items-center text-xs"
            >
              <Camera size={24} className="mb-1" />
              カメラ
            </button>
            <button className="flex flex-col items-center text-xs">
              <Heart size={24} className="mb-1" />
              通知
            </button>
            <Link href="/profile" className="flex flex-col items-center text-xs">
              <User size={24} className="mb-1" />
              プロフィール
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default CameraPage;