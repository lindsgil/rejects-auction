'use client';

import { useState } from 'react';
import ResizableWindow from './components/ResizableWindow';
import DraggableIcon from './components/DraggableIcon';
import Image from 'next/image';
import VideoPlayer from './components/VideoPlayer';

interface FileInfo {
  artist: string;
  medium: string;
}

interface FileIcon {
  id: string;
  name: string;
  icon: string;
  modelType: string;
  modelInfo: FileInfo;
}

export default function Home() {
  const [showTrash, setShowTrash] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showLivestream, setShowLivestream] = useState(false);
  const [showModelViewer, setShowModelViewer] = useState(false);
  const [selectedModelInfo, setSelectedModelInfo] = useState<FileInfo>({artist: 'example', medium: 'example'});
  const [selectedModelTitle, setSelectedModelTitle] = useState('');
  const [infoImage, setInfoImage] = useState('');

  const handleInfoOpen = () => {
    const images = ['/rejects3_poster.jpeg', '/Reject_poster.png'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setInfoImage(randomImage);
    setShowInfo(true);
  };

  const trashFiles: FileIcon[] = [
    { id: '1', name: '001', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '2', name: '002', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '3', name: '003', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '4', name: '004', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '5', name: '005', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '6', name: '006', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '7', name: '007', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '8', name: '008', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '9', name: '009', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '10', name: '010', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '11', name: '011', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '12', name: '012', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '13', name: '013', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '14', name: '014', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '15', name: '015', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '16', name: '016', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '17', name: '017', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '18', name: '018', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '19', name: '019', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '20', name: '020', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '21', name: '021', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '22', name: '022', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '23', name: '023', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '24', name: '024', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '25', name: '025', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '26', name: '026', icon: '/trash_bag_icon.png', modelType: '2', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '27', name: '027', icon: '/trash_bag_icon.png', modelType: '3', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '28', name: '028', icon: '/trash_bag_icon.png', modelType: '4', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '29', name: '029', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
    { id: '30', name: '030', icon: '/trash_bag_icon.png', modelType: '1', modelInfo: {'artist': 'example', 'medium': 'example' } },
  ];

  return (
    <main className="min-h-screen bg-white relative">
        <>
          {/* Background Video */}
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-[50vw] h-[70vh] object-cover"
              style={{
                position: 'fixed',
                zIndex: -1
              }}
            >
              <source src="/scaniverse_trash.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Desktop Icons */}
            <div className="p-4">
              <DraggableIcon
                initialY={10}
                initialX={10}
                icon="/trash_icon.png"
                label="Trash"
                onDoubleClick={() => setShowTrash(true)}
              />
              <DraggableIcon
                initialY={100}
                initialX={10}
                icon="/info_icon.png"
                label="Info"
                onDoubleClick={handleInfoOpen}
              />
              <DraggableIcon
                initialY={190}
                initialX={10}
                icon="/tv_icon.png"
                label="Livestream"
                onDoubleClick={() => setShowLivestream(true)}
              />
            </div>

            {/* Trash Window */}
            {showTrash && (
              <ResizableWindow
                title="Trash"
                onClose={() => setShowTrash(false)}
                initialPosition={{ x: 100, y: 100 }}
              >
                <div className="p-4 grid grid-cols-3 gap-4">
                  {trashFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex flex-col items-center p-8 space-y-4 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors mt-[8px]"
                      onClick={() => {
                        setSelectedModelInfo(file.modelInfo);
                        setSelectedModelTitle(file.name)
                        setShowModelViewer(true);
                      }}
                    >
                      <Image height={96} width={96} src={file.icon} alt={file.name} className="w-6 h-6" />
                      <span className="text-sm mt-2 font-prestige">{file.name}</span>
                    </div>
                  ))}
                </div>
              </ResizableWindow>
            )}

            {/* Info Window */}
            {showInfo && (
              <ResizableWindow
                title="Information"
                onClose={() => setShowInfo(false)}
                initialPosition={{ x: 300, y: 100 }}
              >
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={infoImage}
                    alt="Rejects Poster"
                    width={800}
                    height={800}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </ResizableWindow>
            )}

            {/* Livestream Window */}
            {showLivestream && (
              <ResizableWindow
                title="Livestream"
                onClose={() => setShowLivestream(false)}
                initialPosition={{ x: 500, y: 100 }}
              >
                <div className="w-full h-full p-4">
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/zjXJxZAL12Y?si=K34nUxbbUaW0dfo2"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              </ResizableWindow>
            )}

            {/* Model Viewer Window */}
            {showModelViewer && (
              <ResizableWindow
                title={selectedModelTitle}
                onClose={() => setShowModelViewer(false)}
                initialPosition={{ x: 700, y: 100 }}
              >
              <VideoPlayer 
                videoUrl="/example_scan.MP4" 
                modelInfo={selectedModelInfo}
              />
              </ResizableWindow>
            )}
          </div>
        </>
    </main>
  );
}
