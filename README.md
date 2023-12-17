# Advent of Code 2023 🔔🎅🎁🎄
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

My first go at Advent of Code!

Notes below relate to the things I learned and the problems I had.

#### Day 1
⭐ My regular expression struggled with "twone", which made me laugh once I eventually realised that was the problem!\
⭐ It matched "two" and then only "ne" was left so "one" got ignored 😥\
⭐ Fixed by re-setting lastIndex after each match

#### Day 2
⭐ More regular expressions 🧙\
⭐ I liked being able to re-use my findMaxValue() function in puzzle 2

#### Day 3
⭐ Regular expressions saved me yet again, this time from "undefined"!\
⭐ My first time trying to solve a puzzle in a 2D array

#### Day 4
⭐ Year of the regex! I have found https://regex101.com/ very useful

#### Day 5
⭐ Today I learned to read instructions properly rather than just making assumptions...!\
⭐ Starting to feel quite challenging, I hope to persevere with at least the Part 1s for as long as possible

#### Day 6
⭐ Phew! Today felt quite manageable and less brute force-y than yesterday thanks to some maths 😎\
⭐ It's fun to think about a more efficient way to solve a problem

#### Day 7
⭐ Not too proud of today's extremely messy code\
⭐ However I used a custom sort function for the first time which was fun to figure out!

#### Day 8
⭐ More maths! I looked up a function to calculate LCM for several numbers at once.\
⭐ I feel bad for the ghost who has to take ~10^13 steps to get where they're going...

#### Day 9
⭐ I liked this puzzle, working with sequences is fun for me for some reason\
⭐ Maybe I'll regret saying that soon!

#### Day 10
⭐ I find 2D array puzzles really tricky, so I'm glad to be able to practice them!\
⭐ AoC subreddit helped me think of a way to solve part 2 involving parity of vertical sections of pipe

#### Day 11
⭐ Another 2D array puzzle, more practice for me\
⭐ Tried to brute force at first, got my first ever 'out of memory' error\
⭐ Figured out I could modify the coordinates by adding 999999 instead of trying to iterate through a 2D array with millions of rows and columns... !

#### Day 12
⭐ I'm already missing the 2D array puzzles 😂\
⭐ I used loads of help for today\
⭐ I learned about memoization and keeping a cache of calculations that had already been done\
⭐ and about recursion, which I used to follow all the possible "branches"

#### Day 13
⭐ My wish granted so quickly, another 2D array puzzle... with transposition!\
⭐ I think I might actually enjoy these now\
⭐ Used two counters to increment "up" and "down" (makes less sense for the transposed version) from the curent index and check for equality

#### Day 14
⭐ I definitely feel 1000000000x more confident with 2D arrays now\
⭐ Today was a bit frustrating and I tripped up a few times because of array indexing!

#### Day 15
⭐ I liked today, pretty straightforward parsing the input then making a hashmap (just an object in JS) for calculations