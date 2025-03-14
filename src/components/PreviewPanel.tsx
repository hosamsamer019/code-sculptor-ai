
import { Monitor } from "lucide-react";

type PreviewPanelProps = {
  previewContent: string;
};

const PreviewPanel = ({ previewContent }: PreviewPanelProps) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden border border-gray-300">
      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
        <Monitor className="h-5 w-5 text-purple-400" />
        <h3 className="text-white font-medium">معاينة التطبيق</h3>
      </div>
      <div className="h-[400px] overflow-hidden relative">
        {previewContent ? (
          <iframe
            srcDoc={previewContent}
            title="معاينة التطبيق"
            className="w-full h-full bg-white"
            sandbox="allow-scripts"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            سيظهر هنا معاينة التطبيق بعد توليد الكود...
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
