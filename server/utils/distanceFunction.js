function calculateDistance(lat1, lon1, lat2, lon2) {
    // The radius of the Earth in kilometers
    const R = 6371; 

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = lat1 * (Math.PI / 180)
    const lon1Rad = lon1 * (Math.PI / 180)
    const lat2Rad = lat2 * (Math.PI / 180)
    const lon2Rad = lon2 * (Math.PI / 180)

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distance = R * c;
    
    return distance;
}

module.exports = calculateDistance

// // Example usage:
// const distance = calculateDistance(52.5200, 13.4050, 48.8566, 2.3522); // Berlin to Paris
// console.log(`Distance: ${distance.toFixed(2)} kilometers`);
