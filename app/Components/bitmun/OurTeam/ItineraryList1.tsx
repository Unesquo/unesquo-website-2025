import React from 'react';


interface ItineraryItem {
  time: string;
  activity: string;
}

interface ItineraryList1Props {
  itinerary1Data: ItineraryItem[];
}
const itineraryContainer1Style: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '30px',
    fontFamily: 'Serif',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };
  
  const itineraryList1Style: React.CSSProperties = {
    listStyleType: 'inherit',
    padding: 0,
  };
  
  const itineraryItem1Style: React.CSSProperties = {
    marginBottom: '8px',
  };
  


  const ItineraryList1: React.FC<ItineraryList1Props> = ({ itinerary1Data }) => {
    return (
      <div style={itineraryContainer1Style}>
        <h2>Itinerary</h2>
        <ul style={itineraryList1Style}>
          {itinerary1Data.map((item, index) => (
            <li key={index} style={itineraryItem1Style}>
              <strong>{item.time}</strong>: {item.activity}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ItineraryList1;