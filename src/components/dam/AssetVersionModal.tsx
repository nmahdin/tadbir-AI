import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  History, 
  Upload, 
  Check, 
  Layers, 
  FileText,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const AssetVersionModal: React.FC = () => {
  const {
    versionModalAssetId,
    setVersionModalAssetId,
    assets,
    uploadNewVersion,
    triggerCelebration
  } = useApp();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [changelog, setChangelog] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!versionModalAssetId) return null;

  const asset = assets.find(a => a.id === versionModalAssetId);
  if (!asset) return null;

  const nextVersionNumber = (asset.currentVersion || 1) + 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);

    uploadNewVersion(asset.id, {
      fileName: selectedFile.name,
      size: selectedFile.size,
      changelog: changelog.trim() || `به‌روزرسانی به نسخه ${nextVersionNumber}.0`
    });

    triggerCelebration();
    setIsSubmitting(false);
    setVersionModalAssetId(null);
    setSelectedFile(null);
    setChangelog('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">بارگذاری نسخه جدید</h3>
              <p className="text-xs text-slate-600">ارتقا از نسخه v{asset.currentVersion} به نسخه v{nextVersionNumber}</p>
            </div>
          </div>

          <button
            onClick={() => setVersionModalAssetId(null)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Target Asset Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-600 block">فایل هدف:</span>
              <span className="font-bold text-slate-900">{asset.title}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-bold">
              فعلی: v{asset.currentVersion}.0
            </span>
          </div>

          {/* File Picker */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              {selectedFile ? selectedFile.name : 'انتخاب فایل نسخه جدید'}
            </p>
            <p className="text-[11px] text-slate-600">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} مگابایت` : 'فرمت‌های مشابه با فایل اصلی'}
            </p>
          </div>

          {/* Changelog Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">تغییرات و یادداشت نسخه (Changelog):</label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              rows={3}
              required
              placeholder="چه مواردی در این نسخه اصلاح یا به‌روزرسانی شده است؟ (مثال: اعمال نظرات مدیر طراحی در رنگ‌بندی)..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-amber-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setVersionModalAssetId(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isSubmitting}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>ثبت و انتشار نسخه {nextVersionNumber}.0</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
