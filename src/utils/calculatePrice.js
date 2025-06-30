export function growthMutation(selectedGrowth){
    let gM = 0;

    if (selectedGrowth.ripe) gM += 1;
    if (selectedGrowth.gold) gM += 20;
    if (selectedGrowth.rainbow) gM += 50;

    if (gM === 0) {
        return gM+1;
    } else {
        return gM;
    }
}

export function calculateSelectedMutations(selectedEnv, selectedBurn, selectedSun, selectedEnvMutations, selectedLimitedMutations){
    const envValues = {
        windstruck: 2,
        moonlit: 2,
        choc: 3,
        bloodlit: 4,
        twisted: 5,
        drenched: 5,
        aurora: 90,
        shocked: 100,
        celestial: 120
    };

    const limitedValues = {
        pollinated: 3,
        cloudtouched: 5,
        honeyglazed: 5,
        plasma: 5,
        heavenly: 5,
        fried: 8,
        zombified: 25,
        molten: 25,
        paradisal: 100,
        alienlike: 100,
        galactic: 120,
        disco: 125,
        voidtouched: 135
    };

    let totalM = 0;

    if (selectedEnv.chilled) totalM += 2;
    if (selectedEnv.wet) totalM += 2;
    if (selectedEnv.frozen) totalM += 10;

    if (selectedBurn.burnt) totalM += 4;
    if (selectedBurn.cooked) totalM += 25;
    if (selectedSun.verdant) totalM += 4;
    if (selectedSun.sundried) totalM += 85;

    selectedEnvMutations.forEach(mutation => {
        totalM += (envValues[mutation.toLowerCase()] || 0);
    });

    selectedLimitedMutations.forEach(mutation => {
        totalM += (limitedValues[mutation.toLowerCase()] || 0);
    });

    return totalM;
}

export function calculatePrice(fConst, c, weight, growth, mutationSum, numOfMut, minValWeight) {
    if (weight <= minValWeight) {
        // Masa poniżej lub równa progowi - cena minimalna
        return c * growth * (1 + mutationSum - numOfMut);
    } else {
        // Masa powyżej progu - liczymy z przesunięciem masy^2 o próg^2
        const adjustedMassSquared = Math.pow(weight, 2) - Math.pow(minValWeight, 2);
        return ((fConst * adjustedMassSquared) + c) * growth * (1 + mutationSum - numOfMut);
    }
}