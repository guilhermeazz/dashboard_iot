export const getCorrelation = (data1, data2) => {
    const n = data1.length;
    const [sum1, sum2, sum1Sq, sum2Sq, pSum] = data1.reduce(
        ([sum1, sum2, sum1Sq, sum2Sq, pSum], x, i) => [
            sum1 + x,
            sum2 + data2[i],
            sum1Sq + x * x,
            sum2Sq + data2[i] * data2[i],
            pSum + x * data2[i],
        ],
        [0, 0, 0, 0, 0]
    );

    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - (sum1 * sum1 / n)) * (sum2Sq - (sum2 * sum2 / n)));
    return den === 0 ? 0 : num / den;
};
