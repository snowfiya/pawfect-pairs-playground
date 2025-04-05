
// Dog card data for our memory game
const dogBreeds = [
  {
    breed: "Beagle",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Corgi",
    image: "https://images.unsplash.com/photo-1554456854-55a089fd4cb2?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Dachshund",
    image: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Pug",
    image: "https://images.unsplash.com/photo-1553698217-934b000f1f00?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Husky",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Labrador",
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "German Shepherd",
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Poodle",
    image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Bulldog",
    image: "https://images.unsplash.com/photo-1583511655826-05700442399e?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Shiba Inu",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=200&h=200"
  },
  {
    breed: "Border Collie",
    image: "https://images.unsplash.com/photo-1553882809-a4f57e59501d?auto=format&fit=crop&w=200&h=200"
  }
];

// Game difficulty settings
const difficultySettings = {
  easy: {
    gridSize: 4, // 2x2
    timeLimit: 60, // 1 minute
    cardCount: 4, // 2 pairs
    pointsPerMatch: 50
  },
  medium: {
    gridSize: 12, // 4x3
    timeLimit: 90, // 1.5 minutes
    cardCount: 12, // 6 pairs
    pointsPerMatch: 75
  },
  hard: {
    gridSize: 20, // 5x4
    timeLimit: 120, // 2 minutes
    cardCount: 20, // 10 pairs
    pointsPerMatch: 100
  }
};

// Get random dog breeds for the game based on difficulty
function getRandomDogs(count) {
  const shuffled = [...dogBreeds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count / 2);
}
