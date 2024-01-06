import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

export default function Images({ images, isViewerOpen, setIsViewerOpen }) {
  const [currentImage, setCurrentImage] = useState(0);
  const hostURL = "http://localhost:4000/spot-images/";
  const imagesURL = images.map((image) => {
    return hostURL + image;
  });

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div className="Images mb-8">
      <h2 className="text-xl font-semibold mb-2">Owner Images</h2>
      <div className="h-[2px] bg-gray mb-4"></div>
      {imagesURL.length > 0 && (
        <div className="flex gap-4">
          {imagesURL.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer(index)}
              className="max-w-[152px] max-h-[128px]"
              key={index}
              style={{ margin: "2px" }}
              alt=""
            />
          ))}

          {isViewerOpen && (
            <ImageViewer
              src={imagesURL}
              currentIndex={currentImage}
              disableScroll={true}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
              backgroundStyle={{zIndex: 100}}
            />
          )}
          {imagesURL.length <=0  && <div>No images to display.</div>}
        </div>
      )}
    </div>
  );
}
