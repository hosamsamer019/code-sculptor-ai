
import { Code } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full p-4 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <h1 className="text-xl font-bold">Code Sculptor AI</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-purple-300 transition-colors">الرئيسية</a>
          <a href="#" className="hover:text-purple-300 transition-colors">المميزات</a>
          <a href="#" className="hover:text-purple-300 transition-colors">التوثيق</a>
          <a href="#" className="hover:text-purple-300 transition-colors">حول</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
