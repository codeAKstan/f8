"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Play, Pause, Volume2 } from "lucide-react"

export default function BirthdayPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showHearts, setShowHearts] = useState(false)
  const [showMusicPrompt, setShowMusicPrompt] = useState(true)

  // Placeholder images - replace these with actual photos
  const photos = [
    "/1.jpg?height=400&width=400",
    "/2.jpg?height=400&width=400",
    "/3.jpg?height=400&width=400",
    "/4.jpg?height=400&width=400",
    "/5.jpg?height=400&width=400",
    "/6.jpg?height=400&width=400",
    "/7.jpg?height=400&width=400",

  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [photos.length])

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 2000)
    }, 5000)
    return () => clearInterval(heartInterval)
  }, [])

  const startMusic = async () => {
    const audio = document.getElementById("birthday-song")
    try {
      await audio.play()
      setIsPlaying(true)
      setShowMusicPrompt(false)
    } catch (error) {
      console.log("Autoplay failed:", error)
    }
  }

  const toggleMusic = () => {
    const audio = document.getElementById("birthday-song")
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    // Try to autoplay when component mounts
    const tryAutoplay = async () => {
      const audio = document.getElementById("birthday-song")
      if (audio) {
        try {
          await audio.play()
          setIsPlaying(true)
          setShowMusicPrompt(false)
        } catch (error) {
          // Autoplay failed, keep the prompt visible
          console.log("Autoplay blocked, showing prompt")
        }
      }
    }

    // Small delay to ensure audio element is ready
    setTimeout(tryAutoplay, 500)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 relative overflow-hidden">
      {/* Floating Hearts Animation */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-300 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Audio Element */}
      <audio id="birthday-song" loop>
        <source src="/birthday-girl.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Prompt Modal */}
      {showMusicPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-white/20 animate-pulse">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-white mb-4">🎉 Let's Celebrate! 🎉</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Touch here to start the birthday music and make this celebration even more special! 💙
            </p>
            <button
              onClick={startMusic}
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎶 Start the Magic! 🎶
            </button>
            <div className="flex justify-center space-x-2 mt-4 text-2xl">🎈 🎂 🎁 💕</div>
          </div>
        </div>
      )}

      {/* Music Control */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300 shadow-lg"
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        <Volume2 className="w-4 h-4 absolute -bottom-1 -right-1" />
      </button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-pulse">🎉 Happy Birthday! 🎉</h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-blue-100 mb-6">To My Beautiful Girl</h2>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
              Today is all about celebrating the amazing person you are. You bring so much joy, love, and light into my
              life every single day. I hope your special day is filled with all the happiness you deserve! 💕
            </p>
          </div>
        </div>

        {/* Main Photo Display */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src={photos[currentImageIndex] || "/placeholder.svg"}
                alt="Birthday Girl"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 text-6xl animate-spin">🎂</div>
            <div className="absolute -bottom-4 -left-4 text-6xl animate-bounce">🎈</div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-16">
          <h3 className="text-4xl font-bold text-white text-center mb-8">Beautiful Memories 📸</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer ${
                  index === currentImageIndex ? "ring-4 ring-white scale-105" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={`Memory ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">Memory {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Birthday Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">A Special Message Just For You 💌</h3>
          <div className="text-lg md:text-xl text-blue-50 space-y-4 max-w-4xl mx-auto">
            <p>
              On this special day, I want you to know how grateful I am to have you in my life. Your smile brightens my
              darkest days, your laugh is my favorite sound, and your love makes everything better.
            </p>
            <p>
              You deserve all the happiness in the world, not just today, but every day. I promise to keep making you
              smile and to love you more with each passing year.
            </p>
            <p className="text-2xl font-semibold text-white">
              Happy Birthday, my love! Here's to another year of amazing adventures together! 🥳💙
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-blue-100 text-lg">Made with 💙 just for you</p>
          <div className="flex justify-center space-x-4 mt-4 text-4xl">🎁 🎊 🎈 🎂 🎉 💕</div>
        </div>
      </div>
    </div>
  )
}
