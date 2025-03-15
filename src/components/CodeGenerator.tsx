
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import LanguageSelector from "./LanguageSelector";
import CodeDisplay from "./CodeDisplay";
import PreviewPanel from "./PreviewPanel";
import { useToast } from "@/components/ui/use-toast";

const CodeGenerator = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isGenerating, setIsGenerating] = useState(false);
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const interpretPrompt = (userPrompt: string) => {
    // Detect common website patterns in the prompt
    const spotifyPattern = /spotify|سبوتيفاي|music\s*streaming|موسيقى/i;
    const ecommercePattern = /ecommerce|تجارة\s*إلكترونية|shop|متجر|تسوق/i;
    const socialPattern = /social\s*media|وسائل\s*التواصل|facebook|فيسبوك|twitter|تويتر/i;
    const blogPattern = /blog|مدونة|news|أخبار/i;
    
    let siteType = "generic";
    let colors = { primary: "#6b46c1", secondary: "#3182ce" };
    let features = [];
    
    // Determine site type based on prompt keywords
    if (spotifyPattern.test(userPrompt)) {
      siteType = "spotify";
      colors = { primary: "#1DB954", secondary: "#191414" };
      features = ["musicPlayer", "playlists", "search", "userAuth"];
    } else if (ecommercePattern.test(userPrompt)) {
      siteType = "ecommerce";
      colors = { primary: "#f97316", secondary: "#2563eb" };
      features = ["products", "cart", "checkout", "search"];
    } else if (socialPattern.test(userPrompt)) {
      siteType = "social";
      colors = { primary: "#3b82f6", secondary: "#1e40af" };
      features = ["posts", "comments", "friends", "userAuth"];
    } else if (blogPattern.test(userPrompt)) {
      siteType = "blog";
      colors = { primary: "#10b981", secondary: "#059669" };
      features = ["articles", "categories", "comments", "search"];
    }
    
    return { siteType, colors, features };
  };

  const generateCode = async () => {
    if (!prompt) {
      toast({
        title: "أدخل وصفًا للمشروع",
        description: "يرجى إدخال وصف لما تريد إنشاؤه قبل توليد الكود.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Interpret the user's prompt
    const { siteType, colors, features } = interpretPrompt(prompt);

    // Simulate API call to generate code
    setTimeout(() => {
      let sampleFrontendCode;
      let sampleBackendCode;
      let preview;
      
      // Generate code based on interpreted site type
      if (siteType === "spotify") {
        sampleFrontendCode = generateSpotifyLikeFrontend(language, prompt);
        sampleBackendCode = generateSpotifyLikeBackend(language, prompt);
        preview = generateSpotifyLikePreview(prompt);
      } else if (siteType === "ecommerce") {
        sampleFrontendCode = generateEcommerceFrontend(language, prompt);
        sampleBackendCode = generateEcommerceBackend(language, prompt);
        preview = generateEcommercePreview(prompt);
      } else if (siteType === "social") {
        sampleFrontendCode = generateSocialMediaFrontend(language, prompt);
        sampleBackendCode = generateSocialMediaBackend(language, prompt);
        preview = generateSocialMediaPreview(prompt);
      } else if (siteType === "blog") {
        sampleFrontendCode = generateBlogFrontend(language, prompt);
        sampleBackendCode = generateBlogBackend(language, prompt);
        preview = generateBlogPreview(prompt);
      } else {
        // Fallback to generic code generation
        sampleFrontendCode = generateGenericFrontend(language, prompt);
        sampleBackendCode = generateGenericBackend(language, prompt);
        preview = generateGenericPreview(prompt);
      }

      setFrontendCode(sampleFrontendCode);
      setBackendCode(sampleBackendCode);
      setPreviewContent(preview);
      setIsGenerating(false);

      toast({
        title: "تم توليد الكود!",
        description: `تم إنشاء كود تطبيق ${getSiteTypeInArabic(siteType)} بنجاح.`,
      });
    }, 3000);
  };

  const getSiteTypeInArabic = (type) => {
    switch (type) {
      case "spotify": return "خدمة موسيقى";
      case "ecommerce": return "متجر إلكتروني";
      case "social": return "وسائل تواصل اجتماعي";
      case "blog": return "مدونة";
      default: return "تطبيق ويب";
    }
  };

  // Functions for generating specific site types
  const generateSpotifyLikeFrontend = (lang, promptText) => {
    if (lang === "javascript" || lang === "react") {
      return `// React Component for a Spotify-like ${promptText}
import React, { useState, useEffect } from 'react';
import './styles.css';

function MusicApp() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch songs from API
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching songs:', error));
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="music-app">
      <aside className="sidebar">
        <div className="logo">
          <h1>${promptText}</h1>
        </div>
        <nav>
          <ul>
            <li className="active">الرئيسية</li>
            <li>البحث</li>
            <li>مكتبتك</li>
            <li>قوائم التشغيل</li>
          </ul>
        </nav>
      </aside>
      
      <main>
        <header>
          <div className="search-bar">
            <input type="text" placeholder="ابحث عن الأغاني والفنانين والألبومات" />
          </div>
          <div className="user-menu">
            <button className="user-button">المستخدم</button>
          </div>
        </header>
        
        {loading ? (
          <div className="loading">جاري التحميل...</div>
        ) : (
          <>
            <section className="featured">
              <h2>مميز لك</h2>
              <div className="featured-items">
                {songs.slice(0, 6).map(song => (
                  <div key={song.id} className="featured-item" onClick={() => playSong(song)}>
                    <div className="featured-cover">
                      <img src={song.cover} alt={song.title} />
                      <button className="play-button">{isPlaying && currentSong?.id === song.id ? '⏸️' : '▶️'}</button>
                    </div>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="recently-played">
              <h2>تم تشغيله مؤخرًا</h2>
              <div className="song-list">
                {songs.slice(0, 5).map(song => (
                  <div key={song.id} className="song-item" onClick={() => playSong(song)}>
                    <div className="song-info">
                      <img src={song.cover} alt={song.title} className="song-cover" />
                      <div>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                      </div>
                    </div>
                    <div className="song-duration">{song.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      
      <footer className="player">
        {currentSong && (
          <div className="now-playing">
            <div className="now-playing-info">
              <img src={currentSong.cover} alt={currentSong.title} className="now-playing-cover" />
              <div>
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </div>
            <div className="player-controls">
              <button>⏮️</button>
              <button className="play-pause" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button>⏭️</button>
            </div>
            <div className="player-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

export default MusicApp;`;
    } else {
      // HTML version for Spotify-like site
      return `<!-- HTML for a Spotify-like ${promptText} -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${promptText}</title>
  <style>
    :root {
      --primary-color: #1DB954;
      --secondary-color: #191414;
      --text-color: #fff;
      --background-light: #282828;
      --background-dark: #121212;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background-dark);
      color: var(--text-color);
      height: 100vh;
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: 1fr 90px;
      grid-template-areas:
        "sidebar main"
        "player player";
    }
    
    .sidebar {
      grid-area: sidebar;
      background-color: var(--secondary-color);
      padding: 24px 0;
    }
    
    .logo {
      padding: 0 24px 24px;
      color: var(--text-color);
    }
    
    .sidebar nav ul {
      list-style: none;
    }
    
    .sidebar nav ul li {
      padding: 12px 24px;
      cursor: pointer;
    }
    
    .sidebar nav ul li.active {
      background-color: var(--background-light);
    }
    
    .sidebar nav ul li:hover:not(.active) {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    main {
      grid-area: main;
      background: linear-gradient(to bottom, #434343, var(--background-dark));
      padding: 24px;
      overflow-y: auto;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    
    .search-bar {
      width: 40%;
    }
    
    .search-bar input {
      width: 100%;
      background-color: #fff;
      border: none;
      padding: 12px;
      border-radius: 30px;
    }
    
    .user-button {
      background-color: #000;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 30px;
      cursor: pointer;
    }
    
    .featured-items, .playlists {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 24px;
      margin-top: 16px;
    }
    
    .featured-item, .playlist-item {
      background-color: var(--background-light);
      padding: 20px;
      border-radius: 6px;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    
    .featured-item:hover, .playlist-item:hover {
      background-color: #3E3E3E;
    }
    
    .featured-cover, .playlist-cover {
      position: relative;
      margin-bottom: 16px;
    }
    
    .featured-cover img, .playlist-cover img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .play-button {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background-color: var(--primary-color);
      color: #000;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
      cursor: pointer;
    }
    
    .featured-item:hover .play-button, .playlist-item:hover .play-button {
      opacity: 1;
    }
    
    h2 {
      margin: 32px 0 16px;
    }
    
    .song-list {
      margin-top: 16px;
    }
    
    .song-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .song-item:hover {
      background-color: var(--background-light);
    }
    
    .song-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .song-cover {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    
    .player {
      grid-area: player;
      background-color: var(--secondary-color);
      border-top: 1px solid #3E3E3E;
      padding: 0 16px;
    }
    
    .now-playing {
      display: grid;
      grid-template-columns: 30% 40% 30%;
      height: 100%;
      align-items: center;
    }
    
    .now-playing-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .now-playing-cover {
      width: 56px;
      height: 56px;
      border-radius: 4px;
    }
    
    .player-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    
    .player-controls button {
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      font-size: 20px;
    }
    
    .play-pause {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--text-color) !important;
      color: var(--secondary-color) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .player-progress {
      width: 100%;
      padding: 0 20px;
    }
    
    .progress-bar {
      width: 100%;
      height: 4px;
      background-color: #5E5E5E;
      border-radius: 2px;
    }
    
    .progress {
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
    
    .loading {
      display: flex;
      height: 50vh;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div class="logo">
      <h1>${promptText}</h1>
    </div>
    <nav>
      <ul>
        <li class="active">الرئيسية</li>
        <li>البحث</li>
        <li>مكتبتك</li>
        <li>قوائم التشغيل</li>
      </ul>
    </nav>
  </aside>
  
  <main>
    <header>
      <div class="search-bar">
        <input type="text" placeholder="ابحث عن الأغاني والفنانين والألبومات">
      </div>
      <div class="user-menu">
        <button class="user-button">المستخدم</button>
      </div>
    </header>
    
    <section class="featured">
      <h2>مميز لك</h2>
      <div class="featured-items">
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/1/200" alt="أغنية 1">
            <button class="play-button">▶️</button>
          </div>
          <h3>قائمة تشغيل 1</h3>
          <p>فنان 1</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/2/200" alt="أغنية 2">
            <button class="play-button">▶️</button>
          </div>
          <h3>قائمة تشغيل 2</h3>
          <p>فنان 2</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/3/200" alt="أغنية 3">
            <button class="play-button">▶️</button>
          </div>
          <h3>قائمة تشغيل 3</h3>
          <p>فنان 3</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/4/200" alt="أغنية 4">
            <button class="play-button">▶️</button>
          </div>
          <h3>قائمة تشغيل 4</h3>
          <p>فنان 4</p>
        </div>
      </div>
    </section>
    
    <section class="recently-played">
      <h2>تم تشغيله مؤخرًا</h2>
      <div class="song-list">
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/10/200" alt="أغنية 1" class="song-cover">
            <div>
              <h3>أغنية 1</h3>
              <p>فنان 1</p>
            </div>
          </div>
          <div class="song-duration">3:45</div>
        </div>
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/11/200" alt="أغنية 2" class="song-cover">
            <div>
              <h3>أغنية 2</h3>
              <p>فنان 2</p>
            </div>
          </div>
          <div class="song-duration">4:20</div>
        </div>
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/12/200" alt="أغنية 3" class="song-cover">
            <div>
              <h3>أغنية 3</h3>
              <p>فنان 3</p>
            </div>
          </div>
          <div class="song-duration">2:56</div>
        </div>
      </div>
    </section>
  </main>
  
  <footer class="player">
    <div class="now-playing">
      <div class="now-playing-info">
        <img src="https://picsum.photos/id/10/200" alt="أغنية 1" class="now-playing-cover">
        <div>
          <h4>أغنية 1</h4>
          <p>فنان 1</p>
        </div>
      </div>
      <div class="player-controls">
        <button>⏮️</button>
        <button class="play-pause">⏸️</button>
        <button>⏭️</button>
      </div>
      <div class="player-progress">
        <div class="progress-bar">
          <div class="progress" style="width: 30%"></div>
        </div>
      </div>
    </div>
  </footer>
  
  <script>
    // Simulate song playing functionality
    document.querySelectorAll('.song-item, .featured-item').forEach(item => {
      item.addEventListener('click', function() {
        const playPauseButton = document.querySelector('.play-pause');
        playPauseButton.textContent = '⏸️';
      });
    });
  </script>
</body>
</html>`;
    }
  };

  const generateSpotifyLikeBackend = (lang, promptText) => {
    if (lang === "python") {
      return `# Python Flask API for Spotify-like ${promptText}
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample music data
songs = [
    {
        "id": 1, 
        "title": "أغنية 1", 
        "artist": "فنان 1", 
        "album": "ألبوم 1",
        "cover": "https://picsum.photos/id/1/200",
        "duration": "3:45",
        "audio_file": "/audio/song1.mp3"
    },
    {
        "id": 2, 
        "title": "أغنية 2", 
        "artist": "فنان 2", 
        "album": "ألبوم 2",
        "cover": "https://picsum.photos/id/2/200",
        "duration": "4:20",
        "audio_file": "/audio/song2.mp3"
    },
    {
        "id": 3, 
        "title": "أغنية 3", 
        "artist": "فنان 3", 
        "album": "ألبوم 1",
        "cover": "https://picsum.photos/id/3/200",
        "duration": "2:56",
        "audio_file": "/audio/song3.mp3"
    },
    {
        "id": 4, 
        "title": "أغنية 4", 
        "artist": "فنان 2", 
        "album": "ألبوم 3",
        "cover": "https://picsum.photos/id/4/200",
        "duration": "3:22",
        "audio_file": "/audio/song4.mp3"
    },
    {
        "id": 5, 
        "title": "أغنية 5", 
        "artist": "فنان 1", 
        "album": "ألبوم 2",
        "cover": "https://picsum.photos/id/5/200",
        "duration": "4:10",
        "audio_file": "/audio/song5.mp3"
    },
]

playlists = [
    {
        "id": 1,
        "title": "قائمة التشغيل 1",
        "cover": "https://picsum.photos/id/10/200",
        "songs": [1, 3, 5]
    },
    {
        "id": 2,
        "title": "قائمة التشغيل 2",
        "cover": "https://picsum.photos/id/11/200",
        "songs": [2, 4]
    }
]

users = [
    {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "password": "hashed_password_here",
        "playlists": [1],
        "recently_played": [2, 3, 1]
    }
]

@app.route('/api/songs', methods=['GET'])
def get_songs():
    return jsonify(songs)

@app.route('/api/songs/<int:song_id>', methods=['GET'])
def get_song(song_id):
    song = next((song for song in songs if song["id"] == song_id), None)
    if song:
        return jsonify(song)
    return jsonify({"error": "الأغنية غير موجودة"}), 404

@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    return jsonify(playlists)

@app.route('/api/playlists/<int:playlist_id>', methods=['GET'])
def get_playlist(playlist_id):
    playlist = next((playlist for playlist in playlists if playlist["id"] == playlist_id), None)
    if not playlist:
        return jsonify({"error": "قائمة التشغيل غير موجودة"}), 404
    
    # Expand song details in playlist
    playlist_songs = []
    for song_id in playlist["songs"]:
        song = next((song for song in songs if song["id"] == song_id), None)
        if song:
            playlist_songs.append(song)
    
    playlist_detail = playlist.copy()
    playlist_detail["songs"] = playlist_songs
    
    return jsonify(playlist_detail)

@app.route('/api/user/recently-played', methods=['GET'])
def get_recently_played():
    # Simplified: return first user's recently played
    user = users[0]
    recently_played = []
    for song_id in user["recently_played"]:
        song = next((song for song in songs if song["id"] == song_id), None)
        if song:
            recently_played.append(song)
    
    return jsonify(recently_played)

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify([])
    
    results = []
    # Search in songs
    for song in songs:
        if query in song["title"].lower() or query in song["artist"].lower() or query in song["album"].lower():
            results.append({"type": "song", "data": song})
    
    # Search in playlists
    for playlist in playlists:
        if query in playlist["title"].lower():
            results.append({"type": "playlist", "data": playlist})
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)`;
    } else {
      // Node.js Express API
      return `// Node.js Express API for Spotify-like ${promptText}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sample music data
const songs = [
  {
    id: 1, 
    title: "أغنية 1", 
    artist: "فنان 1", 
    album: "ألبوم 1",
    cover: "https://picsum.photos/id/1/200",
    duration: "3:45",
    audio_file: "/audio/song1.mp3"
  },
  {
    id: 2, 
    title: "أغنية 2", 
    artist: "فنان 2", 
    album: "ألبوم 2",
    cover: "https://picsum.photos/id/2/200",
    duration: "4:20",
    audio_file: "/audio/song2.mp3"
  },
  {
    id: 3, 
    title: "أغنية 3", 
    artist: "فنان 3", 
    album: "ألبوم 1",
    cover: "https://picsum.photos/id/3/200",
    duration: "2:56",
    audio_file: "/audio/song3.mp3"
  },
  {
    id: 4, 
    title: "أغنية 4", 
    artist: "فنان 2", 
    album: "ألبوم 3",
    cover: "https://picsum.photos/id/4/200",
    duration: "3:22",
    audio_file: "/audio/song4.mp3"
  },
  {
    id: 5, 
    title: "أغنية 5", 
    artist: "فنان 1", 
    album: "ألبوم 2",
    cover: "https://picsum.photos/id/5/200",
    duration: "4:10",
    audio_file: "/audio/song5.mp3"
  },
];

const playlists = [
  {
    id: 1,
    title: "قائمة التشغيل 1",
    cover: "https://picsum.photos/id/10/200",
    songs: [1, 3, 5]
  },
  {
    id: 2,
    title: "قائمة التشغيل 2",
    cover: "https://picsum.photos/id/11/200",
    songs: [2, 4]
  }
];

const users = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    password: "hashed_password_here",
    playlists: [1],
    recently_played: [2, 3, 1]
  }
];

// Get all songs
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

// Get a specific song
app.get('/api/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = songs.find(song => song.id === id);
  
  if (!song) {
    return res.status(404).json({ error: 'الأغنية غير موجودة' });
  }
  
  res.json(song);
});

// Get all playlists
app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

// Get a specific playlist with expanded song details
app.get('/api/playlists/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const playlist = playlists.find(playlist => playlist.id === id);
  
  if (!playlist) {
    return res.status(404).json({ error: 'قائمة التشغيل غير موجودة' });
  }
  
  // Expand song details in playlist
  const playlistSongs = playlist.songs.map(songId => {
    return songs.find(song => song.id === songId);
  }).filter(Boolean);
  
  const playlistDetail = {
    ...playlist,
    songs: playlistSongs
  };
  
  res.json(playlistDetail);
});

// Get currently logged in user's recently played songs
app.get('/api/user/recently-played', (req, res) => {
  // Simplified: return first user's recently played
  const user = users[0];
  const recentlyPlayed = user.recently_played.map(songId => {
    return songs.find(song => song.id === songId);
  }).filter(Boolean);
  
  res.json(recentlyPlayed);
});

// Search API
app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  if (!query) {
    return res.json([]);
  }
  
  const results = [];
  
  // Search in songs
  songs.forEach(song => {
    if (
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) || 
      song.album.toLowerCase().includes(query)
    ) {
      results.push({ type: 'song', data: song });
    }
  });
  
  // Search in playlists
  playlists.forEach(playlist => {
    if (playlist.title.toLowerCase().includes(query)) {
      results.push({ type: 'playlist', data: playlist });
    }
  });
  
  res.json(results);
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`;
    }
  };

  const generateSpotifyLikePreview = (promptText) => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${promptText}</title>
  <style>
    :root {
      --primary-color: #1DB954;
      --secondary-color: #191414;
      --text-color: #fff;
      --background-light: #282828;
      --background-dark: #121212;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background-dark);
      color: var(--text-color);
      height: 100vh;
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: 1fr 90px;
      grid-template-areas:
        "sidebar main"
        "player player";
    }
    
    .sidebar {
      grid-area: sidebar;
      background-color: var(--secondary-color);
      padding: 24px 0;
    }
    
    .logo {
      padding: 0 24px 24px;
      color: var(--text-color);
    }
    
    .sidebar nav ul {
      list-style: none;
    }
    
    .sidebar nav ul li {
      padding: 12px 24px;
      cursor: pointer;
    }
    
    .sidebar nav ul li.active {
      background-color: var(--background-light);
    }
    
    main {
      grid-area: main;
      background: linear-gradient(to bottom, #434343, var(--background-dark));
      padding: 24px;
      overflow-y: auto;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    
    .search-bar {
      width: 40%;
    }
    
    .search-bar input {
      width: 100%;
      background-color: #fff;
      border: none;
      padding: 12px;
      border-radius: 30px;
    }
    
    .user-button {
      background-color: #000;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 30px;
      cursor: pointer;
    }
    
    .featured-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 24px;
      margin-top: 16px;
    }
    
    .featured-item {
      background-color: var(--background-light);
      padding: 16px;
      border-radius: 6px;
      transition: background-color 0.3s;
      cursor: pointer;
    }
    
    .featured-item:hover {
      background-color: #3E3E3E;
    }
    
    .featured-cover {
      position: relative;
      margin-bottom: 16px;
    }
    
    .featured-cover img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .song-list {
      margin-top: 16px;
    }
    
    .song-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .song-item:hover {
      background-color: var(--background-light);
    }
    
    .song-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .song-cover {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    
    .player {
      grid-area: player;
      background-color: var(--secondary-color);
      border-top: 1px solid #3E3E3E;
      padding: 0 16px;
    }
    
    .now-playing {
      display: grid;
      grid-template-columns: 30% 40% 30%;
      height: 100%;
      align-items: center;
    }
    
    .now-playing-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .now-playing-cover {
      width: 56px;
      height: 56px;
      border-radius: 4px;
    }
    
    .player-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    
    .player-controls button {
      background: none;
      border: none;
      color: var(--text-color);
      cursor: pointer;
      font-size: 20px;
    }
    
    .play-pause {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--text-color) !important;
      color: var(--secondary-color) !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .player-progress {
      width: 100%;
      padding: 0 20px;
    }
    
    .progress-bar {
      width: 100%;
      height: 4px;
      background-color: #5E5E5E;
      border-radius: 2px;
    }
    
    .progress {
      height: 100%;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
    
    h2 {
      margin: 32px 0 16px;
    }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div class="logo">
      <h1>${promptText}</h1>
    </div>
    <nav>
      <ul>
        <li class="active">الرئيسية</li>
        <li>البحث</li>
        <li>مكتبتك</li>
        <li>قوائم التشغيل</li>
      </ul>
    </nav>
  </aside>
  
  <main>
    <header>
      <div class="search-bar">
        <input type="text" placeholder="ابحث عن الأغاني والفنانين والألبومات">
      </div>
      <div class="user-menu">
        <button class="user-button">المستخدم</button>
      </div>
    </header>
    
    <section>
      <h2>مميز لك</h2>
      <div class="featured-items">
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/1/200" alt="قائمة تشغيل 1">
          </div>
          <h3>قائمة تشغيل 1</h3>
          <p>فنان 1</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/2/200" alt="قائمة تشغيل 2">
          </div>
          <h3>قائمة تشغيل 2</h3>
          <p>فنان 2</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/3/200" alt="قائمة تشغيل 3">
          </div>
          <h3>قائمة تشغيل 3</h3>
          <p>فنان 3</p>
        </div>
        <div class="featured-item">
          <div class="featured-cover">
            <img src="https://picsum.photos/id/4/200" alt="قائمة تشغيل 4">
          </div>
          <h3>قائمة تشغيل 4</h3>
          <p>فنان 4</p>
        </div>
      </div>
    </section>
    
    <section>
      <h2>تم تشغيله مؤخرًا</h2>
      <div class="song-list">
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/10/200" alt="أغنية 1" class="song-cover">
            <div>
              <h3>أغنية 1</h3>
              <p>فنان 1</p>
            </div>
          </div>
          <div class="song-duration">3:45</div>
        </div>
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/11/200" alt="أغنية 2" class="song-cover">
            <div>
              <h3>أغنية 2</h3>
              <p>فنان 2</p>
            </div>
          </div>
          <div class="song-duration">4:20</div>
        </div>
        <div class="song-item">
          <div class="song-info">
            <img src="https://picsum.photos/id/12/200" alt="أغنية 3" class="song-cover">
            <div>
              <h3>أغنية 3</h3>
              <p>فنان 3</p>
            </div>
          </div>
          <div class="song-duration">2:56</div>
        </div>
      </div>
    </section>
  </main>
  
  <footer class="player">
    <div class="now-playing">
      <div class="now-playing-info">
        <img src="https://picsum.photos/id/10/200" alt="أغنية 1" class="now-playing-cover">
        <div>
          <h4>أغنية 1</h4>
          <p>فنان 1</p>
        </div>
      </div>
      <div class="player-controls">
        <button>⏮️</button>
        <button class="play-pause">⏸️</button>
        <button>⏭️</button>
      </div>
      <div class="player-progress">
        <div class="progress-bar">
          <div class="progress" style="width: 30%"></div>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
  };

  // Similar functions for other site types (ecommerce, social media, blog)
  const generateEcommerceFrontend = (lang, promptText) => {
    // Implementation similar to the Spotify example but for e-commerce
    return lang === "javascript" || lang === "react" 
      ? `// React Component for E-commerce ${promptText}
import React, { useState, useEffect } from 'react';
import './styles.css';

function EcommerceApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="ecommerce-app">
      <header className="main-header">
        <div className="container">
          <h1 className="logo">${promptText}</h1>
          <div className="search-bar">
            <input type="text" placeholder="ابحث عن المنتجات..." />
            <button>بحث</button>
          </div>
          <nav className="main-nav">
            <ul>
              <li><a href="#">الرئيسية</a></li>
              <li><a href="#">المنتجات</a></li>
              <li><a href="#">العروض</a></li>
              <li><a href="#">تواصل معنا</a></li>
            </ul>
          </nav>
          <div className="cart-icon">
            🛒 <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>
      
      <main className="container">
        <section className="hero">
          <h2>أحدث المنتجات لدينا</h2>
          <p>تسوق الآن واحصل على خصم يصل إلى 50%</p>
          <button className="cta-button">تسوق الآن</button>
        </section>
        
        {loading ? (
          <div className="loading">جاري تحميل المنتجات...</div>
        ) : (
          <section className="products">
            <h2>منتجاتنا المميزة</h2>
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <div className="product-price">{product.price} ج.م</div>
                  <p>{product.description}</p>
                  <button 
                    className="add-to-cart" 
                    onClick={() => addToCart(product)}
                  >
                    إضافة إلى السلة
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className="categories">
          <h2>تصفح حسب الفئة</h2>
          <div className="category-grid">
            <div className="category-card">
              <img src="https://picsum.photos/id/26/200" alt="إلكترونيات" />
              <h3>إلكترونيات</h3>
            </div>
            <div className="category-card">
              <img src="https://picsum.photos/id/27/200" alt="ملابس" />
              <h3>ملابس</h3>
            </div>
            <div className="category-card">
              <img src="https://picsum.photos/id/28/200" alt="أثاث" />
              <h3>أثاث</h3>
            </div>
            <div className="category-card">
              <img src="https://picsum.photos/id/29/200" alt="مستلزمات منزلية" />
              <h3>مستلزمات منزلية</h3>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="main-footer">
        <div className="container">
          <div className="footer-nav">
            <div className="footer-section">
              <h3>تسوق</h3>
              <ul>
                <li><a href="#">منتجات جديدة</a></li>
                <li><a href="#">الأكثر مبيعًا</a></li>
                <li><a href="#">العروض</a></li>
                <li><a href="#">تخفيضات</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>حسابي</h3>
              <ul>
                <li><a href="#">تسجيل الدخول</a></li>
                <li><a href="#">مشترياتي</a></li>
                <li><a href="#">قائمة الرغبات</a></li>
                <li><a href="#">تتبع الطلبات</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>تواصل معنا</h3>
              <address>
                العنوان: شارع الرئيسي، المدينة<br />
                رقم الهاتف: 123-456-789<br />
                البريد الإلكتروني: info@example.com
              </address>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} {promptText}. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EcommerceApp;`
      : `<!-- HTML for E-commerce ${promptText} -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${promptText}</title>
  <style>
    :root {
      --primary-color: #f97316;
      --secondary-color: #2563eb;
      --text-color: #333;
      --light-bg: #f9fafb;
      --dark-bg: #1f2937;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--text-color);
      background-color: var(--light-bg);
    }
    
    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    a {
      text-decoration: none;
      color: inherit;
    }
    
    ul {
      list-style: none;
    }
    
    .main-header {
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .main-header .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .search-bar {
      display: flex;
      min-width: 300px;
    }
    
    .search-bar input {
      flex-grow: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    
    .search-bar button {
      padding: 0.5rem 1rem;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    .main-nav ul {
      display: flex;
      gap: 1.5rem;
    }
    
    .main-nav a:hover {
      color: var(--primary-color);
    }
    
    .cart-icon {
      font-size: 1.2rem;
      position: relative;
    }
    
    .cart-count {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: var(--secondary-color);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }
    
    .hero {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://picsum.photos/id/1/1200/400');
      background-size: cover;
      color: white;
      text-align: center;
      padding: 4rem 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
    
    .hero h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    
    .cta-button {
      background-color: var(--primary-color);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      font-size: 1.1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .cta-button:hover {
      background-color: #e86207;
    }
    
    h2 {
      margin: 2rem 0 1rem;
      color: var(--dark-bg);
    }
    
    .product-grid, .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      margin: 1rem 0 3rem;
    }
    
    .product-card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .product-card h3, .product-card p, .product-price {
      padding: 0 1rem;
    }
    
    .product-card h3 {
      margin: 1rem 0 0.5rem;
    }
    
    .product-price {
      color: var(--primary-color);
      font-weight: bold;
      font-size: 1.2rem;
      margin: 0.5rem 0;
    }
    
    .product-card p {
      color: #666;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    
    .add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .add-to-cart:hover {
      background-color: #1e40af;
    }
    
    .category-card {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s;
    }
    
    .category-card:hover {
      transform: translateY(-5px);
    }
    
    .category-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    
    .category-card h3 {
      padding: 1rem;
    }
    
    .main-footer {
      background-color: var(--dark-bg);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: 3rem;
    }
    
    .footer-nav {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }
    
    .footer-section h3 {
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    
    .footer-section ul li {
      margin-bottom: 0.5rem;
    }
    
    .footer-section a:hover {
      color: var(--primary-color);
    }
    
    .copyright {
      text-align: center;
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #374151;
    }
    
    .loading {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
    }
  </style>
</head>
<body>
  <header class="main-header">
    <div class="container">
      <h1 class="logo">${promptText}</h1>
      <div class="search-bar">
        <input type="text" placeholder="ابحث عن المنتجات..." />
        <button>بحث</button>
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="#">الرئيسية</a></li>
          <li><a href="#">المنتجات</a></li>
          <li><a href="#">العروض</a></li>
          <li><a href="#">تواصل معنا</a></li>
        </ul>
      </nav>
      <div class="cart-icon">
        🛒 <span class="cart-count">0</span>
      </div>
    </div>
  </header>
  
  <main class="container">
    <section class="hero">
      <h2>أحدث المنتجات لدينا</h2>
      <p>تسوق الآن واحصل على خصم يصل إلى 50%</p>
      <button class="cta-button">تسوق الآن</button>
    </section>
    
    <section class="products">
      <h2>منتجاتنا المميزة</h2>
      <div class="product-grid">
        <div class="product-card">
          <img src="https://picsum.photos/id/21/300" alt="منتج 1" />
          <h3>منتج 1</h3>
          <div class="product-price">199.99 ج.م</div>
          <p>وصف مختصر للمنتج. هذا النص هو مثال لنص يمكن أن يستبدل.</p>
          <button class="add-to-cart">إضافة إلى السلة</button>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/22/300" alt="منتج 2" />
          <h3>منتج 2</h3>
          <div class="product-price">299.99 ج.م</div>
          <p>وصف مختصر للمنتج. هذا النص هو مثال لنص يمكن أن يستبدل.</p>
          <button class="add-to-cart">إضافة إلى السلة</button>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/23/300" alt="منتج 3" />
          <h3>منتج 3</h3>
          <div class="product-price">149.99 ج.م</div>
          <p>وصف مختصر للمنتج. هذا النص هو مثال لنص يمكن أن يستبدل.</p>
          <button class="add-to-cart">إضافة إلى السلة</button>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/24/300" alt="منتج 4" />
          <h3>منتج 4</h3>
          <div class="product-price">399.99 ج.م</div>
          <p>وصف مختصر للمنتج. هذا النص هو مثال لنص يمكن أن يستبدل.</p>
          <button class="add-to-cart">إضافة إلى السلة</button>
        </div>
      </div>
    </section>
    
    <section class="categories">
      <h2>تصفح حسب الفئة</h2>
      <div class="category-grid">
        <div class="category-card">
          <img src="https://picsum.photos/id/26/300" alt="إلكترونيات" />
          <h3>إلكترونيات</h3>
        </div>
        <div class="category-card">
          <img src="https://picsum.photos/id/27/300" alt="ملابس" />
          <h3>ملابس</h3>
        </div>
        <div class="category-card">
          <img src="https://picsum.photos/id/28/300" alt="أثاث" />
          <h3>أثاث</h3>
        </div>
        <div class="category-card">
          <img src="https://picsum.photos/id/29/300" alt="مستلزمات منزلية" />
          <h3>مستلزمات منزلية</h3>
        </div>
      </div>
    </section>
  </main>
  
  <footer class="main-footer">
    <div class="container">
      <div class="footer-nav">
        <div class="footer-section">
          <h3>تسوق</h3>
          <ul>
            <li><a href="#">منتجات جديدة</a></li>
            <li><a href="#">الأكثر مبيعًا</a></li>
            <li><a href="#">العروض</a></li>
            <li><a href="#">تخفيضات</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>حسابي</h3>
          <ul>
            <li><a href="#">تسجيل الدخول</a></li>
            <li><a href="#">مشترياتي</a></li>
            <li><a href="#">قائمة الرغبات</a></li>
            <li><a href="#">تتبع الطلبات</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>تواصل معنا</h3>
          <address>
            العنوان: شارع الرئيسي، المدينة<br />
            رقم الهاتف: 123-456-789<br />
            البريد الإلكتروني: info@example.com
          </address>
        </div>
      </div>
      <div class="copyright">
        &copy; 2023 ${promptText}. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
  
  <script>
    // Simple cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        count++;
        cartCount.textContent = count;
        
        // Add animation effect
        button.textContent = 'تمت الإضافة! ✓';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
          button.textContent = 'إضافة إلى السلة';
          button.style.backgroundColor = '';
        }, 1500);
      });
    });
  </script>
</body>
</html>`;
  };

  const generateEcommerceBackend = (lang, promptText) => {
    // Implementation for ecommerce backend code
    return `// Backend code for E-commerce ${promptText}`;
  };

  const generateEcommercePreview = (promptText) => {
    // Implementation for ecommerce preview
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${promptText} - متجر إلكتروني</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f9fafb; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 15px 0; }
    .header-container { display: flex; justify-content: space-between; align-items: center; }
    .logo { color: #f97316; font-weight: bold; font-size: 24px; }
    .nav { display: flex; gap: 20px; }
    .cart { position: relative; }
    .cart-count { position: absolute; top: -10px; right: -10px; background: #2563eb; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://picsum.photos/id/1/1200/400'); background-size: cover; color: white; text-align: center; padding: 80px 0; margin: 20px 0; border-radius: 8px; }
    .cta-button { background: #f97316; color: white; border: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; margin-top: 20px; cursor: pointer; }
    .products { margin: 40px 0; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
    .product-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .product-card img { width: 100%; height: 200px; object-fit: cover; }
    .product-info { padding: 15px; }
    .product-price { color: #f97316; font-weight: bold; margin: 10px 0; }
    .add-button { width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 0; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <div class="container header-container">
      <div class="logo">${promptText}</div>
      <div class="nav">
        <div>الرئيسية</div>
        <div>المنتجات</div>
        <div>العروض</div>
      </div>
      <div class="cart">
        🛒 <span class="cart-count">0</span>
      </div>
    </div>
  </header>
  
  <div class="container">
    <div class="hero">
      <h1>أحدث المنتجات لدينا</h1>
      <p>تسوق الآن واحصل على خصم حتى 50%</p>
      <button class="cta-button">تسوق الآن</button>
    </div>
    
    <div class="products">
      <h2>منتجاتنا المميزة</h2>
      <div class="product-grid">
        <div class="product-card">
          <img src="https://picsum.photos/id/21/300" alt="منتج 1">
          <div class="product-info">
            <h3>منتج 1</h3>
            <div class="product-price">199.99 ج.م</div>
            <p>وصف مختصر للمنتج.</p>
            <button class="add-button">إضافة للسلة</button>
          </div>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/22/300" alt="منتج 2">
          <div class="product-info">
            <h3>منتج 2</h3>
            <div class="product-price">299.99 ج.م</div>
            <p>وصف مختصر للمنتج.</p>
            <button class="add-button">إضافة للسلة</button>
          </div>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/23/300" alt="منتج 3">
          <div class="product-info">
            <h3>منتج 3</h3>
            <div class="product-price">149.99 ج.م</div>
            <p>وصف مختصر للمنتج.</p>
            <button class="add-button">إضافة للسلة</button>
          </div>
        </div>
        <div class="product-card">
          <img src="https://picsum.photos/id/24/300" alt="منتج 4">
          <div class="product-info">
            <h3>منتج 4</h3>
            <div class="product-price">399.99 ج.م</div>
            <p>وصف مختصر للمنتج.</p>
            <button class="add-button">إضافة للسلة</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  const generateSocialMediaFrontend = (lang, promptText) => {
    // Implementation for social media frontend code
    return `// Social Media code for ${promptText}`;
  };

  const generateSocialMediaBackend = (lang, promptText) => {
    // Implementation for social media backend code
    return `// Backend Social Media code for ${promptText}`;
  };

  const generateSocialMediaPreview = (promptText) => {
    // Implementation for social media preview
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${promptText} - منصة اجتماعية</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; display: flex; }
    header { background: #3b82f6; color: white; padding: 10px 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; }
    .logo { font-weight: bold; font-size: 24px; }
    .search { background: white; border-radius: 20px; padding: 8px 16px; width: 300px; }
    .sidebar { width: 250px; background: white; height: calc(100vh - 60px); padding: 20px; }
    .sidebar-menu div { padding: 10px 0; cursor: pointer; }
    .sidebar-menu div:hover { color: #3b82f6; }
    .main-content { flex-grow: 1; padding: 20px; }
    .post { background: white; border-radius: 8px; padding: 15px; margin-bottom: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .post-header { display: flex; align-items: center; margin-bottom: 10px; }
    .post-avatar { width: 40px; height: 40px; border-radius: 50%; margin-left: 10px; }
    .post-content { margin-bottom: 10px; }
    .post-image { width: 100%; border-radius: 8px; margin: 10px 0; }
    .post-actions { display: flex; border-top: 1px solid #ddd; padding-top: 10px; }
    .post-actions div { flex: 1; text-align: center; padding: 5px 0; cursor: pointer; }
    .post-actions div:hover { color: #3b82f6; }
  </style>
</head>
<body>
  <header>
    <div class="logo">${promptText}</div>
    <div class="search">🔍 البحث</div>
    <div>👤 الملف الشخصي</div>
  </header>
  
  <div class="container">
    <div class="sidebar">
      <div class="sidebar-menu">
        <div><strong>الصفحة الرئيسية</strong></div>
        <div>الملف الشخصي</div>
        <div>الأصدقاء</div>
        <div>المجموعات</div>
        <div>الصور</div>
        <div>الفيديوهات</div>
        <div>الإشعارات</div>
        <div>الإعدادات</div>
      </div>
    </div>
    
    <div class="main-content">
      <div class="post">
        <div class="post-header">
          <img src="https://picsum.photos/id/64/100" class="post-avatar">
          <div>
            <div><strong>أحمد محمد</strong></div>
            <div>منذ 3 ساعات</div>
          </div>
        </div>
        <div class="post-content">
          هذا مثال على منشور في ${promptText}. يمكن أن يحتوي على نص ووسائط متعددة.
        </div>
        <img src="https://picsum.photos/id/48/800/400" class="post-image">
        <div class="post-actions">
          <div>👍 إعجاب</div>
          <div>💬 تعليق</div>
          <div>🔄 مشاركة</div>
        </div>
      </div>
      
      <div class="post">
        <div class="post-header">
          <img src="https://picsum.photos/id/65/100" class="post-avatar">
          <div>
            <div><strong>سارة أحمد</strong></div>
            <div>منذ 5 ساعات</div>
          </div>
        </div>
        <div class="post-content">
          منشور آخر مع صورة مختلفة ومحتوى مختلف للعرض التوضيحي.
        </div>
        <img src="https://picsum.photos/id/49/800/400" class="post-image">
        <div class="post-actions">
          <div>👍 إعجاب</div>
          <div>💬 تعليق</div>
          <div>🔄 مشاركة</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  const generateBlogFrontend = (lang, promptText) => {
    // Implementation for blog frontend code
    return `// Blog code for ${promptText}`;
  };

  const generateBlogBackend = (lang, promptText) => {
    // Implementation for blog backend code
    return `// Backend Blog code for ${promptText}`;
  };

  const generateBlogPreview = (promptText) => {
    // Implementation for blog preview
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${promptText} - مدونة</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
    header { background: #10b981; color: white; padding: 20px 0; }
    .header-container { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: bold; }
    nav ul { display: flex; list-style: none; }
    nav ul li { margin-right: 20px; }
    nav ul li a { color: white; text-decoration: none; }
    .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://picsum.photos/id/30/1200/400'); background-size: cover; color: white; text-align: center; padding: 80px 0; margin: 20px 0; border-radius: 8px; }
    .hero h1 { font-size: 36px; margin-bottom: 20px; }
    .articles { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; margin: 40px 0; }
    .article { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .article img { width: 100%; height: 200px; object-fit: cover; }
    .article-content { padding: 20px; }
    .article-meta { color: #666; font-size: 14px; margin-bottom: 10px; }
    .read-more { display: inline-block; background: #10b981; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; margin-top: 10px; }
  </style>
</head>
<body>
  <header>
    <div class="container header-container">
      <div class="logo">${promptText}</div>
      <nav>
        <ul>
          <li><a href="#">الرئيسية</a></li>
          <li><a href="#">المقالات</a></li>
          <li><a href="#">الفئات</a></li>
          <li><a href="#">من نحن</a></li>
          <li><a href="#">اتصل بنا</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <div class="container">
    <div class="hero">
      <h1>أحدث المقالات والأخبار</h1>
      <p>ابق على اطلاع بآخر المستجدات والأخبار في مجال اهتمامك</p>
    </div>
    
    <h2>مقالات مميزة</h2>
    <div class="articles">
      <div class="article">
        <img src="https://picsum.photos/id/31/400" alt="مقال 1">
        <div class="article-content">
          <div class="article-meta">نشر في 15 مارس 2023 | بواسطة: أحمد</div>
          <h3>عنوان المقال الأول</h3>
          <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي.</p>
          <a href="#" class="read-more">قراءة المزيد</a>
        </div>
      </div>
      <div class="article">
        <img src="https://picsum.photos/id/32/400" alt="مقال 2">
        <div class="article-content">
          <div class="article-meta">نشر في 10 مارس 2023 | بواسطة: سارة</div>
          <h3>عنوان المقال الثاني</h3>
          <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي.</p>
          <a href="#" class="read-more">قراءة المزيد</a>
        </div>
      </div>
      <div class="article">
        <img src="https://picsum.photos/id/33/400" alt="مقال 3">
        <div class="article-content">
          <div class="article-meta">نشر في 5 مارس 2023 | بواسطة: محمد</div>
          <h3>عنوان المقال الثالث</h3>
          <p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي.</p>
          <a href="#" class="read-more">قراءة المزيد</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
  };
  
  // Generic code generators as fallback
  const generateGenericFrontend = (lang, promptText) => {
    // Default implementation similar to original function
    if (lang === "javascript" || lang === "react") {
      return `// React Component for ${promptText}
import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data from API
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>${promptText}</h1>
      </header>
      <main>
        {loading ? (
          <p>جاري التحميل...</p>
        ) : (
          <div className="data-container">
            {data.map(item => (
              <div key={item.id} className="item">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>
        <p>تم إنشاؤه بواسطة Code Sculptor AI</p>
      </footer>
    </div>
  );
}

export default App;`;
    } else {
      return `<!-- HTML for ${promptText} -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${promptText}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      background: linear-gradient(to right, #6b46c1, #3182ce);
      color: #fff;
      padding: 1rem;
      text-align: center;
    }
    .content {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    footer {
      text-align: center;
      margin-top: 2rem;
      padding: 1rem;
      background-color: #333;
      color: #fff;
    }
  </style>
</head>
<body>
  <header>
    <h1>${promptText}</h1>
  </header>
  <div class="container">
    <div class="content">
      <h2>مرحبًا بكم</h2>
      <p>هذا هو محتوى ${promptText}. يمكنك تخصيص هذا المحتوى حسب احتياجاتك.</p>
      <div id="app-content">
        <!-- محتوى التطبيق سيظهر هنا -->
        <p>جاري تحميل البيانات...</p>
      </div>
    </div>
  </div>
  <footer>
    <p>تم إنشاؤه بواسطة Code Sculptor AI</p>
  </footer>

  <script>
    // JavaScript code will go here
    document.addEventListener('DOMContentLoaded', function() {
      // Simulate loading data
      setTimeout(function() {
        document.getElementById('app-content').innerHTML = '<p>تم تحميل البيانات بنجاح!</p>';
      }, 2000);
    });
  </script>
</body>
</html>`;
    }
  };

  const generateGenericBackend = (lang, promptText) => {
    if (lang === "python") {
      return `# Python Flask API for ${promptText}
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
data = [
    {"id": 1, "title": "عنوان 1", "description": "وصف للعنصر الأول"},
    {"id": 2, "title": "عنوان 2", "description": "وصف للعنصر الثاني"},
    {"id": 3, "title": "عنوان 3", "description": "وصف للعنصر الثالث"}
]

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/api/data/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in data if item["id"] == item_id), None)
    if item:
        return jsonify(item)
    return jsonify({"error": "العنصر غير موجود"}), 404

@app.route('/api/data', methods=['POST'])
def add_item():
    new_item = request.json
    new_item["id"] = len(data) + 1
    data.append(new_item)
    return jsonify(new_item), 201

if __name__ == '__main__':
    app.run(debug=True)`;
    } else {
      return `// Node.js Express API for ${promptText}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sample data
let data = [
  { id: 1, title: 'عنوان 1', description: 'وصف للعنصر الأول' },
  { id: 2, title: 'عنوان 2', description: 'وصف للعنصر الثاني' },
  { id: 3, title: 'عنوان 3', description: 'وصف للعنصر الثالث' }
];

// Get all items
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Get single item
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'العنصر غير موجود' });
  }
  
  res.json(item);
});

// Create new item
app.post('/api/data', (req, res) => {
  const newItem = {
    id: data.length + 1,
    title: req.body.title,
    description: req.body.description
  };
  
  data.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`;
    }
  };

  const generateGenericPreview = (promptText) => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${promptText}</title>
  <style>
    body { font-family: Arial; line-height: 1.6; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    header { text-align: center; padding: 10px; background: linear-gradient(to right, #6b46c1, #3182ce); color: white; border-radius: 4px; }
    .item { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${promptText}</h1>
    </header>
    <div id="content">
      <div class="item">
        <h2>عنوان 1</h2>
        <p>وصف للعنصر الأول</p>
      </div>
      <div class="item">
        <h2>عنوان 2</h2>
        <p>وصف للعنصر الثاني</p>
      </div>
      <div class="item">
        <h2>عنوان 3</h2>
        <p>وصف للعنصر الثالث</p>
      </div>
    </div>
    <footer>
      <p>تم إنشاؤه بواسطة Code Sculptor AI</p>
    </footer>
  </div>
</body>
</html>`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="p-6 bg-gray-900 border-gray-700 shadow-xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <Bot className="h-6 w-6" />
            <h2 className="text-2xl font-semibold text-white">Code Sculptor AI</h2>
          </div>

          <div className="space-y-4">
            <label htmlFor="prompt" className="block text-lg font-medium text-gray-200 text-right">
              صف المشروع الذي تريد بناءه
            </label>
            <Textarea
              id="prompt"
              dir="rtl"
              placeholder="مثال: أريد موقع شبيه بسبوتيفاي، أو متجر إلكتروني لبيع الملابس..."
              className="min-h-32 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />

          <Button 
            onClick={generateCode} 
            disabled={isGenerating} 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            {isGenerating ? "جاري توليد الكود..." : "توليد الكود"}
          </Button>
        </div>
      </Card>

      {(frontendCode || backendCode) && (
        <div className="mt-8 space-y-8">
          <CodeDisplay frontendCode={frontendCode} backendCode={backendCode} />
          <PreviewPanel previewContent={previewContent} />
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
