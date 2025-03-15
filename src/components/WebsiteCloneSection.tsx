
import { useState } from "react";
import { Globe, Copy, Search, Palette, Type, LayoutGrid, FileCode, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { WebsiteScraperService } from "@/services/WebsiteScraperService";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WebsiteCloneSection = ({ onGenerateCode }: { onGenerateCode: (prompt: string) => void }) => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<any>(null);

  const handleSearch = async () => {
    if (!url) {
      toast({
        title: "أدخل عنوان URL",
        description: "يرجى إدخال عنوان URL للموقع الذي تريد تقليده",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await WebsiteScraperService.scrapeWebsite(url);
      
      if (data) {
        setScrapedData(data);
        toast({
          title: "تم استكشاف الموقع بنجاح",
          description: "يمكنك الآن توليد كود مشابه للموقع",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في استكشاف الموقع. تأكد من صحة الرابط وحاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFromTemplate = () => {
    if (!scrapedData) return;
    
    const prompt = `
      قم بإنشاء موقع مشابه لـ ${url} مع العناصر التالية:
      - تصميم: ${scrapedData.layout}
      - ألوان رئيسية: ${scrapedData.colors.join(', ')}
      - خطوط: ${scrapedData.fonts.join(', ')}
      - يحتوي على: ${scrapedData.elements.map(e => e.type).join(', ')}
    `;
    
    onGenerateCode(prompt);
    
    toast({
      title: "تم إنشاء الكود",
      description: "تم توليد كود مشابه للموقع المستكشف",
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-black border-gray-700 shadow-xl mt-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20 pointer-events-none" />
      
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
            <Globe className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">تقليد المواقع</h2>
            <p className="text-gray-400 text-sm mt-1">
              استكشف أي موقع وقم بتوليد كود مشابه له بنقرة واحدة
            </p>
          </div>
        </div>
      </CardHeader>
      
      <div className="relative z-10 flex gap-2 mb-6">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="bg-gray-800/70 border-gray-700 text-white rounded-lg"
          dir="ltr"
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 min-w-20"
        >
          {isLoading ? "جاري البحث..." : <><Search className="w-4 h-4 mr-2" /> بحث</>}
        </Button>
      </div>
      
      {scrapedData && (
        <CardContent className="p-0">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 p-3 bg-gray-800/80 border-b border-gray-700/50">
              <ExternalLink className="h-4 w-4 text-blue-400" />
              <h3 className="text-white font-medium">نتائج استكشاف {scrapedData.title}</h3>
            </div>
            
            <div className="p-4">
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <LayoutGrid className="h-4 w-4 text-purple-400" />
                      <h4 className="text-gray-300 font-medium">التخطيط</h4>
                    </div>
                    <Badge variant="outline" className="bg-gray-700/50 text-white border-gray-600 text-sm">
                      {scrapedData.layout}
                    </Badge>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Type className="h-4 w-4 text-blue-400" />
                      <h4 className="text-gray-300 font-medium">الخطوط المستخدمة</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scrapedData.fonts.map((font: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-gray-700/50 text-white border-gray-600">
                          {font}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-4 w-4 text-orange-400" />
                      <h4 className="text-gray-300 font-medium">الألوان المستخدمة</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scrapedData.colors.map((color: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-800/70 rounded px-2 py-1">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: color }} 
                          />
                          <span className="text-white text-sm">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileCode className="h-4 w-4 text-green-400" />
                      <h4 className="text-gray-300 font-medium">العناصر الرئيسية</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {scrapedData.elements.map((element: any, index: number) => (
                        <Badge key={index} variant="secondary" className="justify-start bg-gray-700/50 text-white">
                          {element.type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleGenerateFromTemplate} 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-medium text-white py-2"
              >
                <Copy className="w-4 h-4 mr-2" /> توليد كود مشابه
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default WebsiteCloneSection;
