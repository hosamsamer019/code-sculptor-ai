
import { useState } from "react";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import LanguageSelector from "./LanguageSelector";
import CodeDisplay from "./CodeDisplay";
import PreviewPanel from "./PreviewPanel";
import { useToast } from "@/components/ui/use-toast";

// Add props interface to define the accepted props
interface CodeGeneratorProps {
  initialPrompt?: string; // Make it optional with a '?'
}

// Update the component to accept props
const CodeGenerator = ({ initialPrompt = "" }: CodeGeneratorProps) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState(initialPrompt); // Use the initial prompt if provided
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

  const getSiteTypeInArabic = (type: string) => {
    switch (type) {
      case "spotify": return "خدمة موسيقى";
      case "ecommerce": return "متجر إلكتروني";
      case "social": return "وسائل تواصل اجتماعي";
      case "blog": return "مدونة";
      default: return "تطبيق ويب";
    }
  };

  // Functions for generating specific site types
  const generateSpotifyLikeFrontend = (lang: string, promptText: string) => {
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

  const generateSpotifyLikeBackend = (lang: string, promptText: string) => {
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
  
  let results = [];
  
  // Search in songs
  songs.forEach(song => {
    if (song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query) || 
        song.album.toLowerCase().includes(query)) {
      results.push({ type: 'song', data: song });
    }
  });
  
  // Search in playlists
  playlists.forEach(playlist => {
    if (playlist.title.toLowerCase().includes(query)) {
      results.push({ type: 'playlist', data: playlist });
    }
  });
  
  return res.json(results);
});

app.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
`;
    }
  };

  const generateSpotifyLikePreview = (promptText: string) => {
    return `
    <div class="spotify-preview">
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
        <section class="featured">
          <h2>مميز لك</h2>
          <div class="featured-items">
            <div class="featured-item">
              <div class="featured-cover">
                <img src="https://picsum.photos/id/1/200" alt="Featured 1">
              </div>
              <h3>عنوان الألبوم 1</h3>
              <p>فنان 1</p>
            </div>
            <div class="featured-item">
              <div class="featured-cover">
                <img src="https://picsum.photos/id/2/200" alt="Featured 2">
              </div>
              <h3>عنوان الألبوم 2</h3>
              <p>فنان 2</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer class="player">
        <div class="now-playing">
          <div class="now-playing-info">
            <img src="https://picsum.photos/id/10/200" alt="Currently playing">
            <div>
              <h4>أغنية 1</h4>
              <p>فنان 1</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <style>
      .spotify-preview {
        display: grid;
        grid-template-columns: 220px 1fr;
        grid-template-rows: 1fr 80px;
        grid-template-areas:
          "sidebar main"
          "player player";
        height: 100%;
        color: white;
        font-family: Arial, sans-serif;
      }
      .sidebar {
        grid-area: sidebar;
        background-color: #000;
        padding: 24px 0;
      }
      .logo {
        padding: 0 24px 24px;
      }
      .sidebar nav ul {
        list-style: none;
        padding: 0;
      }
      .sidebar nav ul li {
        padding: 12px 24px;
        cursor: pointer;
      }
      .sidebar nav ul li.active {
        background-color: #282828;
      }
      main {
        grid-area: main;
        background: linear-gradient(to bottom, #434343, #121212);
        padding: 24px;
        overflow-y: auto;
      }
      .featured-items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 24px;
        margin-top: 16px;
      }
      .featured-item {
        background-color: #282828;
        padding: 16px;
        border-radius: 6px;
      }
      .featured-cover img {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        border-radius: 4px;
      }
      .player {
        grid-area: player;
        background-color: #181818;
        border-top: 1px solid #282828;
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
      .now-playing-info img {
        width: 56px;
        height: 56px;
        border-radius: 4px;
      }
    </style>
    `;
  };

  // Add the rest of the generator functions for other site types
  const generateEcommerceFrontend = (lang: string, promptText: string) => {
    // Implementation for e-commerce frontend code generation
    return `// E-commerce frontend code for ${promptText}`;
  };

  const generateEcommerceBackend = (lang: string, promptText: string) => {
    // Implementation for e-commerce backend code generation
    return `// E-commerce backend code for ${promptText}`;
  };

  const generateEcommercePreview = (promptText: string) => {
    // Implementation for e-commerce preview
    return `<div>E-commerce preview for ${promptText}</div>`;
  };

  const generateSocialMediaFrontend = (lang: string, promptText: string) => {
    // Implementation for social media frontend code generation
    return `// Social media frontend code for ${promptText}`;
  };

  const generateSocialMediaBackend = (lang: string, promptText: string) => {
    // Implementation for social media backend code generation
    return `// Social media backend code for ${promptText}`;
  };

  const generateSocialMediaPreview = (promptText: string) => {
    // Implementation for social media preview
    return `<div>Social media preview for ${promptText}</div>`;
  };

  const generateBlogFrontend = (lang: string, promptText: string) => {
    // Implementation for blog frontend code generation
    return `// Blog frontend code for ${promptText}`;
  };

  const generateBlogBackend = (lang: string, promptText: string) => {
    // Implementation for blog backend code generation
    return `// Blog backend code for ${promptText}`;
  };

  const generateBlogPreview = (promptText: string) => {
    // Implementation for blog preview
    return `<div>Blog preview for ${promptText}</div>`;
  };

  const generateGenericFrontend = (lang: string, promptText: string) => {
    // Implementation for generic frontend code generation
    return `// Generic frontend code for ${promptText}`;
  };

  const generateGenericBackend = (lang: string, promptText: string) => {
    // Implementation for generic backend code generation
    return `// Generic backend code for ${promptText}`;
  };

  const generateGenericPreview = (promptText: string) => {
    // Implementation for generic preview
    return `<div>Generic preview for ${promptText}</div>`;
  };

  return (
    <div className="relative space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1 p-6 shadow-lg border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">وصف المشروع</h2>
          </div>
          
          <Textarea
            placeholder="صف المشروع الذي تريد إنشاؤه (مثال: موقع سبوتيفاي للموسيقى العربية، متجر إلكتروني لبيع الملابس، الخ...)"
            className="min-h-24 mb-4 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <LanguageSelector value={language} onChange={setLanguage} />
            
            <Button 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all"
              onClick={generateCode}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="animate-pulse">جاري توليد الكود...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  توليد الكود
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {(frontendCode || backendCode) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CodeDisplay frontendCode={frontendCode} backendCode={backendCode} />
          <PreviewPanel content={previewContent} />
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
