
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
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
    { id: "javascript", name: "JavaScript", frontend: true, backend: true },
    { id: "typescript", name: "TypeScript", frontend: true, backend: true },
    { id: "python", name: "Python", backend: true },
    { id: "java", name: "Java", backend: true },
    { id: "csharp", name: "C#", backend: true },
    { id: "php", name: "PHP", backend: true },
    { id: "ruby", name: "Ruby", backend: true },
    { id: "html", name: "HTML/CSS", frontend: true },
    { id: "react", name: "React", frontend: true },
    { id: "vue", name: "Vue.js", frontend: true },
    { id: "angular", name: "Angular", frontend: true },
  ];

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-sm font-medium text-gray-200 mb-2 text-right">
        اختر لغة البرمجة
      </label>
      <Select value={selectedLanguage} onValueChange={onSelectLanguage}>
        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
          <SelectValue placeholder="اختر لغة البرمجة" />
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
