
import { useState } from "react";
import { Globe, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card className="p-6 bg-gray-900 border-gray-700 shadow-xl mt-8">
      <div className="flex items-center gap-2 text-purple-400 mb-4">
        <Globe className="h-6 w-6" />
        <h2 className="text-2xl font-semibold text-white">تقليد المواقع</h2>
      </div>
      
      <p className="text-gray-300 mb-4">
        أدخل عنوان URL لموقع تريد تقليده وسيقوم النظام باستكشافه وتوليد كود مشابه له
      </p>
      
      <div className="flex gap-2 mb-6">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="bg-gray-800 border-gray-700 text-white"
          dir="ltr"
        />
        <Button 
          onClick={handleSearch} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-4"
        >
          {isLoading ? "جاري البحث..." : <><Search className="w-4 h-4 mr-2" /> بحث</>}
        </Button>
      </div>
      
      {scrapedData && (
        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">نتائج استكشاف الموقع</h3>
          
          <Separator className="my-3 bg-gray-700" />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-sm">العنوان</p>
              <p className="text-white">{scrapedData.title}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">التخطيط</p>
              <p className="text-white">{scrapedData.layout}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">الألوان المستخدمة</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {scrapedData.colors.map((color: string, index: number) => (
                <div key={index} className="flex items-center gap-1">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: color }} 
                  />
                  <span className="text-white text-sm">{color}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">الخطوط المستخدمة</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {scrapedData.fonts.map((font: string, index: number) => (
                <Badge key={index} variant="outline" className="text-white border-gray-600">
                  {font}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">العناصر الرئيسية</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {scrapedData.elements.map((element: any, index: number) => (
                <Badge key={index} variant="secondary" className="justify-start">
                  {element.type}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateFromTemplate} 
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Copy className="w-4 h-4 mr-2" /> توليد كود مشابه
          </Button>
        </div>
      )}
    </Card>
  );
};

export default WebsiteCloneSection;
