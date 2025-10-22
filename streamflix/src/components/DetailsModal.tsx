// src/components/DetailsModal.tsx
'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { ContentItem } from '@/types';

interface DetailsModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

export default function DetailsModal({ item, onClose }: DetailsModalProps) {
  const isOpen = !!item;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden
                                     rounded-lg bg-background-light text-left
                                     align-middle shadow-xl transition-all"
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-20 p-1 bg-black/60 rounded-full hover:bg-black/80 text-text transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {item && (
                  <div>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={item.backdropUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background-light to-transparent z-10" />
                    </div>

                    <div className="p-8 space-y-6">
                      <Dialog.Title
                        as="h2"
                        className="text-3xl font-display text-text leading-6"
                      >
                        {item.title}
                      </Dialog.Title>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center justify-center bg-white text-black px-5 py-2 rounded-md text-lg font-bold hover:bg-opacity-80 transition">
                          <Play className="h-6 w-6 mr-2" fill="black" />
                          Play
                        </button>
                        <button
                          className="
                            h-10 w-10 flex items-center justify-center rounded-full
                            border-2 border-border text-text-muted
                            bg-black/60 transition-all duration-300
                            hover:border-white hover:text-white hover:bg-white/10
                            focus:outline-none focus-visible:border-white
                          "
                          aria-label="Add to My List"
                        >
                          <Plus size={20} />
                        </button>
                        <button
                          className="
                            h-10 w-10 flex items-center justify-center rounded-full
                            border-2 border-border text-text-muted
                            bg-black/60 transition-all duration-300
                            hover:border-white hover:text-white hover:bg-white/10
                            focus:outline-none focus-visible:border-white
                          "
                          aria-label="Like this"
                        >
                          <ThumbsUp size={18} />
                        </button>
                      </div>

                      <p className="text-base text-text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}