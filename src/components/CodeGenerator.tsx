
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

    // Simulate API call to generate code
    setTimeout(() => {
      // Sample frontend code based on prompt and language
      const sampleFrontendCode = language === "javascript" || language === "react" 
        ? `// React Component for ${prompt}
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
        <h1>${prompt}</h1>
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

export default App;`
        : `<!-- HTML for ${prompt} -->
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${prompt}</title>
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
    <h1>${prompt}</h1>
  </header>
  <div class="container">
    <div class="content">
      <h2>مرحبًا بكم</h2>
      <p>هذا هو محتوى ${prompt}. يمكنك تخصيص هذا المحتوى حسب احتياجاتك.</p>
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

      // Sample backend code based on prompt and language
      const sampleBackendCode = language === "python" 
        ? `# Python Flask API for ${prompt}
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
    app.run(debug=True)`
        : `// Node.js Express API for ${prompt}
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

      // Create preview content - simplified version of the frontend code
      let preview = "";
      if (language === "html") {
        preview = sampleFrontendCode;
      } else {
        preview = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${prompt}</title>
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
      <h1>${prompt}</h1>
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
      }

      setFrontendCode(sampleFrontendCode);
      setBackendCode(sampleBackendCode);
      setPreviewContent(preview);
      setIsGenerating(false);

      toast({
        title: "تم توليد الكود!",
        description: "تم إنشاء كود الواجهة الأمامية والخلفية بنجاح.",
      });
    }, 3000);
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
              placeholder="مثال: أريد إنشاء موقع ويب لعرض المنتجات مع سلة تسوق وصفحة دفع..."
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
