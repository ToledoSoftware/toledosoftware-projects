// src/app/page.tsx
'use client';

import { useState } from 'react';
import Hero from "@/components/Hero";
import ContentCarousel from "@/components/ContentCarousel";
import TrendingCarousel from "@/components/TrendingCarousel";
import DetailsModal from '@/components/DetailsModal';
import { ContentItem } from '@/types';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'w1280';

const heroItem: ContentItem = {
  id: 335984,
  title: "Blade Runner 2049",
  description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
  posterUrl: `https://image.tmdb.org/t/p/original/49pANIZXRAdHUiWjjBv4vxPeqRC.jpg`,
  backdropUrl: `https://image.tmdb.org/t/p/original/2nxaonskdI2afzXHEUb8pl9U9Er.jpg`
};

const trendingItems: ContentItem[] = [
  { id: 27205, title: "Inception",
    backdropUrl: `https://media.themoviedb.org/t/p/w500_and_h282_face/28kKbSUvUz6P5RE1AuMJMO7IMfK.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg`,
    description: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life..."
  },
  { id: 157336, title: "Interstellar",
    backdropUrl: `https://media.themoviedb.org/t/p/w500_and_h282_face/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/iolc5VLP4PFU0XvjTVRiCb80mUR.jpg`,
    description: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel..."
  },
  { id: 608, title: "The Matrix",
    backdropUrl: `https://image.tmdb.org/t/p/original/bFrAd2tAgmuS81EOSrNobqZ0eks.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg`,
    description: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers..."
  },
  { id: 823464, title: "Oppenheimer",
    backdropUrl: `https://image.tmdb.org/t/p/original/ycnO0cjsAROSGJKuMODgRtWsHQw.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/1OsQJEoSXBjduuCvDOlRhoEUaHu.jpg`,
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
];

const comedyItems: ContentItem[] = [
  { id: 573435, title: "Deadpool & Wolverine",
    backdropUrl: `https://image.tmdb.org/t/p/original/hzr7GhCoWTeQQMKDR6LXhN8x9fs.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/kHYkLHSkI5h5mrkUZJul4qVMoKv.jpg`,
    description: "A listless Wade Wilson toils away in civilian life. His days as the morally flexible mercenary Deadpool left behind..."
  },
  { id: 385687, title: "Barbie",
    backdropUrl: `https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/szZqSvNecde4VZiMcXZwfPVfdlI.jpg`,
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land..."
  },
  { id: 912908, title: "Beetlejuice Beetlejuice",
    backdropUrl: `https://image.tmdb.org/t/p/original/vchI0KSlYgCInkAdBlDaxL9xhq5.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/pRKunisKThee9MM8OECT36KWxLe.jpg`,
    description: "The original dynamic duo is back as Michael Keaton reprises his role as the mischievous demon..."
  },
];

const actionItems: ContentItem[] = [
  { id: 603692, title: "John Wick: Chapter 4",
    backdropUrl: `https://image.tmdb.org/t/p/original/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/3729g4nxYJqlJHhkKSHQAOzEul2.jpg`,
    description: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table..."
  },
  { id: 786892, title: "Furiosa: A Mad Max Saga",
    backdropUrl: `https://image.tmdb.org/t/p/original/tWMDdYvM22RZ1tk40fseAH0uMZs.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/ddNCB6wN0AY440umNT0JaqdNYwC.jpg`,
    description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers..."
  },
];

const sciFiItems: ContentItem[] = [
  { id: 693134, title: "Dune: Part Two",
    backdropUrl: `https://image.tmdb.org/t/p/original/l6b9YZEokZl1nt7q0pprrur6btG.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/1ZoNKOCgWyjEiR3WKDzK4cGumWJ.jpg`,
    description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen..."
  },
  { id: 843527, title: "Kingdom of the Planet of the Apes",
    backdropUrl: `https://image.tmdb.org/t/p/original/iHYh4cdO8ylA3W0dUxTDVdyJ5G9.jpg`,
    posterUrl: `https://image.tmdb.org/t/p/original/4AO71OSvwu1SzKH1535YofESnay.jpg`,
    description: "Several generations in the future following Caesar's reign, apes are now the dominant species..."
  },
];


export default function Home() {
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  return (
    <main className="overflow-hidden">
      <Hero item={heroItem} onShowDetails={setSelectedItem} />
      <div className="container mx-auto px-10 py-8 space-y-20 -mt-24 md:-mt-32 relative z-10">
        <TrendingCarousel
          title="Trending Now"
          items={trendingItems}
          onShowDetails={setSelectedItem}
        />
        <ContentCarousel
          title="Comedy"
          items={comedyItems}
          onShowDetails={setSelectedItem}
        />
        <ContentCarousel
          title="Action"
          items={actionItems}
          onShowDetails={setSelectedItem}
        />
        <ContentCarousel
          title="Sci-Fi"
          items={sciFiItems}
          onShowDetails={setSelectedItem}
        />
      </div>
      <DetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}