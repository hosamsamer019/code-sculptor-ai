
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  value: string; 
  onChange: (value: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between items-center">
          <span>{getLanguageLabel(value)}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem value="javascript">
            JavaScript
            {value === "javascript" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="react">
            React
            {value === "react" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="html">
            HTML
            {value === "html" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="python">
            Python
            {value === "python" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="node">
            Node.js
            {value === "node" && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function getLanguageLabel(value: string): string {
  switch (value) {
    case "javascript":
      return "JavaScript";
    case "react":
      return "React";
    case "html":
      return "HTML";
    case "python":
      return "Python";
    case "node":
      return "Node.js";
    default:
      return "اختر لغة البرمجة";
  }
}

export default LanguageSelector;
