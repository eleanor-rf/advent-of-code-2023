// parsing
const inputSplit = input.split('\n').filter(n=>n);
const seedList = inputSplit[0].split(': ')[1].split(' ')
const numberOfSeeds = seedList.length;

function getMaps(input, startValue, endValue) {
    const startIndex = input.indexOf(startValue);
    const endIndex = endValue === -1 ? input.length : input.indexOf(endValue);

    const map = input.slice(startIndex + 1, endIndex);
    for (let i = 0; i < map.length; i++){
        map[i] = map[i].split(' ');
    }
    return map;
}

const seedToSoilMap = getMaps(inputSplit,'seed-to-soil map:', 'soil-to-fertilizer map:');
const soilToFertilizerMap = getMaps(inputSplit,'soil-to-fertilizer map:', 'fertilizer-to-water map:');
const fertilizerToWaterMap = getMaps(inputSplit,'fertilizer-to-water map:', 'water-to-light map:');
const waterToLightMap = getMaps(inputSplit,'water-to-light map:', 'light-to-temperature map:');
const lightToTemperatureMap = getMaps(inputSplit,'light-to-temperature map:', 'temperature-to-humidity map:');
const temperatureToHumidityMap = getMaps(inputSplit,'temperature-to-humidity map:', 'humidity-to-location map:');
const humidityToLocationMap = getMaps(inputSplit,'humidity-to-location map:',-1);

ranges = [seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap]

// convert all strings in nested array to numbers
function conv(arr) {
  return arr.map(function(v) {
    return Array.isArray(v) ? conv(v) : Number(v) || 0;
  })
}

//parsing over!

//search through array of ranges
function findLocations(seed, input) {
    // input should = 'conv(ranges)'
    let current = seed;
    for (let i = 0; i < input.length; i ++){
        for (let j = 0; j < input[i].length; j++) {
            let maxSeed = input[i][j][1] + input[i][j][2];
            let minSeed = input[i][j][1]
            if (current >= minSeed && current <= maxSeed) {
                current = input[i][j][0] + (current - minSeed);
                break;
            }
        }
    }
    return current;
}

// call findLocations on each seed
let locations = [];
for (const seed of seedList) {
    locations.push(findLocations(seed,conv(ranges)));
}

console.log((`For Part 1, the smallest location is ${Math.min(...locations)}`));