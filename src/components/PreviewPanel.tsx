
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
      <div className="h-[500px] overflow-hidden relative">
        {previewContent ? (
          <iframe
            srcDoc={previewContent}
            title="معاينة التطبيق"
            className="w-full h-full bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            <p className="text-center px-4">
              سيظهر هنا معاينة حية للتطبيق الذي تم توليده.<br/>
              وصف ما تريد برمجته في مربع الإدخال أعلاه.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
