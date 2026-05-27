// 'use client';

// import dynamic from 'next/dynamic';
// import { memo, useCallback, useEffect, useRef, useState } from 'react';

// // Import HLS.js
// import Hls from 'hls.js';
// import ReactPlayer from 'react-player';

// import animationData from '@/shared/assets/lotties/warning.json';
// import { Button, Text } from '@/shared/components/ui';
// import Modal from '@/shared/components/ui/Dialog/Modal';
// import Flex from '@/shared/components/ui/Flex';
// import {
//   VideoPlayer,
//   VideoPlayerContent,
//   VideoPlayerControlBar,
//   VideoPlayerFullscreenButton,
//   VideoPlayerMuteButton,
//   VideoPlayerPlayButton,
//   VideoPlayerSeekBackwardButton,
//   VideoPlayerSeekForwardButton,
//   VideoPlayerTimeDisplay,
//   VideoPlayerTimeRange,
//   VideoPlayerVolumeRange,
// } from '@/shared/components/ui/video-player';
// import { TextSize } from '@/shared/enum/text';
// import { useWindowClose } from '@/shared/hooks/useWindowClose';
// import useBoundStore from '@/stores';

// const Lottie = dynamic(() => import('react-lottie'), {
//   ssr: false,
// });
// const MemoizedReactPlayer = memo(ReactPlayer);
// type VideoState = {
//   playing: boolean;
//   played: number;
//   duration: number;
//   volume: number;
//   muted: boolean;
//   isFullscreen: boolean;
//   error: boolean;
//   loaded: number;
// };

// type Props = {
//   url: string;
//   cacheKey: string;
//   updateTracking?: (data: {
//     totalLearningTime: number;
//     currentLearningTime: number;
//   }) => void | undefined;
//   checkFirstTimeLearning?: (params: { type: 'START' | 'FINISH' }) => void;
// };

// const FLAG_TIME_SAVE_POSITION = 5;
// const FLAG_INTERVAL_SAVE_POSITION = 30;

// const VideoLesson = ({
//   url: urlProps,
//   cacheKey,
//   updateTracking,
//   checkFirstTimeLearning,
// }: Props) => {
//   const userDetail = useBoundStore((state) => state.userDetail);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const hlsRef = useRef<Hls | null>(null);
//   const videoYtRef = useRef<ReactPlayer>(null);
//   const [videoState, setVideoState] = useState<any>({
//     error: false,
//   });

//   const isYoutube = urlProps.includes('youtube.com');

//   // Initialize setup
//   const getStorageKey = (url: string) =>
//     `${userDetail?.id}-video-position-${url}`;

//   const [showContinueModal, setShowContinueModal] = useState(
//     !!localStorage.getItem(getStorageKey(cacheKey)),
//   );
//   // state
//   const [url, setUrl] = useState<string>(urlProps);
//   const videoStateRef = useRef({
//     savedPosition: 0,
//     duration: 0,
//     play: false,
//   });
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };

//   const load = () => {
//     videoStateRef.current = {
//       ...videoStateRef.current,
//       duration: 0,
//     };
//   };

//   const handleContinue = () => {
//     const savedPosition = localStorage.getItem(getStorageKey(cacheKey));
//     if (videoRef.current) {
//       videoRef.current.currentTime = parseFloat(savedPosition || '0');
//     }
//     if (videoYtRef.current) {
//       videoYtRef.current.seekTo(parseFloat(savedPosition || '0'));
//     }
//     videoStateRef.current = {
//       ...videoStateRef.current,
//       savedPosition: parseFloat(savedPosition || '0'),
//     };
//     setTimeout(() => {
//       setShowContinueModal(false);
//     }, 200);
//   };

//   const handleStartOver = () => {
//     videoStateRef.current = {
//       ...videoStateRef.current,
//       savedPosition: 0,
//     };
//     localStorage.removeItem(getStorageKey(cacheKey));
//     setTimeout(() => {
//       setShowContinueModal(false);
//     }, 200);
//   };

//   const handleUpdateTracking = useCallback(
//     (currentTime?: number, totalTime?: number) => {
//       if (videoState.error) return;
//       const localTime = currentTime
//         ? currentTime
//         : (videoStateRef.current.savedPosition ?? 0);
//       if (!!(totalTime ? totalTime : videoStateRef.current.duration)) {
//         updateTracking?.({
//           totalLearningTime: totalTime
//             ? totalTime
//             : videoStateRef.current.duration,
//           currentLearningTime: localTime,
//         });
//       }
//     },
//     [cacheKey, updateTracking, videoState.error],
//   );

//   const handleEnded = useCallback(
//     (event: any) => {
//       videoStateRef.current = {
//         ...videoStateRef.current,
//         savedPosition: event.target.duration ?? 0,
//       };
//       handleUpdateTracking(event.target.currentTime, event.target.duration);
//       localStorage.removeItem(getStorageKey(cacheKey));
//       checkFirstTimeLearning?.({ type: 'FINISH' });
//     },
//     [cacheKey, handleUpdateTracking, checkFirstTimeLearning],
//   );

//   const handleYoutubeEnded = useCallback(
//     (event: any) => {
//       videoStateRef.current = {
//         ...videoStateRef.current,
//         savedPosition: videoYtRef.current?.getDuration() ?? 0,
//       };
//       handleUpdateTracking(
//         videoYtRef.current?.getDuration(),
//         videoYtRef.current?.getDuration(),
//       );
//       localStorage.removeItem(getStorageKey(cacheKey));
//       checkFirstTimeLearning?.({ type: 'FINISH' });
//     },
//     [cacheKey, handleUpdateTracking, checkFirstTimeLearning],
//   );

//   const handleProgress = useCallback(
//     (event: any) => {
//       const currentTime = event.target.currentTime || 0;
//       const duration = event.target.duration || 0;
//       localStorage.setItem(getStorageKey(cacheKey), currentTime.toString());
//       // Save to localStorage every time progress updates
//       if (
//         currentTime > FLAG_TIME_SAVE_POSITION &&
//         currentTime - videoStateRef.current.savedPosition >
//           FLAG_INTERVAL_SAVE_POSITION &&
//         duration > FLAG_INTERVAL_SAVE_POSITION
//       ) {
//         handleUpdateTracking(currentTime, duration);
//         videoStateRef.current = {
//           ...videoStateRef.current,
//           savedPosition: currentTime,
//         };
//         return;
//       }

//       if (duration < FLAG_INTERVAL_SAVE_POSITION) {
//         handleUpdateTracking(duration, duration);
//         return;
//       }
//     },
//     [cacheKey, handleUpdateTracking],
//   );

//   const handleProgressYouTube = useCallback(
//     (event: any) => {
//       const currentTime = event.playedSeconds || 0;
//       const duration = videoYtRef.current?.getDuration() || 0;
//       if (videoStateRef.current.play) {
//         localStorage.setItem(getStorageKey(cacheKey), currentTime.toString());
//       }
//       // Save to localStorage every time progress updates
//       if (
//         currentTime > FLAG_TIME_SAVE_POSITION &&
//         currentTime - videoStateRef.current.savedPosition >
//           FLAG_INTERVAL_SAVE_POSITION &&
//         duration > FLAG_INTERVAL_SAVE_POSITION
//       ) {
//         handleUpdateTracking(currentTime, duration);
//         videoStateRef.current = {
//           ...videoStateRef.current,
//           savedPosition: currentTime,
//         };
//         return;
//       }

//       if (duration < FLAG_INTERVAL_SAVE_POSITION) {
//         handleUpdateTracking(duration, duration);
//         return;
//       }
//     },
//     [cacheKey, handleUpdateTracking],
//   );

//   const handleError = useCallback(
//     (e: React.SyntheticEvent<HTMLVideoElement>) => {
//       console.error('Video error:', e);
//       setVideoState((prev: any) => ({
//         ...prev,
//         error: true,
//       }));
//     },
//     [],
//   );

//   useWindowClose({
//     onBeforeUnload: (event) => {
//       handleUpdateTracking(
//         videoStateRef.current.savedPosition,
//         videoStateRef.current.duration,
//       );
//       return '';
//     },
//     onUnload: () => {
//       console.log('Window is actually closing now');
//     },
//   });

//   useEffect(() => {
//     checkFirstTimeLearning?.({ type: 'START' });
//   }, []);

//   useEffect(() => {
//     load();
//     setUrl(urlProps);
//   }, [urlProps]);

//   // Initialize HLS.js
//   useEffect(() => {
//     if (!videoRef.current || !url || showContinueModal) {
//       return;
//     }

//     if (isYoutube) {
//       videoYtRef.current?.seekTo(
//         parseFloat(`${videoStateRef.current.savedPosition}`),
//         'seconds',
//       );
//       return;
//     }

//     const video = videoRef.current;

//     // Check if HLS is supported
//     if (Hls.isSupported()) {
//       // Destroy existing HLS instance
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//       }

//       // Create new HLS instance
//       const hls = new Hls({
//         debug: false,
//         enableWorker: true,
//         lowLatencyMode: true,
//         backBufferLength: 90,
//         maxBufferLength: 30,
//         maxMaxBufferLength: 600,
//         maxBufferSize: 60 * 1000 * 1000, // 60MB
//         maxBufferHole: 0.5,
//         highBufferWatchdogPeriod: 2,
//         nudgeOffset: 0.2,
//         nudgeMaxRetry: 5,
//         maxFragLookUpTolerance: 0.25,
//         liveSyncDurationCount: 3,
//         liveMaxLatencyDurationCount: 10,
//         liveDurationInfinity: true,
//         liveBackBufferLength: 90,
//         progressive: false,
//       });

//       hlsRef.current = hls;

//       // Load the source
//       hls.loadSource(url);
//       hls.attachMedia(video);

//       // Event listeners
//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         console.log('HLS manifest loaded');
//         if (videoStateRef.current.savedPosition > 0) {
//           video.currentTime = videoStateRef.current.savedPosition;
//         }
//       });

//       hls.on(Hls.Events.ERROR, (event, data) => {
//         console.error('HLS error:', data);
//         if (data.fatal) {
//           setVideoState((prev: any) => ({
//             ...prev,
//             error: true,
//           }));
//         }
//       });

//       // Cleanup
//       return () => {
//         if (hlsRef.current) {
//           hlsRef.current.destroy();
//           hlsRef.current = null;
//         }
//       };
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       // Native HLS support (Safari)
//       video.src = url;
//       if (videoStateRef.current.savedPosition > 0) {
//         video.currentTime = videoStateRef.current.savedPosition;
//       }
//     } else {
//       // Fallback for unsupported browsers
//       console.warn('HLS not supported in this browser');
//       setVideoState((prev: any) => ({
//         error: true,
//       }));
//     }
//   }, [url, showContinueModal]);

//   // Clean up localStorage when component unmounts
//   useEffect(() => {
//     return () => {
//       handleUpdateTracking(
//         videoStateRef.current.savedPosition,
//         videoStateRef.current.duration,
//       );
//     };
//   }, []);

//   return (
//     <Flex
//       align="center"
//       justify="center"
//       className={`relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-solid border-[rgba(0,0,0,0.05)] ${videoState.isFullscreen ? 'fixed top-0 right-0 bottom-0 left-0 z-[1000] h-[100dvh] w-[100dvw] rounded-none bg-black' : ''} `}
//     >
//       {videoState.error ? (
//         <Flex
//           vertical
//           justify="center"
//           align="center"
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Lottie options={defaultOptions} height={160} width={160} />
//           <Text>Video này đang bị lỗi, vui lòng thử lại sau</Text>
//         </Flex>
//       ) : (
//         <>
//           <VideoPlayer className="h-full w-full overflow-hidden rounded-lg">
//             {isYoutube ? (
//               <MemoizedReactPlayer
//                 id="react-player"
//                 className={`react-player [&_iframe]:object-contain [&_video]:object-contain`}
//                 url={url}
//                 ref={videoYtRef}
//                 width="100%"
//                 height="100%"
//                 onProgress={handleProgressYouTube}
//                 onEnded={handleYoutubeEnded}
//                 onError={handleError}
//                 controls={isYoutube}
//                 onStart={() => {
//                   videoStateRef.current = {
//                     ...videoStateRef.current,
//                     play: true,
//                   };
//                 }}
//                 onReady={(e: any) => {
//                   console.log('onReady', e);
//                   videoStateRef.current = {
//                     ...videoStateRef.current,
//                     duration: e.getDuration() || 0,
//                   };
//                 }}
//                 config={{
//                   file: {
//                     attributes: {
//                       controlsList: 'nofullscreen',
//                     },
//                   },
//                 }}
//               />
//             ) : (
//               <VideoPlayerContent
//                 id="hls-video-player"
//                 ref={videoRef}
//                 className="h-full w-full object-contain"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'contain',
//                 }}
//                 onError={handleError}
//                 preload="auto"
//                 slot="media"
//                 onTimeUpdate={handleProgress}
//                 onEnded={handleEnded}
//                 onLoadedMetadata={(e: any) => {
//                   console.log(
//                     'Video metadata loaded, duration:',
//                     e.target.duration,
//                   );
//                   videoStateRef.current = {
//                     ...videoStateRef.current,
//                     duration: e.target.duration,
//                   };
//                 }}
//               />
//             )}
//             {!isYoutube && (
//               <VideoPlayerControlBar className="absolute right-0 bottom-0 left-0 z-10">
//                 <VideoPlayerPlayButton />
//                 <VideoPlayerSeekBackwardButton />
//                 <VideoPlayerSeekForwardButton />
//                 <VideoPlayerTimeRange />
//                 <VideoPlayerTimeDisplay showDuration />
//                 <VideoPlayerMuteButton />
//                 <VideoPlayerVolumeRange />
//                 <VideoPlayerFullscreenButton />
//               </VideoPlayerControlBar>
//             )}
//           </VideoPlayer>
//         </>
//       )}
//       <Modal
//         open={showContinueModal}
//         onCancel={handleStartOver}
//         maskClosable={false}
//         disableCloseIcon={true}
//         onClose={handleStartOver}
//       >
//         <Flex vertical gap={8} align="center">
//           <Text size={TextSize.MEDIUM} weight={700}>
//             Bạn đã xem video này trước đó
//           </Text>
//           <Text size={TextSize.SMALL}>
//             Bạn có muốn tiếp tục từ vị trí này không?
//           </Text>
//           <Flex gap={8}>
//             <Button variant="outline" onClick={handleStartOver}>
//               Bắt đầu lại
//             </Button>
//             <Button variant="primary" onClick={handleContinue}>
//               Tiếp tục
//             </Button>
//           </Flex>
//         </Flex>
//       </Modal>
//     </Flex>
//   );
// };

// export default VideoLesson;
