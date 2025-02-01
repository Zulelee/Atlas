/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import { useRef, useEffect, useState, use } from "react";
import Link from "next/link";
import * as THREE from "three";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShouldShow(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen bg-[#0B1221]">
      <Background />
      <div className="relative z-10">
        <Hero />ِ
        <ExplorePrompt />
        <Services />
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "-25%"]);

  useEffect(() => {
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      <motion.h1
        className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] font-bold text-white mb-4 tracking-tighter"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        ATLAS
      </motion.h1>
      <motion.div
        className="absolute bottom-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-xl sm:text-2xl md:text-3xl text-blue-300 font-light mb-8">
          AI Powered Intelligence
        </p>
        <motion.p
          className="text-sm sm:text-base text-gray-400 uppercase tracking-widest"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          Scroll to continue
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

function ExplorePrompt() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["25%", "0%", "-25%"]);

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
    >
      <motion.h2
        className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Ready to explore?
      </motion.h2>
      {/* <motion.p
        className="text-xl sm:text-2xl md:text-3xl text-blue-300 font-light mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Discover the power of AI-driven business intelligence
      </motion.p> */}
      <motion.p
        className="text-sm sm:text-base text-gray-400 uppercase tracking-widest"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        Keep Scrolling
      </motion.p>
    </motion.section>
  );
}

function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const router = useRouter();
  const services = [
    {
      title: "Atlas Confirms",
      description: "Did They Really Book? Know in Seconds.",
      path: "/atlas-confirms",
    },
    // {
    //   title: "Atlas Predict",
    //   description:
    //     "Predictive analytics platform transforming historical data into future business opportunities.",
    // },
    // {
    //   title: "Atlas Connect",
    //   description:
    //     "Seamless integration platform unifying your entire business intelligence ecosystem.",
    // },
  ];

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });

  const serviceAnimations = services.map((_, index) => {
    const startShow = index / services.length;
    const endShow = startShow + 0.15;
    const startHide = endShow + 0.15;
    const endHide = startHide + 0.15;

    return {
      y: useTransform(
        scrollYProgress,
        [startShow, endShow, startHide, endHide],
        ["100%", "0%", "0%", "-100%"],
        {
          ease: cubicBezier(0.16, 1, 0.3, 1),
        }
      ),
      scale: useTransform(
        scrollYProgress,
        [startShow, endShow, startHide, endHide],
        [0.8, 1, 1, 0.8],
        {
          ease: cubicBezier(0.16, 1, 0.3, 1),
        }
      ),
      opacity: useTransform(
        scrollYProgress,
        [startShow, endShow, startHide, endHide],
        [0, 1, 1, 0],
        {
          ease: cubicBezier(0.16, 1, 0.3, 1),
        }
      ),
    };
  });

  // return (
  //   <section ref={containerRef} className="min-h-[400vh] relative">
  //     <svg
  //       className="fixed top-0 left-0 w-full h-full pointer-events-none"
  //       style={{ zIndex: 0 }}
  //     >
  //       <motion.path
  //         d="M 0 0 Q 200 200, 400 100 T 800 300 T 1200 500 T 1600 300"
  //         stroke="#0066ff"
  //         strokeWidth="4"
  //         fill="none"
  //         style={{
  //           pathLength: lineProgress,
  //           filter: "drop-shadow(0 0 10px #0066ff)",
  //         }}
  //       />
  //     </svg>

  //     {services.map((service, index) => {
  //       const { y, scale, opacity } = serviceAnimations[index];

  //       return (
  //         // <motion.div
  //         //   key={index}
  //         //   className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
  //         //   initial={{ y: "100%", opacity: 0, scale: 0.8 }}
  //         //   style={{ y, scale, opacity, zIndex: 1 }}
  //         // >
  //         //   <div className="w-full max-w-2xl px-8">
  //         //     <motion.div
  //         //       className="bg-transparent p-16 rounded-lg border border-none backdrop-blur-md"
  //         //       // whileHover={{ boxShadow: "0 0 50px rgba(0, 102, 255, 0.3)" }}
  //         //       transition={{ duration: 0.3 }}
  //         //     >
  //         //       <motion.h2
  //         //         className="text-7xl font-bold text-white mb-8 tracking-tighter"
  //         //         initial={{ opacity: 0, y: 20 }}
  //         //         animate={{ opacity: 1, y: 0 }}
  //         //         transition={{ delay: 0.2, duration: 0.8 }}
  //         //       >
  //         //         {service.title}
  //         //       </motion.h2>
  //         //       <motion.p
  //         //         className="text-2xl text-blue-200 mb-12 leading-relaxed"
  //         //         initial={{ opacity: 0, y: 20 }}
  //         //         animate={{ opacity: 1, y: 0 }}
  //         //         transition={{ delay: 0.4, duration: 0.8 }}
  //         //       >
  //         //         {service.description}
  //         //       </motion.p>
  //         //       <motion.button
  //         //         className="px-10 py-4 bg-[#0066ff] text-white text-xl rounded-lg hover:bg-blue-600 transition-colors shadow-lg "
  //         //         whileTap={{ scale: 0.95 }}
  //         //         initial={{ opacity: 0, y: 20 }}
  //         //         animate={{ opacity: 1, y: 0 }}
  //         //         transition={{ delay: 0.6, duration: 0.8 }}
  //         //       >
  //         //         Test Now
  //         //       </motion.button>
  //         //     </motion.div>
  //         //   </div>
  //         // </motion.div>

  //         <motion.div
  //           key={index}
  //           className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
  //           initial={{ y: "100%", opacity: 0, scale: 0.8 }}
  //           style={{ y, scale, opacity, zIndex: 1 }}
  //         >
  //           <div className="w-full max-w-2xl px-8">
  //             <motion.div
  //               className="bg-transparent p-16 rounded-lg border border-none backdrop-blur-md text-center" // Added text-center here
  //               transition={{ duration: 0.3 }}
  //             >
  //               <motion.h2
  //                 className="text-7xl font-bold text-white mb-8 tracking-tighter text-center" // Added text-center
  //                 initial={{ opacity: 0, y: 20 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: 0.2, duration: 0.8 }}
  //               >
  //                 {service.title}
  //               </motion.h2>
  //               <motion.p
  //                 className="text-2xl text-blue-200 mb-12 leading-relaxed text-center" // Added text-center
  //                 initial={{ opacity: 0, y: 20 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: 0.4, duration: 0.8 }}
  //               >
  //                 {service.description}
  //               </motion.p>
  //               <div className="flex justify-center">
  //                 {" "}
  //                 {/* Added wrapper div */}
  //                 <motion.button
  //                   className="px-10 py-4 bg-[#0066ff] text-white text-xl rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
  //                   whileTap={{ scale: 0.95 }}
  //                   initial={{ opacity: 0, y: 20 }}
  //                   animate={{ opacity: 1, y: 0 }}
  //                   transition={{ delay: 0.6, duration: 0.8 }}
  //                 >
  //                   Test Now
  //                 </motion.button>
  //               </div>
  //             </motion.div>
  //           </div>
  //         </motion.div>
  //       );
  //     })}
  //   </section>
  // );
  // return (
  //   <section ref={containerRef} className="min-h-[400vh] relative">
  //     <svg
  //       className="fixed top-0 left-0 w-full h-full pointer-events-none"
  //       style={{ zIndex: 0 }}
  //     >
  //       <motion.path
  //         d="M 0 0 Q 200 200, 400 100 T 800 600 T 1200 300 T 1600 800"
  //         stroke="url(#gradient)"
  //         strokeWidth="4"
  //         fill="none"
  //         style={{
  //           pathLength: lineProgress,
  //           filter: "drop-shadow(0 0 30px #0066ff)",
  //         }}
  //       />
  //       <defs>
  //         <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
  //           <stop offset="0%" stopColor="#0066ff" />
  //           <stop offset="100%" stopColor="#00ffff" />
  //         </linearGradient>
  //       </defs>
  //     </svg>

  //     {services.map((service, index) => {
  //       const { y, scale, opacity } = serviceAnimations[index];

  //       return (
  //         <motion.div
  //           key={index}
  //           className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
  //           initial={{ y: "150%", opacity: 0, scale: 0.5 }}
  //           style={{
  //             y,
  //             scale,
  //             opacity,
  //             zIndex: 1,
  //             filter: "drop-shadow(0 0 50px rgba(0, 102, 255, 0.5))",
  //           }}
  //         >
  //           <div className="w-full max-w-4xl px-8">
  //             {" "}
  //             {/* Increased max-width */}
  //             <motion.div
  //               className="bg-transparent p-16 rounded-lg border border-[rgba(0,102,255,0.3)] backdrop-blur-xl relative overflow-hidden"
  //               transition={{ duration: 0.3 }}
  //               whileHover={{
  //                 boxShadow: "0 0 80px rgba(0, 102, 255, 0.5)",
  //                 borderColor: "rgba(0, 255, 255, 0.5)",
  //               }}
  //             >
  //               {/* Animated background effect */}
  //               <div className="absolute inset-0 -z-10 opacity-20">
  //                 <div className="absolute w-[500px] h-[500px] bg-[#0066ff] rounded-full blur-3xl -top-64 -left-64 animate-pulse" />
  //                 <div className="absolute w-[500px] h-[500px] bg-[#00ffff] rounded-full blur-3xl -bottom-64 -right-64 animate-pulse delay-1000" />
  //               </div>

  //               <motion.h2
  //                 className="text-8xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter"
  //                 initial={{ opacity: 0, y: 40 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: 0.2, duration: 0.8 }}
  //               >
  //                 {service.title}
  //               </motion.h2>

  //               <motion.p
  //                 className="text-3xl text-blue-200 mb-16 leading-relaxed font-light tracking-wide"
  //                 initial={{ opacity: 0, y: 30 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 transition={{ delay: 0.4, duration: 0.8 }}
  //               >
  //                 {service.description}
  //               </motion.p>

  //               <div className="flex justify-center">
  //                 <motion.button
  //                   className="px-16 py-6 bg-[linear-gradient(45deg,#0066ff,#00ffff)] text-white text-2xl rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-blue-900/50 relative overflow-hidden"
  //                   whileTap={{ scale: 0.95 }}
  //                   initial={{ opacity: 0, y: 20 }}
  //                   animate={{ opacity: 1, y: 0 }}
  //                   transition={{ delay: 0.6, duration: 0.8 }}
  //                   whileHover={{
  //                     background:
  //                       "linear-gradient(45deg, #0066ff, #00ffff, #0066ff)",
  //                     transition: { duration: 0.5 },
  //                   }}
  //                 >
  //                   <span className="relative z-10">Test Now</span>
  //                   <div className="absolute inset-0 bg-[rgba(255,255,255,0.1)] opacity-0 hover:opacity-100 transition-opacity" />
  //                 </motion.button>
  //               </div>
  //             </motion.div>
  //           </div>
  //         </motion.div>
  //       );
  //     })}
  //   </section>
  // );

  return (
    <section ref={containerRef} className="min-h-[400vh] relative">
      <svg
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <motion.path
          d="M 0 0 Q 200 200, 400 100 T 800 300 T 1200 500 T 1600 300"
          stroke="#0066ff"
          strokeWidth="4"
          fill="none"
          style={{
            pathLength: lineProgress,
            filter: "drop-shadow(0 0 15px rgba(0, 102, 255, 0.2))",
          }}
        />
      </svg>

      {services.map((service, index) => {
        const { y, scale, opacity } = serviceAnimations[index];

        return (
          <motion.div
            key={index}
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
            initial={{ y: "100%", opacity: 0, scale: 0.8 }}
            style={{ y, scale, opacity, zIndex: 1 }}
          >
            <div className="w-full max-w-3xl px-8">
              <motion.div
                className="bg-transparent p-12 rounded-3xl border border-[rgba(0,102,255,0.1)] backdrop-blur-sm"
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="text-7xl font-bold text-white mb-8 tracking-tighter text-center uppercase space-x-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {service.title}
                </motion.h2>
                <motion.p
                  className="text-2xl text-blue-200 mb-12 leading-relaxed text-center font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {service.description}
                </motion.p>
                <div className="flex justify-center">
                  <motion.button
                    className="px-12 py-5 bg-[#0066ff] text-white text-xl rounded-md hover:bg-[#005ce6] transition-colors"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    onClick={() => {
                      router.push(service.path);
                    }}
                  >
                    Test Now
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

function Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const createStarLayer = (
      count: number,
      size: number,
      speed: number,
      color: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        color: color,
        size: size,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      points.userData = { speed };
      scene.add(points);
      return points;
    };

    const starLayers = [
      createStarLayer(10000, 0.1, 0.001, 0x0066ff),
      createStarLayer(5000, 0.2, 0.002, 0x0066ff),
      createStarLayer(2000, 0.3, 0.003, 0x0066ff),
      createStarLayer(1000, 0.4, 0.004, 0x00ffff),
    ];

    camera.position.z = 500;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      starLayers.forEach((stars) => {
        stars.rotation.y += stars.userData.speed;
        stars.rotation.x += stars.userData.speed * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 bg-[#0B1221]" />;
}
