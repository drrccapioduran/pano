import { useState, useEffect } from 'react';
import { Loader2, ZoomIn, X } from 'lucide-react';

interface ImageGalleryProps {
  folderId: string;
  title: string;
}

export default function ImageGallery({ folderId, title }: ImageGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const placeholderImages = [
          'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
          'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg',
          'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg',
          'https://images.pexels.com/photos/2662875/pexels-photo-2662875.jpeg',
          'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
          'https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg',
          'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
          'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg',
        ];

        await new Promise(resolve => setTimeout(resolve, 800));
        setImages(placeholderImages);
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folderId]);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">{title}</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"></div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
            <p className="text-[#1a1a2e]/70 font-medium">Loading images...</p>
          </div>
        </div>
      ) : (
        <>
          {images.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-[#1a1a2e]/70 font-medium text-lg">No images found in this folder</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => openImageModal(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">
                        Image {index + 1}
                      </span>
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeImageModal}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md"
            onClick={closeImageModal}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
