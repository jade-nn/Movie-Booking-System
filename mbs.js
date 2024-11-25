import React from 'react'
import { useState } from 'react'
import { Search, Film, Clock, User, Key, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MovieBookingApp = () => {
  const [currentPage, setCurrentPage] = useState('login')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState(null)
  const [selectedCity, setSelectedCity] = useState('new-york')
  const [selectedSeats, setSelectedSeats] = useState([])

  const cities = [
    { id: 'new-york', name: 'New York' },
    { id: 'los-angeles', name: 'Los Angeles' },
    { id: 'chicago', name: 'Chicago' },
    { id: 'houston', name: 'Houston' }
  ]

  const moviesByCity = {
    'new-york': {
      nowShowing: [
        {
          id: 1,
          title: "The Dark Knight",
          image: "/api/placeholder/300/450",
          rating: "PG-13",
          duration: "2h 32min",
          showtimes: ["10:00 AM", "1:30 PM", "4:00 PM", "7:30 PM"]
        },
        {
          id: 2,
          title: "Inception",
          image: "/api/placeholder/300/450",
          rating: "PG-13",
          duration: "2h 28min",
          showtimes: ["11:00 AM", "2:30 PM", "5:00 PM", "8:30 PM"]
        }
      ],
      comingSoon: [
        {
          id: 5,
          title: "Dune: Part Two",
          image: "/api/placeholder/300/450",
          rating: "PG-13",
          duration: "2h 45min",
          releaseDate: "March 1, 2024"
        },
        {
          id: 6,
          title: "The Batman 2",
          image: "/api/placeholder/300/450",
          rating: "PG-13",
          duration: "2h 30min",
          releaseDate: "March 15, 2024"
        }
      ]
    },
    'los-angeles': {
      nowShowing: [
        {
          id: 7,
          title: "Pulp Fiction",
          image: "/api/placeholder/300/450",
          rating: "R",
          duration: "2h 34min",
          showtimes: ["11:00 AM", "2:30 PM", "6:00 PM"]
        }
      ],
      comingSoon: [
        {
          id: 8,
          title: "Blade Runner 2049",
          image: "/api/placeholder/300/450",
          rating: "R",
          duration: "2h 44min",
          releaseDate: "April 1, 2024"
        }
      ]
    }
  }

  const renderLoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to MovieTime</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="login" className="w-1/2">Login</TabsTrigger>
              <TabsTrigger value="signup" className="w-1/2">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Email" type="email" className="pl-10" />
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Password" type="password" className="pl-10" />
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage('home')
                  }}
                >
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form className="space-y-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Password" type="password" />
                <Input placeholder="Confirm Password" type="password" />
                <Button className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  const renderHomePage = () => {
    const cityMovies = moviesByCity[selectedCity] || moviesByCity['new-york']

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={selectedCity}
              onValueChange={setSelectedCity}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search movies..." className="pl-10" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Now Showing</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {cityMovies.nowShowing.map(movie => (
                  <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => {
                        setSelectedMovie(movie)
                        setCurrentPage('movie')
                      }}
                    >
                      <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{movie.rating}</span>
                          <span>•</span>
                          <span>{movie.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {cityMovies.comingSoon.map(movie => (
                  <CarouselItem key={movie.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                      <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{movie.rating}</span>
                          <span>•</span>
                          <span>{movie.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Release Date: {movie.releaseDate}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    )
  }

  const renderMovieDetailPage = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => setCurrentPage('home')}
        >
          ← Back to Movies
        </Button>
        
        <Card>
          <div className="md:flex">
            <img 
              src={selectedMovie?.image} 
              alt={selectedMovie?.title} 
              className="w-full md:w-1/3 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedMovie?.title}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <span>{selectedMovie?.rating}</span>
                <span>•</span>
                <span>{selectedMovie?.duration}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-4">Showtimes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedMovie?.showtimes?.map(time => (
                  <Button 
                    key={time} 
                    variant="outline"
                    onClick={() => {
                      setSelectedShowtime(time)
                      setCurrentPage('seats')
                    }}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderSeatSelectionPage = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F']
    const seatsPerRow = 8
    
    const toggleSeat = (seat) => {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seat))
      } else {
        setSelectedSeats([...selectedSeats, seat])
      }
    }

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setCurrentPage('movie')}
          >
            ← Back to Movie
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Select Seats</CardTitle>
              <p className="text-gray-600">
                {selectedMovie?.title} - {selectedShowtime}
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="w-full h-4 bg-gray-300 mb-8 rounded-lg" />
                
                <div className="grid gap-4">
                  {rows.map(row => (
                    <div key={row} className="flex justify-center gap-2">
                      <span className="w-6 text-center">{row}</span>
                      {[...Array(seatsPerRow)].map((_, index) => {
                        const seatNumber = `${row}${index + 1}`
                        return (
                          <Button
                            key={seatNumber}
                            variant={selectedSeats.includes(seatNumber) ? "default" : "outline"}
                            className="w-8 h-8 p-0"
                            onClick={() => toggleSeat(seatNumber)}
                          >
                            {index + 1}
                          </Button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Selected Seats: {selectedSeats.join(', ')}</p>
                  <p className="text-sm text-gray-600">Total: ${selectedSeats.length * 12}</p>
                </div>
                <Button disabled={selectedSeats.length === 0}>
                  Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  switch (currentPage) {
    case 'login':
      return renderLoginPage()
    case 'home':
      return renderHomePage()
    case 'movie':
      return renderMovieDetailPage()
    case 'seats':
      return renderSeatSelectionPage()
    default:
      return renderLoginPage()
  }
}

export default MovieBookingApp