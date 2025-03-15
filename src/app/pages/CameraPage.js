// pages/CameraPage.js - メインコンポーネント
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Settings, RefreshCw, Image, Zap, Layers, Palette, FlipHorizontal, 
  CameraOff, ChevronLeft, Heart, MessageCircle, Share2, Bookmark, Smile, 
  Home, Search, User, X, Instagram, Facebook, Twitter, Mail, Link as LinkIcon, 
  Copy, Clock, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import CameraControls from './CameraControls';
import ShareModal from './ShareModal';

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
  const [showShareModal, setShowShareModal] = useState(false);
  const [groupModeActive, setGroupModeActive] = useState(false);
  const [timerValue, setTimerValue] = useState(3); // デフォルト3秒
  const [timerRunning, setTimerRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);
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
  const timerRef = useRef(null);
  
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
      
      // タイマーがあれば停止
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);
  
  // videoElementが更新されたときにカメラを再接続
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

  // タイマーカウントダウンの監視
  useEffect(() => {
    if (timerRunning && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else if (timerRunning && countdown === 0) {
      // カウントダウン終了時に撮影
      captureImage();
      setTimerRunning(false);
    }
  }, [timerRunning, countdown]);

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

  // タイマー付き撮影の開始
  const startTimerCapture = () => {
    setCountdown(timerValue);
    setTimerRunning(true);
  };

  // タイマーのキャンセル
  const cancelTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimerRunning(false);
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
  
  // シェアモーダルを開く
  const openShareModal = () => {
    setShowShareModal(true);
  };

  // シェアモーダルを閉じる
  const closeShareModal = () => {
    setShowShareModal(false);
  };
  
  // 投稿のいいね操作
  const likePost = (id) => {
    setFeedImages(prev => 
      prev.map(post => 
        post.id === id ? {...post, likes: post.likes + 1} : post
      )
    );
  };

  // グループモードの切り替え
  const toggleGroupMode = () => {
    setGroupModeActive(!groupModeActive);
  };

  // タイマー値の変更
  const handleTimerChange = (value) => {
    setTimerValue(value);
  };
  
  // タイマーのCSSスタイル
  const timerBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '10rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    zIndex: 20
  };

  // グラデーションフィルターのCSSスタイル
  const gradientStyles = `
    /* ベースの共通スタイル */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    
    /* アニメーション */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes timerPulse {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    /* 改良されたグラデーションフィルター */
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
    
    /* スタイリッシュなボタン */
    .camera-btn {
      transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    }
    
    .camera-btn:active {
      transform: scale(0.95);
    }
    
    /* カスタムスライダー */
    input[type="range"] {
      -webkit-appearance: none;
      height: 4px;
      background: rgba(139, 92, 246, 0.2);
      border-radius: 5px;
      background-image: linear-gradient(to right, #8b5cf6, #6366f1);
      background-size: 50% 100%;
      background-repeat: no-repeat;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    
    /* フィルターパネルのスタイル強化 */
    .filter-panel {
      backdrop-filter: blur(10px);
      animation: slideUp 0.3s ease-out;
    }
    
    /* カメラインターフェース */
    .camera-interface {
      background: radial-gradient(circle at top right, rgba(139, 92, 246, 0.07), transparent 70%),
                radial-gradient(circle at bottom left, rgba(79, 70, 229, 0.05), transparent 70%);
    }
    
    /* フィード投稿のスタイル強化 */
    .feed-post {
      transition: transform 0.2s ease;
      animation: fadeIn 0.5s ease-out;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .feed-post:hover {
      transform: translateY(-2px);
    }
    
    /* スタイリッシュなヘッダー */
    .styled-header {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
    }
    
    /* アクションボタン */
    .action-button {
      transition: all 0.2s ease;
    }
    
    .action-button:hover {
      transform: scale(1.05);
    }
    
    .action-button:active {
      transform: scale(0.95);
    }

    /* シェアモーダルのスタイル */
    .share-modal-overlay {
      animation: fadeIn 0.3s ease-out;
    }
    
    .share-modal {
      animation: slideUp 0.4s ease-out;
    }
    
    .share-icon {
      transition: all 0.2s ease;
    }
    
    .share-icon:hover {
      transform: translateY(-3px);
    }
    
    /* グループ撮影モードのスタイル */
    .timer-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 12rem;
      font-weight: bold;
      text-shadow: 0 0 10px rgba(0,0, 0), 0.5);
      animation: timerPulse 1s infinite;
      backdrop-filter: blur(2px);
      z-index: 30;
    }
    
    .timer-number {
      animation: pulse 1s infinite;
    }
    
    .timer-settings {
      animation: slideUp 0.3s ease-out;
    }
    
    .group-mode-active {
      box-shadow: 0 0 0 2px #6366f1, 0 0 0 4px rgba(99, 102, 241, 0.3);
      transform: scale(1.05);
    }
  `;

  return (
    <div className="bg-gray-50 camera-interface" style={{ height: "100vh", overflow: "auto" }}>
      <style>{gradientStyles}</style>
      
      {/* ヘッダー */}
      <header className="styled-header border-b border-gray-200 py-3 px-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-md mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="./" className="mr-4 hover:bg-gray-100 p-2 rounded-full transition">
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              {mode === 'camera' ? (
                <>
                  <Camera size={20} className="mr-2 text-purple-600" />
                  カメラ {groupModeActive && '(グループモード)'}
                </>
              ) : mode === 'preview' ? (
                <>
                  <Image size={20} className="mr-2 text-indigo-600" />
                  プレビュー
                </>
              ) : (
                <>
                  <Image size={20} className="mr-2 text-blue-600" />
                  フィード
                </>
              )}
            </h1>
          </div>
          
          <div className="flex gap-3">
            {mode === 'camera' && isCapturing && (
              <button 
                onClick={toggleGroupMode}
                className={`text-purple-600 flex items-center hover:bg-purple-50 p-2 rounded-full transition action-button ${groupModeActive ? 'group-mode-active' : ''}`}
              >
                <Users size={24} />
              </button>
            )}
            <Link href="./" className="flex items-center hover:bg-gray-100 p-2 rounded-full transition">
              <Home className="h-6 w-6 text-gray-800" />
            </Link>
            {mode === 'camera' && isCapturing && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="text-purple-600 flex items-center hover:bg-purple-50 p-2 rounded-full transition action-button"
              >
                <Settings size={24} />
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* メインコンテンツ */}
      <main className="max-w-screen-md mx-auto px-2">
        {mode === 'camera' && (
          <div className="relative mt-2">
            {isCapturing && !capturedImage ? (
              <div className={`relative ${gradientFilters[gradientFilter]} rounded-2xl overflow-hidden shadow-lg`}>
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
                    objectFit: 'cover',
                  }}
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-40 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                  {facingMode === 'user' ? (
                    <>
                      <Camera size={12} className="mr-1.5" />
                      内側カメラ
                    </>
                  ) : (
                    <>
                      <Camera size={12} className="mr-1.5" />
                      外側カメラ
                    </>
                  )}
                </div>
                
                {/* グループモード表示 */}
                {groupModeActive && (
                  <div className="absolute top-4 right-4 bg-indigo-600 bg-opacity-90 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                    <Users size={12} className="mr-1.5" />
                    グループモード
                  </div>
                )}
                
                {/* タイマーカウントダウン表示 */}
                {timerRunning && countdown > 0 && (
                  <div style={timerBoxStyle} className="timer-number">
                    {countdown}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[80vh] bg-black bg-opacity-95 flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-lg">
                {/* 非表示のビデオ要素（DOM初期化用） */}
                <video 
                  ref={videoRefCallback}
                  style={{ display: 'none' }}
                  muted
                  playsInline
                />
                
                {cameraError ? (
                  <>
                    <CameraOff size={48} className="text-red-400 mb-3 animate-pulse" />
                    <p className="text-red-400 font-medium text-lg mb-2">カメラエラー</p>
                    <p className="text-gray-400 text-sm text-center max-w-xs mt-2 px-6">
                      カメラへのアクセスができませんでした。
                      <br />
                      ブラウザの設定でカメラのアクセスを許可してください。
                    </p>
                  </>
                ) : (
                  <>
                    <Camera size={56} className="text-white mb-4 opacity-80" />
                    <p className="text-white font-medium text-lg mb-2">カメラが起動していません</p>
                    <p className="text-gray-300 text-sm mb-6">下のボタンをクリックしてカメラを起動してください</p>
                    <button 
                      onClick={startCamera}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-full shadow-lg flex items-center camera-btn"
                    >
                      <Camera size={20} className="mr-2" />
                      カメラを起動
                    </button>
                  </>
                )}
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            
            {/* カメラ操作ボタン */}
            {isCapturing && !timerRunning && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 items-center">
                <button 
                  onClick={switchCamera} 
                  className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg backdrop-blur-sm camera-btn"
                >
                  <FlipHorizontal size={24} />
                </button>
                
                {/* 通常モードの撮影ボタン */}
                {!groupModeActive && (
                  <button 
                    onClick={captureImage} 
                    className="relative bg-white p-1 rounded-full shadow-lg camera-btn"
                  >
                    <div className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                  </button>
                )}
                
                {/* グループモードの撮影ボタン */}
                {groupModeActive && (
                  <button 
                    onClick={startTimerCapture} 
                    className="relative bg-white p-1 rounded-full shadow-lg camera-btn"
                  >
                    <div className="h-16 w-16 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Clock size={30} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                  </button>
                )}
                
                <button 
                  onClick={() => setShowFilters(!showFilters)} 
                  className="bg-black bg-opacity-60 text-white p-3 rounded-full shadow-lg backdrop-blur-sm camera-btn"
                >
                  <Zap size={24} />
                </button>
              </div>
            )}
            
            {/* タイマーカウントダウン中のキャンセルボタン */}
            {timerRunning && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button 
                  onClick={cancelTimer} 
                  className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg font-medium camera-btn flex items-center"
                >
                  <X size={18} className="mr-2" />
                  キャンセル
                </button>
              </div>
            )}
            
            {/* グループモード設定パネル */}
            {groupModeActive && !timerRunning && (
              <div className="fixed bottom-24 left-0 right-0 bg-black bg-opacity-75 text-white p-4 rounded-xl z-20 mx-auto max-w-sm timer-settings">
                <h3 className="text-center text-lg font-medium mb-4 flex items-center justify-center">
                  <Clock size={18} className="mr-2 text-indigo-400" />
                  タイマー設定
                </h3>
                
                <div className="flex justify-center space-x-4 mb-4">
                  {[3, 5, 10].map((seconds) => (
                    <button
                      key={seconds}
                      onClick={() => handleTimerChange(seconds)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        timerValue === seconds ? 'bg-indigo-600' : 'bg-gray-800'
                      } transition-all`}
                    >
                      {seconds}秒
                    </button>
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-300 mb-1">
                  カウントダウン後に自動的に撮影します
                </div>
              </div>
            )}
          </div>
        )}
        
        {mode === 'preview' && capturedImage && (
          <div className="relative h-full mt-4 animation-fadeIn">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                ref={photoRef}
                src={capturedImage} 
                alt="撮影した写真" 
                className="w-full max-h-[75vh] object-contain mx-auto rounded-2xl"
              />
              
              {/* オーバーレイグラデーション */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            </div>
            
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              <button 
                onClick={newPhoto} 
                className="bg-white text-red-500 px-6 py-3 rounded-full shadow-lg font-medium camera-btn flex items-center"
              >
                <RefreshCw size={18} className="mr-2" />
                撮り直す
              </button>
              <button 
                onClick={openShareModal}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-medium camera-btn flex items-center"
              >
                <Share2 size={18} className="mr-2" />
                シェアする
              </button>
            </div>
          </div>
        )}
        
        {mode === 'feed' && (
          <div className="pb-20 pt-4">
            {feedImages.map((post) => (
              <div key={post.id} className="bg-white mb-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm feed-post">
                {/* 投稿ヘッダー */}
                <div className="flex items-center p-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                  <span className="ml-3 font-medium">{post.user}</span>
                </div>
                
                {/* 投稿画像 */}
                <div className="aspect-square overflow-hidden bg-black">
                  <img src={post.url} alt="投稿" className="w-full h-full object-contain" />
                </div>
                
                {/* 投稿アクション */}
                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <div className="flex gap-5">
                      <button onClick={() => likePost(post.id)} className="action-button">
                        <Heart size={26} className="text-gray-800 hover:text-red-500 transition-colors" />
                      </button>
                      <button className="action-button">
                        <MessageCircle size={26} className="text-gray-800" />
                      </button>
                      <button onClick={openShareModal} className="action-button">
                        <Share2 size={26} className="text-gray-800" />
                      </button>
                    </div>
                    <button className="action-button">
                      <Bookmark size={26} className="text-gray-800" />
                    </button>
                  </div>
                  
                  {/* いいね数 */}
                  <p className="font-bold mb-2">{post.likes}件のいいね</p>
                  
                  {/* キャプション */}
                  <p className="mb-3">
                    <span className="font-medium mr-2">{post.user}</span>
                    {post.caption}
                  </p>
                  
                  {/* コメント入力 */}
                  <div className="flex items-center border-t border-gray-200 pt-3 mt-3">
                    <Smile size={24} className="text-gray-400 mr-3" />
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
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-4 rounded-t-2xl z-20 max-h-[70vh] overflow-y-auto filter-panel">
          <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Settings size={20} className="text-purple-400" />
                フィルター設定
              </h2>
              <button 
                onClick={resetFilters}
                className="text-purple-400 flex items-center gap-1 hover:text-purple-300 transition"
              >
                <RefreshCw size={16} />
                リセット
              </button>
            </div>
            
            {/* フィルタープリセット */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Zap size={16} className="text-purple-400" />
                フィルタープリセット
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filterPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={`p-3 text-sm rounded-lg border ${selectedPreset === preset.name ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                  >
                    <span className="mr-2 text-lg">{preset.icon}</span> {preset.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* グラデーションフィルター */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Layers size={16} className="text-purple-400" />
                グラデーションフィルター
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button 
                  onClick={() => handleGradientChange('none')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'none' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  なし
                </button>
                <button 
                  onClick={() => handleGradientChange('rainbow')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'rainbow' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🌈 レインボー
                </button>
                <button 
                  onClick={() => handleGradientChange('sunset')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'sunset' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🌅 サンセット
                </button>
                <button 
                  onClick={() => handleGradientChange('neon')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'neon' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  ✨ ネオン
                </button>
                <button 
                  onClick={() => handleGradientChange('cool')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'cool' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  ❄️ クール
                </button>
                <button 
                  onClick={() => handleGradientChange('warm')}
                  className={`p-3 text-sm rounded-lg border ${gradientFilter === 'warm' ? 'bg-purple-700 border-purple-500' : 'bg-gray-900 border-gray-800'} transition-all`}
                >
                  🔥 ウォーム
                </button>
              </div>
            </div>
            
            <div className="space-y-5">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-300">
                <Palette size={16} className="text-purple-400" />
                詳細調整
              </h3>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>明るさ</span>
                  <span className="text-purple-400">{filters.brightness}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.brightness} 
                  onChange={(e) => handleFilterChange('brightness', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>コントラスト</span>
                  <span className="text-purple-400">{filters.contrast}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.contrast} 
                  onChange={(e) => handleFilterChange('contrast', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>彩度</span>
                  <span className="text-purple-400">{filters.saturate}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  value={filters.saturate} 
                  onChange={(e) => handleFilterChange('saturate', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>セピア</span>
                  <span className="text-purple-400">{filters.sepia}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.sepia} 
                  onChange={(e) => handleFilterChange('sepia', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>グレースケール</span>
                  <span className="text-purple-400">{filters.grayscale}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.grayscale} 
                  onChange={(e) => handleFilterChange('grayscale', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>ぼかし</span>
                  <span className="text-purple-400">{filters.blur}px</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={filters.blur} 
                  onChange={(e) => handleFilterChange('blur', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>色相回転</span>
                  <span className="text-purple-400">{filters.hueRotate}°</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={filters.hueRotate} 
                  onChange={(e) => handleFilterChange('hueRotate', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>ネガティブ</span>
                  <span className="text-purple-400">{filters.invert}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={filters.invert} 
                  onChange={(e) => handleFilterChange('invert', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex justify-between mb-2">
                  <span>不透明度</span>
                  <span className="text-purple-400">{filters.opacity}%</span>
                </label>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={filters.opacity} 
                  onChange={(e) => handleFilterChange('opacity', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            
            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg mt-8 font-medium camera-btn"
            >
              完了
            </button>
          </div>
        </div>
      )}

      {/* シェアモーダル - 実際の機能なしのデモ */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 share-modal-overlay">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-lg share-modal">
            <div className="p-5 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">写真をシェア</h3>
                <button 
                  onClick={closeShareModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 mb-6">SNSやその他のプラットフォームで写真をシェアしましょう</p>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <Facebook size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Facebook</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-pink-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Instagram</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-2">
                    <Twitter size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Twitter</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-orange-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2">
                    <Mail size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">メール</span>
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-gray-500 text-sm mb-3">リンクをコピー</p>
                <div className="flex">
                  <div className="bg-white border border-gray-200 rounded-l-lg py-2 px-3 flex-1 text-gray-500 text-sm">
                    https://mycamera.app/share/XYZ123
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-r-lg flex items-center">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
              
              <div className="text-center text-gray-400 my-4">
                <p>※ デモ用のみ - 実際には共有されません</p>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    closeShareModal();
                    alert('シェア完了！(デモ用)');
                    newPhoto();
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg shadow camera-btn"
                >
                  シェアする (デモ)
                </button>
                <button 
                  onClick={closeShareModal}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg camera-btn"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* フッターナビゲーション（フィードモード時） */}
      {mode === 'feed' && (
        <footer className="bg-white border-t border-gray-200 py-3 fixed bottom-0 left-0 right-0 shadow-lg">
          <div className="max-w-screen-md mx-auto flex justify-around">
            <Link href="/" className="flex flex-col items-center text-xs">
              <Home size={24} className="mb-1 text-gray-700" />
              <span className="text-gray-700">ホーム</span>
            </Link>
            <button className="flex flex-col items-center text-xs">
              <Search size={24} className="mb-1 text-gray-700" />
              <span className="text-gray-700">検索</span>
            </button>
            <button 
              onClick={() => {
                setMode('camera');
                setTimeout(() => {
                  startCamera();
                }, 300);
              }}
              className="flex flex-col items-center text-xs relative"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-1.5 mb-1">
                <Camera size={22} className="text-white" />
              </div>
              <span className="text-gray-700">カメラ</span>
            </button>
            <button className="flex flex-col items-center text-xs">
              <Heart size={24} className="mb-1 text-gray-700" />
              <span className="text-gray-700">通知</span>
            </button>
            <Link href="/profile" className="flex flex-col items-center text-xs">
              <User size={24} className="mb-1 text-gray-700" />
              <span className="text-gray-700">プロフィール</span>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default CameraPage;