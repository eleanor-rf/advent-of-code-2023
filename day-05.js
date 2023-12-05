// parsing
const inputSplit = input.split('\n').filter(n=>n);
const seedList = inputSplit[0].split(': ')[1].split(' ');;
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

const parsedRanges = [seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap]

// convert all strings in nested array to numbers
function conv(arr) {
  return arr.map(function(v) {
    return Array.isArray(v) ? conv(v) : Number(v) || 0;
  });
}

ranges = conv(parsedRanges)
//parsing over!

//search through array of ranges
function findLocationFromSeed(seed) {
    // input should = 'ranges'
    let current = seed;
    for (let i = 0; i < ranges.length; i ++){
        for (let j = 0; j < ranges[i].length; j++) {
            let maxSeed = ranges[i][j][1] + ranges[i][j][2];
            let minSeed = ranges[i][j][1];
            if (current >= minSeed && current <= maxSeed) {
                current = ranges[i][j][0] + (current - minSeed);
                break;
            }
        }
    }
    return current;
}

// call findLocationFromSeed on each seed
let locations = [];
for (const seed of seedList) {
    locations.push(findLocationFromSeed(seed));
}

//console.log((`For Part 1, the smallest location is ${Math.min(...locations)}`));

// part 2 - finding seeds from their location
function findSeedFromLocation(location){
    let seed = location;
    for (let i = (ranges.length - 1); i > -1; i--) {
        for (let j = 0; j < ranges[i].length; j++) {
            let maxSource = ranges[i][j][0] + (ranges[i][j][2] - 1); // note to self: read the instructions next time
            // ranges[i][j][2] contained range LENGTH
            // unclear why this didn't cause trouble on problem 1
            let minSource = ranges[i][j][0];
            if (seed <= maxSource && seed >= minSource) {
                seed = ranges[i][j][1] + (seed - minSource);
                break;
            }
        }
    }
    return seed;
}

// create array of objects with minimum and maximum values in each seed range
let seedListToInts = conv(seedList)
let seedRanges = [];
for (let i = 0; i < seedListToInts.length; i+=2) {
    seedRanges.push({
        min: seedListToInts[i],
        max: seedListToInts[i]+seedListToInts[i+1]-1
    })
}
seedRanges.sort((a, b) => a.min - b.min); // possibly not necessary

// check if seed is within each range in seedRanges
function isSeedInRange(seed) {
     for (const range of seedRanges) {
        if (seed >= range.min && seed <= range.max) {
            return true;
        }
    }
  return false; 
}

// search at decreasing intervals
// MUCH faster than the brute forcing i was trying before
function findLowestLocation() {
    let interval = 10000000
    let lowestLocation = 0
    while (interval > 1) {
    for (let i = 0; ; i+=interval) {
        const seed = findSeedFromLocation(i)
        if (isSeedInRange(seed)){
            interval /= 10;
            i -= interval;
            lowestLocation = i;
            break;
            }
        }
    }
    return `For Part 2, the lowest location is ${lowestLocation}`;
}


console.log(findLowestLocation());