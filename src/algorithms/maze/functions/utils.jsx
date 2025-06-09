export const getRandomOdd = (limit) => {
    const odd = [];
    for (let i = 1; i < limit; i += 2) odd.push(i);
    return odd[Math.floor(Math.random() * odd.length)];
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const cloneGrid = (grid) => grid.map((row) => row.map((cell) => [...cell]));

export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};