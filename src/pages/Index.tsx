
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeGenerator from "@/components/CodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Code Sculptor AI
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              أداة ذكاء اصطناعي متطورة لتوليد الأكواد البرمجية من وصف بسيط
            </p>
            <p className="text-gray-400">
              فقط اكتب ما تريد بناءه، واختر لغة البرمجة، ودع الذكاء الاصطناعي يقوم بالباقي!
            </p>
          </div>
          
          <CodeGenerator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
