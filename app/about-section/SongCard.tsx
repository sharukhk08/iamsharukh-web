import { useState } from 'react'
import Image from 'next/image'
import { SongProps } from './songDetails'
import Link from 'next/link'

const SongCard = ({ title, artist, image, initials, link }: SongProps) => {
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={link}
      target="_blank"
      aria-label={`Check out ${title} by ${artist} on Spotify`}
    >
      <div className="group relative flex h-[138px] w-[195px] items-center justify-center overflow-hidden rounded-xl py-0 sm:h-[140px] sm:w-[200px] md:h-[160px] md:w-[250px] lg:h-[190px] lg:w-[270px]">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
            <span className="text-4xl font-bold text-white">{initials}</span>
          </div>
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={`${title} by ${artist}`}
              fill
              className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 195px, (max-width: 1024px) 250px, 270px"
              // Spotify covers are loaded by the browser directly. Going through Next's
              // optimizer logs a server error for every cover Spotify has removed;
              // the onError fallback below already handles those.
              unoptimized
              onError={() => setImageError(true)}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-3 left-5 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
          <p className="text-sm text-white/90">{artist}</p>
          <h4 className="text-xl font-bold text-white">{title}</h4>
        </div>
      </div>
    </Link>
  )
}

export default SongCard
