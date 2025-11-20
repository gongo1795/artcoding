import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Index = () => {
  const [artworkInfo, setArtworkInfo] = useState('');
  const [curatorNarration, setCuratorNarration] = useState('');
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);
  const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
  const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
  const [narrationAudio, setNarrationAudio] = useState<HTMLAudioElement | null>(null);

  // 텍스트 파일 로드
  useEffect(() => {
    const loadTextFiles = async () => {
      try {
        const artworkResponse = await fetch('/artwork_info.txt');
        const artworkText = await artworkResponse.text();
        setArtworkInfo(artworkText);

        const narrationResponse = await fetch('/curator_narration.txt');
        const narrationText = await narrationResponse.text();
        setCuratorNarration(narrationText);
      } catch (error) {
        console.log('텍스트 파일을 불러올 수 없습니다:', error);
      }
    };

    loadTextFiles();
  }, []);

  // 오디오 초기화
  useEffect(() => {
    // 배경음악 초기화 (실제 파일이 없으므로 더미 오디오)
    const bgAudio = new Audio();
    bgAudio.loop = true;
    bgAudio.volume = 0.3;
    setBackgroundAudio(bgAudio);

    // 나레이션 오디오 초기화 (실제 파일이 없으므로 더미 오디오)
    const narAudio = new Audio();
    narAudio.volume = 0.7;
    setNarrationAudio(narAudio);

    return () => {
      bgAudio.pause();
      narAudio.pause();
    };
  }, []);

  // 눈송이 생성
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      
      document.body.appendChild(snowflake);
      
      setTimeout(() => {
        if (snowflake.parentNode) {
          snowflake.remove();
        }
      }, 5000);
    };

    const snowInterval = setInterval(createSnowflake, 300);
    
    return () => {
      clearInterval(snowInterval);
    };
  }, []);

  const toggleBackgroundMusic = () => {
    if (backgroundAudio) {
      if (isBackgroundPlaying) {
        backgroundAudio.pause();
      } else {
        // 실제 파일이 없으므로 상태만 변경
        console.log('배경음악 재생 (background.mp3)');
      }
      setIsBackgroundPlaying(!isBackgroundPlaying);
    }
  };

  const toggleNarration = () => {
    if (narrationAudio) {
      if (isNarrationPlaying) {
        narrationAudio.pause();
      } else {
        // 실제 파일이 없으므로 상태만 변경
        console.log('나레이션 재생 (Explain.mp3)');
      }
      setIsNarrationPlaying(!isNarrationPlaying);
    }
  };

  const openArtwork = () => {
    window.open('/art1.html', '_blank', 'fullscreen=yes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gallery-frost via-gallery-ice to-gallery-snow relative overflow-hidden">
      {/* 헤더 */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-gallery-winter mb-2 tracking-wide">
            Winter Gallery
          </h1>
          <p className="text-lg text-gallery-winter/70 font-light">
            차가운 아름다움이 살아 숨쉬는 공간
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 작품 프리뷰 */}
          <div className="space-y-6">
            <Card className="ice-glow bg-gallery-snow/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <div className="aspect-square bg-gradient-to-br from-primary/10 via-accent/20 to-primary-glow/10 rounded-lg mb-6 relative overflow-hidden cursor-pointer group" onClick={openArtwork}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full artwork-float flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gallery-winter/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <Button 
                  onClick={openArtwork}
                  className="w-full bg-primary hover:bg-primary-glow text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  작품 감상하기
                </Button>
              </CardContent>
            </Card>

            {/* 오디오 컨트롤 */}
            <div className="flex gap-4">
              <Button
                onClick={toggleBackgroundMusic}
                variant="outline"
                className="audio-control flex-1 py-3"
              >
                {isBackgroundPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                배경음악
              </Button>
              <Button
                onClick={toggleNarration}
                variant="outline"
                className="audio-control flex-1 py-3"
              >
                {isNarrationPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                큐레이터 설명
              </Button>
            </div>
          </div>

          {/* 작품 정보 */}
          <div className="space-y-6">
            <Card className="ice-glow bg-gallery-snow/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light text-gallery-winter mb-6 border-b border-border/30 pb-4">
                  작품 정보
                </h2>
                <div className="space-y-4 text-gallery-winter/80 leading-relaxed">
                  {artworkInfo.split('\n').map((line, index) => {
                    if (line.trim() === '') return <br key={index} />;
                    if (line.includes(':')) {
                      const [label, ...content] = line.split(':');
                      return (
                        <div key={index} className="flex flex-col sm:flex-row gap-2">
                          <span className="font-medium text-gallery-winter min-w-24">{label.trim()}:</span>
                          <span className="text-gallery-winter/70">{content.join(':').trim()}</span>
                        </div>
                      );
                    }
                    return <p key={index} className="text-sm leading-relaxed">{line}</p>;
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="ice-glow bg-gallery-snow/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-light text-gallery-winter mb-6 border-b border-border/30 pb-4">
                  큐레이터 노트
                </h2>
                <div className="space-y-4 text-gallery-winter/80 leading-relaxed text-sm">
                  {curatorNarration.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 mt-20 p-6 border-t border-border/30 bg-gallery-frost/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gallery-winter/60 text-sm font-light">
            © 2024 Winter Gallery. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
