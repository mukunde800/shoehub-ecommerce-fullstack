import { useState } from 'react';

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  if (!images.length) images = ['/placeholder.jpg'];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        <img src={images[active]} alt={name} className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                active === i ? 'border-accent' : 'border-transparent'
              }`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}