/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

const GALLERY_VIDEOS = [
  {
    id: 'v1',
    title: 'Chession Signature Zinger Prep',
    description: 'Watch our artisan chefs hand-bread and deep-fry the ultimate crispy chicken patty to golden perfection.',
    driveId: '17PfzzD1c8nydUHhtmzrPTJ-yDBAHi_bO',
    youtubeId: 'FmYjS36lV6g',
    emoji: '🍔',
    category: 'Sizzler Craft'
  },
  {
    id: 'v2',
    title: 'Crown Crust Baking Art',
    description: 'Observe the precise hand-kneading, cheese stuffing, and hot baking of our iconic crown crust pizza.',
    driveId: '1GBBX5TytjHt7B6bbzGrlsDzxxUHdiIMt',
    youtubeId: 'g9pWJzS0K6o',
    emoji: '🍕',
    category: 'Oven Bake'
  },
  {
    id: 'v3',
    title: 'Coal Fire Charcoal Grilling',
    description: 'Experience the live sizzle and smoke as we slow-roast premium marinated seekh kababs and soft malai botis.',
    driveId: '1-Z-DlbQrH-RkAUfYV-p5_KqM6IkJE2vS',
    youtubeId: 'T7_oBfWb8zI',
    emoji: '🔥',
    category: 'BBQ Flame'
  },
  {
    id: 'v4',
    title: 'Gourmet Loaded Serving',
    description: 'Delight in the aesthetic plating and dynamic sauce drizzling on our popular cheesy loaded fries.',
    driveId: '1vbiMirPOW-8TaMSTgSUSduzfqr-LPJsA',
    youtubeId: 'vbiMirPOW-8',
    emoji: '🍟',
    category: 'Plating Art'
  }
];

export default function Gallery() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-[#F5F3FF] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="gallery-header">
          <span className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#5c1d9b]">
            Our Kitchen In Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#2D1B4D] mt-2 tracking-tight">
            Watch the Craft of Chession Fast Food
          </h2>
          <div className="h-1.5 w-16 bg-[#5c1d9b] mx-auto mt-4 rounded-full" id="gallery-divider" />
        </div>

        {/* Video Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" id="gallery-video-grid">
          {GALLERY_VIDEOS.map((video) => {
            const directUrl = `https://drive.google.com/file/d/${video.driveId}/view?usp=sharing`;
            const isPlaying = playingId === video.id;

            return (
              <div
                key={video.id}
                className="group bg-white/70 backdrop-blur-md rounded-[2.5rem] p-5 border border-purple-100 shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 flex flex-col justify-between gap-5 transform hover:-translate-y-1"
                id={`gallery-video-card-${video.id}`}
              >
                {/* Embedded Video Player Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border border-purple-50 bg-slate-950">
                  {isPlaying ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={`https://drive.google.com/file/d/${video.driveId}/preview?autoplay=1&mute=1`}
                        className="w-full h-full absolute inset-0 border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                      {/* Close button to return to poster preview state */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingId(null);
                        }}
                        className="absolute top-3 right-3 z-20 px-3 py-1.5 text-[11px] font-sans font-bold bg-black/80 hover:bg-black text-white rounded-lg transition-colors shadow-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/10"
                      >
                        ✕ Stop Player
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setPlayingId(video.id)}
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gradient-to-tr from-[#2D1B4D]/95 via-[#2D1B4D]/80 to-purple-950/65 transition-all duration-300 hover:from-[#2D1B4D] hover:to-purple-950/50"
                    >
                      {/* Modern grid background lines for futuristic/clean feel */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      <div className="relative z-10 flex flex-col items-center">
                        {/* Interactive floating bubble with category Emoji */}
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg border border-white/20 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {video.emoji}
                        </div>
                        
                        {/* Play Action Button with nice shadow */}
                        <div className="flex items-center gap-2.5 px-6 py-3 bg-white text-[#5c1d9b] font-display font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transform group-hover:scale-105 group-hover:bg-[#5c1d9b] group-hover:text-white transition-all duration-300 border border-purple-100">
                          <Play className="h-3.5 w-3.5 fill-current" />
                          Play Video
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info and External Controls */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-3 py-1 bg-purple-50 text-[#5c1d9b] font-sans text-[10px] font-extrabold rounded-full uppercase tracking-widest">
                        {video.emoji} {video.category}
                      </span>
                      <a
                        href={directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open on Google Drive"
                        className="p-1 text-purple-400 hover:text-[#5c1d9b] hover:bg-purple-50 rounded-lg transition-all"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#2D1B4D] group-hover:text-[#5c1d9b] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-purple-400 font-sans leading-relaxed mt-1">
                      {video.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

