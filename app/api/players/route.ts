import { NextResponse } from "next/server"

// Mock database - updated with local image paths
const players = [
  {
    id: 1,
    name: "Reggie Jackson",
    team: "New York Yankees",
    position: "Right Field",
    years_active: "1967-1987",
    decade: "Both",
    image_url: "/images/players/reggie-jackson.png",
    description: 'Known as "Mr. October" for his clutch postseason performances',
    stats: { home_runs: 563, rbi: 1702, batting_average: 0.262 },
  },
  {
    id: 2,
    name: "Pete Rose",
    team: "Cincinnati Reds",
    position: "First Base",
    years_active: "1963-1986",
    decade: "Both",
    image_url: "/images/players/pete-rose.png",
    description: "All-time hits leader and key member of the Big Red Machine",
    stats: { hits: 4256, games: 3562, batting_average: 0.303 },
  },
  {
    id: 3,
    name: "Nolan Ryan",
    team: "California Angels",
    position: "Pitcher",
    years_active: "1966-1993",
    decade: "Both",
    image_url: "/images/players/nolan-ryan.png",
    description: "Hall of Fame pitcher known for his blazing fastball and no-hitters",
    stats: { strikeouts: 5714, no_hitters: 7, era: 3.19 },
  },
  // Additional players would be loaded from the database here
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const decade = searchParams.get("decade")
  const position = searchParams.get("position")
  const search = searchParams.get("search")

  let filteredPlayers = players

  if (decade && decade !== "all") {
    filteredPlayers = filteredPlayers.filter((player) => player.decade === decade || player.decade === "Both")
  }

  if (position && position !== "all") {
    filteredPlayers = filteredPlayers.filter((player) => player.position === position)
  }

  if (search) {
    filteredPlayers = filteredPlayers.filter(
      (player) =>
        player.name.toLowerCase().includes(search.toLowerCase()) ||
        player.team.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json(filteredPlayers)
}

export async function POST(request: Request) {
  const body = await request.json()

  // In a real app, you would insert into your database here
  const newPlayer = {
    id: players.length + 1,
    ...body,
    created_at: new Date().toISOString(),
  }

  players.push(newPlayer)

  return NextResponse.json(newPlayer, { status: 201 })
}
