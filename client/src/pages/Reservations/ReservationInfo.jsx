export default function ReservationInfo({reservation}) {
    function formatDateString(dateString) {
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric'
        };
      
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
      }
      
      function formatTimeRange(start, end) {
        const formattedStart = formatDateString(start);
        const formattedEnd = formatDateString(end);
      
        const startTime = formattedStart.split(', ')[1];
        const endTime = formattedEnd.split(', ')[1];
      
        return `${formattedStart.split(', ')[0]}, ${startTime} to ${endTime}`;
      }
      
      const formattedTimeRange = formatTimeRange(reservation.start, reservation.end);
      console.log(formattedTimeRange); // Output: 11/15/23, 5:00 PM to 6:00 PM
      
  return (
    <div className="resrevationTile bg-tblue w-full max-w-4xl p-4 rounded-xl text-white">
        <h2>{reservation.address}</h2>
        <p>{reservation.description}</p>
        <span className="mr-6">Rs. {reservation.cost}</span><span>{reservation.status}</span>
        <p>{formattedTimeRange}</p>
    </div>
  )
}