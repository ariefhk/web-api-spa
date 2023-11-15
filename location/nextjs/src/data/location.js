export const absenLocationCoordinate = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                latitude: -7.406523077199722,
                longitude: 109.24753248839191,
            });
        }, 5000);
    });
};
