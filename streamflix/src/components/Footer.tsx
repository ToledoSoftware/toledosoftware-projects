// src/components/Footer.tsx
'use client';

import { Github, Linkedin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <hr className="border-t border-border/30" />

      <footer className="bg-background-light pt-12 pb-8 px-4">
        <div className="container mx-auto px-10">

          <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-10 mb-10 border-b border-border/20">

            <div className="footer-left">
              <h4 className="text-2xl font-display text-text">
                Emmanuel Toledo
              </h4>
              <p className="mt-2 text-text-muted italic">
                Available for new challenges.
              </p>
            </div>

            <div className="footer-right">
              <div className="flex gap-4 justify-start md:justify-end">
                <a
                  href="https://github.com/ToledoSoftware"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Access GitHub profile"
                  title="GitHub"
                  className="
                    h-11 w-11 flex items-center justify-center rounded-full
                    text-text-muted transition-all duration-300
                    hover:text-primary hover:-translate-y-1 hover:scale-110
                    hover:shadow-neon-glow
                    hover:bg-background-lighter/50
                  "
                >
                  <Github size={26} />
                </a>
                <a
                  href="https://www.linkedin.com/in/emmanuel-toledo-163b561a0/?locale=pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Access LinkedIn profile"
                  title="LinkedIn"
                  className="
                    h-11 w-11 flex items-center justify-center rounded-full
                    text-text-muted transition-all duration-300
                    hover:text-primary hover:-translate-y-1 hover:scale-110
                    hover:shadow-neon-glow
                    hover:bg-background-lighter/50
                  "
                >
                  <Linkedin size={26} />
                </a>
                <a
                  href="https://wa.me/5511921014001"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact via WhatsApp"
                  title="WhatsApp"
                  className="
                    h-11 w-11 flex items-center justify-center rounded-full
                    text-text-muted transition-all duration-300
                    hover:text-primary hover:-translate-y-1 hover:scale-110
                    hover:shadow-neon-glow
                    hover:bg-background-lighter/50
                  "
                >
                  <Phone size={26} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom text-center">
            <p className="text-sm text-text-muted/60">
              &copy; 2025 Emmanuel Toledo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}