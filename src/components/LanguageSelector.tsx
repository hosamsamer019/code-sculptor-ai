
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CodeLanguage = {
  id: string;
  name: string;
  frontend?: boolean;
  backend?: boolean;
};

type LanguageSelectorProps = {
  selectedLanguage: string;
  onSelectLanguage: (language: string) => void;
};

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) => {
  const languages: CodeLanguage[] = [
    { id: "react", name: "React", frontend: true },
    { id: "angular", name: "Angular", frontend: true },
    { id: "vue", name: "Vue.js", frontend: true },
    { id: "html", name: "HTML/CSS", frontend: true },
    { id: "nodejs", name: "Node.js", backend: true },
    { id: "python", name: "Python", backend: true },
    { id: "php", name: "PHP", backend: true },
    { id: "fullstack", name: "Full Stack (React + Node.js)", frontend: true, backend: true },
    { id: "wordpress", name: "WordPress", frontend: true, backend: true },
    { id: "shopify", name: "Shopify", frontend: true },
  ];

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-sm font-medium text-gray-200 mb-2 text-right">
        اختر التقنية المطلوبة
      </label>
      <Select value={selectedLanguage} onValueChange={onSelectLanguage}>
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
          <SelectValue placeholder="اختر التقنية المطلوبة" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          {languages.map((language) => (
            <SelectItem key={language.id} value={language.id}>
              {language.name}
              {language.frontend && language.backend 
                ? " (Frontend/Backend)" 
                : language.frontend 
                ? " (Frontend)" 
                : " (Backend)"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
