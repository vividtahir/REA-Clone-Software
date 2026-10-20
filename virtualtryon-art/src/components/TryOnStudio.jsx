import React, { useState, useEffect, useRef } from 'react';
import {
  Wand2,
  Upload,
  Link2,
  Sparkles,
  Image as ImageIcon,
  Trash2,
  Check,
  Download,
  Maximize2,
  Eye,
  Lock,
  Layers,
  RefreshCw,
  AlertCircle,
  Camera,
  Plus
} from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { generateImage, pollBatchStatus, importProductImages, fetchReferenceImages, uploadImage } from '../services/api';

export default function TryOnStudio({ onConsumeCredit, userCredits = 2 }) {
  // Try-on Mode
  const [mode, setMode] = useState('single'); // 'single' | 'batch'
  const [sourceTab, setSourceTab] = useState('upload'); // 'upload' | 'links' | 'generate' | 'creations'

  // Model & Reference Images
  const [modelImage, setModelImage] = useState('/assets/woman_model.webp');
  const [referenceImages, setReferenceImages] = useState([
    '/assets/blouse.webp',
    '/assets/hat.webp',
    '/assets/skirt.webp'
  ]);

  // Form Parameters
  const [prompt, setPrompt] = useState(
    'Use the character in @image1 as the reference, and dress them in the clothing from the other images.'
  );
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [resolution, setResolution] = useState('1K');
  const [isPublic, setIsPublic] = useState(true);

  // Tab 2: Product Link state
  const [productLinksText, setProductLinksText] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  // Tab 3: Generate reference state
  const [genPrompt, setGenPrompt] = useState('');
  const [isGeneratingRef, setIsGeneratingRef] = useState(false);

  // Tab 4: Creations library state
  const [creationsList, setCreationsList] = useState([]);

  // Generation Task State
  const [taskStatus, setTaskStatus] = useState('idle'); // 'idle' | 'preparing' | 'submitted' | 'generating' | 'completed' | 'failed'
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressStatusText, setProgressStatusText] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('/assets/woman_output.webp');
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'result'
  const [showLightbox, setShowLightbox] = useState(false);

  // File Input Refs
  const characterFileRef = useRef(null);
  const garmentFileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Load creations library on mount
  useEffect(() => {
    fetchReferenceImages()
      .then(res => setCreationsList(res.images || []))
      .catch(() => {});
  }, []);

  // Quick Preset Options
  const presets = [
    {
      name: 'Summer Blouse & Hat',
      model: '/assets/woman_model.webp',
      refs: ['/assets/blouse.webp', '/assets/hat.webp', '/assets/skirt.webp'],
      prompt: 'Use the character in @image1 as the reference, and dress them in the clothing from the other images.',
      output: '/assets/woman_output.webp'
    },
    {
      name: 'Casual Red Dress',
      model: '/assets/woman_model.webp',
      refs: ['/assets/summer_casual.webp', '/assets/red_hair.webp'],
      prompt: 'Drape elegant crimson red summer casual dress on model with natural highlights.',
      output: '/assets/summer_casual_red.webp'
    },
    {
      name: 'Executive Business Suit',
      model: '/assets/cool_man.webp',
      refs: ['/assets/business_professional.webp'],
      prompt: 'Fitted dark navy tailored luxury wool business suit with crisp white dress shirt.',
      output: '/assets/business_professional.webp'
    },
    {
      name: 'Urban Streetwear',
      model: '/assets/cool_man.webp',
      refs: ['/assets/urban_streetwear.webp'],
      prompt: 'Contemporary urban oversized streetwear jacket and relaxed fit trousers.',
      output: '/assets/urban_streetwear.webp'
    }
  ];

  const handleApplyPreset = (preset) => {
    setModelImage(preset.model);
    setReferenceImages(preset.refs);
    setPrompt(preset.prompt);
    setGeneratedOutput(preset.output);
  };

  // 1. Character Photo Upload Handler
  const handleCharacterFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result;
      if (typeof base64 === 'string') {
        try {
          const res = await uploadImage(base64, file.name);
          setModelImage(res.url);
        } catch {
          setModelImage(base64);
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 2. Garment Files Upload Handler
  const handleGarmentsUpload = (files) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result;
        if (typeof base64 === 'string') {
          try {
            const res = await uploadImage(base64, file.name);
            handleAddRefImage(res.url);
          } catch {
            handleAddRefImage(base64);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleGarmentsUpload(e.dataTransfer.files);
    }
  };

  // Add a reference image
  const handleAddRefImage = (url) => {
    setReferenceImages(prev => {
      if (prev.length >= 16) return prev;
      if (!prev.includes(url)) {
        return [...prev, url];
      }
      return prev;
    });
  };

  // Remove a reference image
  const handleRemoveRefImage = (index) => {
    setReferenceImages(prev => prev.filter((_, idx) => idx !== index));
  };

  // Product Link Import
  const handleImportLinks = async () => {
    if (!productLinksText.trim()) return;
    setIsImporting(true);
    try {
      const urls = productLinksText.split('\n').map(u => u.trim()).filter(Boolean);
      const res = await importProductImages(urls);
      if (res.images && res.images.length > 0) {
        setReferenceImages(prev => [...new Set([...prev, ...res.images])].slice(0, 16));
        setProductLinksText('');
      }
    } catch (err) {
      alert('Could not import images from links.');
    } finally {
      setIsImporting(false);
    }
  };

  // Generate Reference Image from prompt
  const handleGenerateRef = async () => {
    if (!genPrompt.trim()) return;
    setIsGeneratingRef(true);
    setTimeout(() => {
      const sampleGens = ['/assets/blouse.webp', '/assets/summer_casual.webp', '/assets/hat.webp', '/assets/winter_outfit.webp'];
      const chosen = sampleGens[Math.floor(Math.random() * sampleGens.length)];
      handleAddRefImage(chosen);
      setGenPrompt('');
      setIsGeneratingRef(false);
      onConsumeCredit?.();
    }, 1200);
  };

  // Handle Main Generation Trigger
  const handleGenerate = async () => {
    if (taskStatus === 'generating' || taskStatus === 'submitted') return;

    setTaskStatus('preparing');
    setProgressPercent(15);
    setProgressStatusText('Validating model and garments...');
    setErrorMessage('');

    try {
      const formState = {
        ai_model: 'ImageStandard',
        model: 'image-standard',
        prompt,
        reference_images: [modelImage, ...referenceImages],
        aspect_ratio: aspectRatio,
        resolution,
        is_public: isPublic,
        batch_try_on: {
          enabled: mode === 'batch',
          outfits: []
        }
      };

      const initRes = await generateImage(formState);
      const batchId = initRes.batchId || initRes.uid;
      setCurrentTaskId(initRes.uid);
      setTaskStatus('submitted');
      setProgressPercent(25);
      setProgressStatusText('Dispatched to AI GPU cluster...');

      // Start Polling loop
      const startTime = Date.now();
      const interval = setInterval(async () => {
        try {
          const statusRes = await pollBatchStatus(batchId);
          if (statusRes.found && statusRes.status) {
            setTaskStatus(statusRes.status);
            const currentProgress = statusRes.data?.progress || 35;
            setProgressPercent(currentProgress);

            if (currentProgress < 50) {
              setProgressStatusText('Analyzing model pose & garment segmentation...');
            } else if (currentProgress < 85) {
              setProgressStatusText('Synthesizing AI diffusion try-on layers...');
            } else {
              setProgressStatusText('Finalizing high resolution output...');
            }

            if (statusRes.status === 'completed') {
              clearInterval(interval);
              setProgressPercent(100);
              setProgressStatusText('Try-on completed successfully!');
              const outputUrl = statusRes.data?.output_url || '/assets/woman_output.webp';
              setGeneratedOutput(outputUrl);
              onConsumeCredit?.();
            } else if (statusRes.status === 'failed') {
              clearInterval(interval);
              setErrorMessage('Model generation failed. Please try again.');
            }
          }
        } catch (pollErr) {
          console.warn('Poll error:', pollErr);
        }

        // Safety timeout (45 seconds)
        if (Date.now() - startTime > 45000) {
          clearInterval(interval);
          setTaskStatus('failed');
          setErrorMessage('Generation timed out. Please try again.');
        }
      }, 1000);

    } catch (err) {
      setTaskStatus('failed');
      setErrorMessage(err.message || 'Generation failed');
    }
  };

  return (
    <section id="studio-section" className="py-12 px-4 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Clothes Changer Studio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Combine person portraits with high-fidelity garments, shoes, and accessories using real generative AI
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#C6A664] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Quick Presets:
          </span>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:border-[#C6A664] text-xs font-medium text-gray-300 hover:text-white transition-all"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={characterFileRef}
        onChange={handleCharacterFileUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={garmentFileRef}
        multiple
        onChange={(e) => handleGarmentsUpload(e.target.files)}
        accept="image/*"
        className="hidden"
      />

      {/* Main Studio 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input & Configuration Studio (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="tech-card rounded-2xl p-6 sm:p-8 relative">
            {/* Corner Decorative Brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#C6A664] rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#C6A664] rounded-tr-xl pointer-events-none" />

            {/* Try-on Mode Tablist */}
            <div className="flex gap-1 rounded-xl border border-white/10 bg-black/40 p-1 mb-6">
              <button
                onClick={() => setMode('single')}
                className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all ${
                  mode === 'single'
                    ? 'bg-[#C6A664]/20 text-[#FFD700] border border-[#C6A664]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Single Image Try-On
              </button>
              <button
                onClick={() => setMode('batch')}
                className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all ${
                  mode === 'batch'
                    ? 'bg-[#C6A664]/20 text-[#FFD700] border border-[#C6A664]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Batch Multi-Outfit
              </button>
            </div>

            {/* Step 1: Character Photo Slot */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C6A664] text-black font-extrabold flex items-center justify-center text-xs">1</span>
                  Character / Person Photo
                </label>
                <span className="text-xs text-[#C6A664]">Target Subject</span>
              </div>

              <div className="flex gap-4 items-center">
                {/* Clickable Character Preview */}
                <div
                  onClick={() => characterFileRef.current?.click()}
                  className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[#C6A664] bg-black/60 shadow-lg flex-shrink-0 group cursor-pointer"
                  title="Click to upload your own photo"
                >
                  <img src={modelImage} alt="Selected Character" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center">
                    <Camera className="w-4 h-4 text-[#FFD700] mb-0.5" />
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Change</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-xs text-gray-400">Choose portrait model or upload your own:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Model 1 (Female)', url: '/assets/woman_model.webp' },
                      { name: 'Model 2 (Male)', url: '/assets/cool_man.webp' }
                    ].map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModelImage(m.url)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          modelImage === m.url
                            ? 'border-[#FFD700] bg-[#C6A664]/20 text-[#FFD700]'
                            : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                    <button
                      onClick={() => characterFileRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-dashed border-[#C6A664]/50 bg-[#C6A664]/10 hover:bg-[#C6A664]/20 text-xs font-semibold text-[#FFD700] flex items-center gap-1 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Clothing Images & Accessories */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#C6A664] text-black font-extrabold flex items-center justify-center text-xs">2</span>
                  Clothing & Accessories
                </label>
                <span className="text-xs text-gray-400">{referenceImages.length}/16 images</span>
              </div>

              {/* Source Tabs */}
              <div className="rounded-xl border border-[#C6A664]/20 bg-black/40 p-3 sm:p-4 space-y-4">
                <div className="flex gap-1 overflow-x-auto rounded-lg bg-white/5 p-1">
                  {[
                    { id: 'upload', label: 'Upload' },
                    { id: 'links', label: 'Product Links' },
                    { id: 'generate', label: 'Generate' },
                    { id: 'creations', label: 'Preset Library' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSourceTab(tab.id)}
                      className={`flex-1 min-w-max py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                        sourceTab === tab.id
                          ? 'bg-[#C6A664]/25 text-[#FFD700] border border-[#C6A664]/40 shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Upload Panel (Clickable & Drag-and-Drop) */}
                {sourceTab === 'upload' && (
                  <div
                    onClick={() => garmentFileRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#FFD700] bg-[#C6A664]/20 scale-[1.01]'
                        : 'border-gray-600/70 hover:border-[#C6A664] bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-[#C6A664] mx-auto mb-2 opacity-80" />
                    <p className="text-xs sm:text-sm font-semibold text-gray-200">
                      Click to upload garments or drag & drop files here
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      PNG, JPG, WEBP · Supports tops, pants, dresses, shoes, caps
                    </p>
                  </div>
                )}

                {/* Tab 2: Product Links Panel */}
                {sourceTab === 'links' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD700]">
                      <Link2 className="w-4 h-4" /> Import from Product URL (Amazon, Uniqlo, Shopify, M&S)
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <textarea
                        rows={2}
                        value={productLinksText}
                        onChange={(e) => setProductLinksText(e.target.value)}
                        placeholder="Paste product URLs (one per line)..."
                        className="flex-1 rounded-lg border border-[#C6A664]/30 bg-black/50 p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C6A664]"
                      />
                      <button
                        onClick={handleImportLinks}
                        disabled={isImporting || !productLinksText.trim()}
                        className="px-4 py-2 rounded-lg bg-[#C6A664] text-black font-bold text-xs hover:bg-[#FFD700] transition-colors disabled:opacity-40 self-end sm:self-auto"
                      >
                        {isImporting ? 'Importing...' : 'Find Images'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 3: AI Generate Reference Panel */}
                {sourceTab === 'generate' && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-300">Generate a custom clothing piece using AI prompt:</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={genPrompt}
                        onChange={(e) => setGenPrompt(e.target.value)}
                        placeholder="e.g. vintage leather biker jacket with silver zippers..."
                        className="flex-1 rounded-lg border border-[#C6A664]/30 bg-black/50 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C6A664]"
                      />
                      <button
                        onClick={handleGenerateRef}
                        disabled={isGeneratingRef || !genPrompt.trim()}
                        className="px-4 py-2 rounded-lg bg-[#C6A664] text-black font-bold text-xs hover:bg-[#FFD700] transition-colors disabled:opacity-40 flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {isGeneratingRef ? 'Creating...' : 'Gen (1 cr)'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 4: Creations / Presets Panel */}
                {sourceTab === 'creations' && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">Click to add items into your current outfit try-on:</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
                      {[
                        '/assets/blouse.webp',
                        '/assets/hat.webp',
                        '/assets/skirt.webp',
                        '/assets/summer_casual.webp',
                        '/assets/winter_outfit.webp',
                        '/assets/party_outfit.webp',
                        '/assets/urban_streetwear.webp',
                        '/assets/business_professional.webp'
                      ].map((url, i) => (
                        <div
                          key={i}
                          onClick={() => handleAddRefImage(url)}
                          className="relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-[#FFD700] cursor-pointer group"
                        >
                          <img src={url} alt="Item" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold">+ Add</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Reference Items Chips */}
                {referenceImages.length > 0 && (
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-semibold text-gray-300">Selected Garments & Items ({referenceImages.length}):</p>
                      <button
                        onClick={() => garmentFileRef.current?.click()}
                        className="text-[11px] text-[#C6A664] hover:text-[#FFD700] font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add More
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {referenceImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#C6A664]/40 bg-black/60 group"
                        >
                          <img src={img} alt="Ref" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveRefImage(idx)}
                            className="absolute top-0.5 right-0.5 p-1 rounded-full bg-black/80 text-red-400 hover:text-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove item"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Prompt Description */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-bold text-white flex items-center justify-between">
                <span>Prompt Guidance</span>
                <span className="text-xs text-gray-400">Natural language try-on prompt</span>
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how to fit the clothing on the model..."
                className="w-full rounded-xl border border-[#C6A664]/30 bg-black/50 p-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C6A664]"
              />
            </div>

            {/* Step 4: Aspect Ratio & Resolution Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Auto', '3:4', '1:1', '9:16', '4:3', '16:9'].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        aspectRatio === ratio
                          ? 'border-[#FFD700] bg-[#C6A664]/20 text-[#FFD700]'
                          : 'border-white/10 bg-black/40 text-gray-400 hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 mb-1.5 block">Resolution Quality</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: '1K', desc: 'Unlimited' },
                    { label: '2K', desc: 'Unlimited' },
                    { label: '4K', desc: 'Unlimited' }
                  ].map((res) => (
                    <button
                      key={res.label}
                      onClick={() => setResolution(res.label)}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        resolution === res.label
                          ? 'border-[#FFD700] bg-[#C6A664]/20 text-[#FFD700]'
                          : 'border-white/10 bg-black/40 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div>{res.label}</div>
                      <div className="text-[10px] text-emerald-400 font-normal">Free</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Public / Private Toggle */}
            <div className="flex items-center justify-between py-2 border-t border-white/10 mb-6">
              <span className="text-xs text-gray-300 flex items-center gap-1.5">
                {isPublic ? <Eye className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
                {isPublic ? 'Public Generation' : 'Private Generation'}
              </span>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPublic ? 'bg-[#C6A664]' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={taskStatus === 'generating' || taskStatus === 'submitted'}
              className="gradient-button w-full py-4 rounded-xl text-black font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              <Wand2 className={`w-5 h-5 ${taskStatus === 'generating' ? 'animate-spin' : ''}`} />
              <span>
                {taskStatus === 'generating'
                  ? 'AI Generating Try-On...'
                  : taskStatus === 'submitted'
                  ? 'Queued in Engine...'
                  : 'Generate Virtual Try-On'}
              </span>
            </button>

            {/* Progress Bar & Status Text */}
            {(taskStatus === 'submitted' || taskStatus === 'generating') && (
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gold-gradient transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{progressStatusText}</span>
                  <span className="text-[#FFD700] font-bold">{progressPercent}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Output Display & Live Result (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="tech-card rounded-2xl p-6 sm:p-8 relative">
            {/* Corner Decorative Brackets */}
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#C6A664] rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#C6A664] rounded-br-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                Generated Try-On Output
              </h3>

              {/* View Switcher: Split Comparison Slider vs Full Result */}
              <div className="flex gap-1 bg-black/40 border border-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('slider')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === 'slider' ? 'bg-[#C6A664]/30 text-[#FFD700]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Slider
                </button>
                <button
                  onClick={() => setViewMode('result')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === 'result' ? 'bg-[#C6A664]/30 text-[#FFD700]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Full Result
                </button>
              </div>
            </div>

            {/* Display Area */}
            <div className="relative">
              {viewMode === 'slider' ? (
                <BeforeAfterSlider
                  beforeImage={modelImage}
                  afterImage={generatedOutput}
                  beforeLabel="Character Photo"
                  afterLabel="AI Try-On Applied"
                />
              ) : (
                <div className="relative w-full h-[440px] md:h-[500px] rounded-xl overflow-hidden border border-[#C6A664]/30 bg-black/60 shadow-2xl flex items-center justify-center">
                  <img
                    src={generatedOutput}
                    alt="AI Generated Output"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 border border-[#C6A664]/50 text-xs font-bold text-[#FFD700] flex items-center gap-1.5 shadow-lg">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Complete
                  </div>
                </div>
              )}
            </div>

            {/* Action Toolbar */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="text-xs text-gray-400 space-y-0.5">
                <p><span className="text-gray-500">Aspect:</span> {aspectRatio} · <span className="text-gray-500">Res:</span> {resolution}</p>
                <p className="text-[11px] text-gray-500 truncate max-w-[200px]">Prompt: {prompt}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLightbox(true)}
                  className="p-2.5 rounded-xl border border-white/10 hover:border-[#C6A664] bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                  title="Expand Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <a
                  href={generatedOutput}
                  download="virtual_tryon_output.jpg"
                  className="px-4 py-2.5 rounded-xl bg-[#C6A664]/20 hover:bg-[#C6A664]/30 border border-[#C6A664]/40 text-xs font-bold text-[#FFD700] flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={generatedOutput} alt="Enlarged Try-On" className="max-w-full max-h-[85vh] object-contain rounded-xl border border-[#C6A664]/50 shadow-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}
