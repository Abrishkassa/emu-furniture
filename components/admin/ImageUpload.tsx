'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Loader2,
  Eye,
  Trash2,
  Download,
  Maximize2
} from 'lucide-react';

interface UploadedImage {
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  originalUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;
  fullUrls: {
    original: string;
    thumbnail: string;
    medium: string;
  };
  dimensions?: {
    width: number;
    height: number;
  };
}

interface ImageUploadProps {
  onImagesUploaded: (images: UploadedImage[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  existingImages?: UploadedImage[];
}

export default function ImageUpload({ 
  onImagesUploaded, 
  maxFiles = 10,
  maxSizeMB = 10,
  existingImages = []
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragging, setDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onImagesUploaded(uploadedImages);
  }, [uploadedImages]);

  const validateFiles = (files: FileList): string | null => {
    if (files.length > maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }

    for (const file of Array.from(files)) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return `Invalid file type: ${file.name}. Allowed: JPG, PNG, GIF, WebP`;
      }

      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        return `File too large: ${file.name}. Maximum size: ${maxSizeMB}MB`;
      }
    }

    return null;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      return;
    }

    await uploadImages(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImages = async (files: FileList) => {
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('http://localhost:5000/api/upload/multiple', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newUploads: UploadedImage[] = data.data;
        setUploadedImages(prev => [...prev, ...newUploads]);
        setSuccess(`${newUploads.length} image(s) uploaded successfully`);
        
        if (data.warnings) {
          setError(`Note: ${data.warnings.message}`);
        }
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/upload/${filename}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImages(prev => prev.filter(img => img.filename !== filename));
        setSuccess('Image deleted successfully');
        
        if (selectedImage?.filename === filename) {
          setSelectedImage(null);
        }
      } else {
        setError(data.error || 'Failed to delete image');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete image');
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${uploadedImages.length} images?`)) return;

    try {
      const filenames = uploadedImages.map(img => img.filename);
      const response = await fetch('http://localhost:5000/api/upload/bulk/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ filenames })
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImages([]);
        setSelectedImage(null);
        setSuccess(`All ${data.data.deletedCount} images deleted successfully`);
      } else {
        setError(data.error || 'Failed to delete images');
      }
    } catch (err) {
      console.error('Bulk delete error:', err);
      setError('Failed to delete images');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const validationError = validateFiles(files);
      if (validationError) {
        setError(validationError);
        return;
      }
      uploadImages(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-3" />
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 ${dragging ? 'border-amber-500 bg-amber-50' : 'border-dashed border-gray-300'} rounded-xl p-8 text-center transition-all duration-200`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          className="hidden"
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
              <p className="text-gray-700 font-medium">Uploading images...</p>
              <p className="text-gray-500 text-sm mt-1">Please wait</p>
            </>
          ) : (
            <>
              <div className={`w-20 h-20 ${dragging ? 'bg-amber-100' : 'bg-gray-100'} rounded-full flex items-center justify-center mb-4`}>
                <Upload className={`w-10 h-10 ${dragging ? 'text-amber-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {dragging ? 'Drop images here' : 'Upload Product Images'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Drag & drop images here or click to browse. Supports JPG, PNG, GIF, WebP
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Select Images
                </button>
                {uploadedImages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete All ({uploadedImages.length})
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Maximum {maxFiles} images • {maxSizeMB}MB per image
              </p>
            </>
          )}
        </div>
      </div>

      {/* Image Grid */}
      {uploadedImages.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              Uploaded Images ({uploadedImages.length})
            </h4>
            <div className="text-sm text-gray-500">
              Click on image to preview
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {uploadedImages.map((img, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage?.filename === img.filename ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(img)}
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100">
                  <img
                    src={img.fullUrls.thumbnail || img.fullUrls.original}
                    alt={img.originalname}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em">Image</text></svg>';
                    }}
                  />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(img);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(img.filename);
                      }}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
                  <p className="text-xs truncate">{img.originalname}</p>
                  <p className="text-xs opacity-75">{formatFileSize(img.size)}</p>
                </div>

                {/* Selected indicator */}
                {selectedImage?.filename === img.filename && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedImage.originalname}</h3>
                <p className="text-sm text-gray-500">
                  {selectedImage.dimensions ? `${selectedImage.dimensions.width}×${selectedImage.dimensions.height}` : ''} • {formatFileSize(selectedImage.size)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedImage.fullUrls.original}
                  download={selectedImage.originalname}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-auto max-h-[70vh]">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Original Image */}
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Original</h4>
                    <img
                      src={selectedImage.fullUrls.original}
                      alt="Original"
                      className="w-full h-auto rounded border"
                    />
                  </div>
                </div>

                {/* Thumbnail & Info */}
                <div className="lg:w-1/3 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Thumbnail</h4>
                    <img
                      src={selectedImage.fullUrls.thumbnail || selectedImage.fullUrls.original}
                      alt="Thumbnail"
                      className="w-full h-auto rounded border"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">Image Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Filename:</span>
                        <span className="font-mono">{selectedImage.filename}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>{selectedImage.mimetype}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span>{formatFileSize(selectedImage.size)}</span>
                      </div>
                      {selectedImage.dimensions && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dimensions:</span>
                          <span>{selectedImage.dimensions.width} × {selectedImage.dimensions.height}</span>
                        </div>
                      )}
                      <div className="pt-2">
                        <button
                          onClick={() => handleDeleteImage(selectedImage.filename)}
                          className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Images List */}
      {uploadedImages.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-700 mb-3">Upload Summary</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploadedImages.map((img, index) => (
              <div key={index}                 className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50"
              >
                <div className="flex items-center min-w-0">
                  <ImageIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {img.originalname}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-3">{formatFileSize(img.size)}</span>
                      <span>•</span>
                      <span className="ml-3">
                        {img.dimensions ? `${img.dimensions.width}×${img.dimensions.height}` : 'Unknown size'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.filename)}
                    className="p-1.5 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="w-2 h-2 rounded-full bg-green-500" title="Uploaded successfully" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                Total: {uploadedImages.length} image(s)
              </span>
              <span className="text-gray-900 font-medium">
                {formatFileSize(uploadedImages.reduce((total, img) => total + img.size, 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}