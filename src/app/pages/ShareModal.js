// components/ShareModal.js - シェアモーダルコンポーネント
import React, { useState } from 'react';
import { X, Instagram, Facebook, Twitter, Mail, Link as LinkIcon, Copy, Send, 
  AtSign, Smartphone, MessageSquare, Linkedin, Github, Youtube, Music, Image } from 'lucide-react';

const ShareModal = ({ onClose, onSave, image }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('social'); // social, messaging, other
  
  // コピーのシミュレーション
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 share-modal-overlay">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-lg share-modal">
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">写真をシェア</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex border-b border-gray-100">
          <button 
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'social' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('social')}
          >
            SNS
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'messaging' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('messaging')}
          >
            メッセージ
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'other' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('other')}
          >
            その他
          </button>
        </div>
        
        <div className="p-5">
          {activeTab === 'social' && (
            <>
              <p className="text-gray-600 mb-6">SNSでシェアしましょう</p>
              
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
                
                <button className="flex flex-col items-center p-3 hover:bg-red-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2">
                    <Youtube size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">YouTube</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-2">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">LinkedIn</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-2">
                    <Github size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">GitHub</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-green-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <Music size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Spotify</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-indigo-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mb-2">
                    <Image size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Tumblr</span>
                </button>
              </div>
            </>
          )}
          
          {activeTab === 'messaging' && (
            <>
              <p className="text-gray-600 mb-6">メッセージアプリでシェア</p>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <button className="flex flex-col items-center p-3 hover:bg-green-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-2">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">LINE</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-2">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Messenger</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-green-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-2">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">WhatsApp</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-2">
                    <Send size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Telegram</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-orange-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2">
                    <Mail size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">メール</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center mb-2">
                    <Smartphone size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">SMS</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-indigo-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-2">
                    <AtSign size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Slack</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-purple-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mb-2">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Discord</span>
                </button>
              </div>
            </>
          )}
          
          {activeTab === 'other' && (
            <>
              <p className="text-gray-600 mb-6">他の共有方法</p>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center mb-2">
                    <LinkIcon size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">リンク</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-yellow-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mb-2">
                    <Copy size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">コピー</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                    <Image size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">保存</span>
                </button>
                
                <button className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-lg transition share-icon">
                  <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-2">
                    <Image size={24} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-600">印刷</span>
                </button>
              </div>
            </>
          )}
          
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <p className="text-gray-500 text-sm mb-3">リンクをコピー</p>
            <div className="flex">
              <div className="bg-white border border-gray-200 rounded-l-lg py-2 px-3 flex-1 text-gray-500 text-sm">
                https://mycamera.app/share/XYZ123
              </div>
              <button 
                onClick={handleCopy}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-r-lg flex items-center"
              >
                {copied ? '✓' : <Copy size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onSave}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg shadow camera-btn"
            >
              投稿する
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg camera-btn"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;