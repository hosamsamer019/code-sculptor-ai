
import { useState } from "react";
import { Copy, Check, Code as CodeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

type CodeDisplayProps = {
  frontendCode: string;
  backendCode: string;
};

const CodeDisplay = ({ frontendCode, backendCode }: CodeDisplayProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
    toast({
      title: "تم النسخ!",
      description: `تم نسخ كود ${type === "frontend" ? "الواجهة الأمامية" : "الخلفية"} إلى الحافظة.`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full bg-code-background rounded-lg overflow-hidden border border-gray-700">
      <Tabs defaultValue="frontend" className="w-full">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-purple-400" />
            <h3 className="text-white font-medium">الكود المولد</h3>
          </div>
          <TabsList className="bg-gray-700">
            <TabsTrigger value="frontend" className="data-[state=active]:bg-purple-600">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-purple-600">
              Backend
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="frontend">
          <div className="relative">
            <button
              onClick={() => copyToClipboard(frontendCode, "frontend")}
              className="absolute right-2 top-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              aria-label="نسخ الكود"
            >
              {copied === "frontend" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <pre className="bg-code-background text-code-text p-4 overflow-x-auto min-h-[300px] max-h-[500px]">
              <code>{frontendCode || "// سيظهر هنا كود الواجهة الأمامية..."}</code>
            </pre>
          </div>
        </TabsContent>

        <TabsContent value="backend">
          <div className="relative">
            <button
              onClick={() => copyToClipboard(backendCode, "backend")}
              className="absolute right-2 top-2 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              aria-label="نسخ الكود"
            >
              {copied === "backend" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <pre className="bg-code-background text-code-text p-4 overflow-x-auto min-h-[300px] max-h-[500px]">
              <code>{backendCode || "// سيظهر هنا كود الخلفية..."}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeDisplay;
