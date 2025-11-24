import React, { useState } from 'react';
import { mockSlots } from '../utils/mockData';

const SlotPicker = ({ onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    if (onSlotSelect) {
      onSlotSelect({ date: selectedDate, slot });
    }
  };

  const getAvailableDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <div>
      <div className="mb-4">
        <h5 className="mb-3">Select Delivery Date</h5>
        <div className="d-flex gap-2 flex-wrap">
          {availableDates.map((date) => (
            <button
              key={date}
              className={`btn ${selectedDate === date ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => handleDateSelect(date)}
            >
              {new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h5 className="mb-3">Select Delivery Time Slot</h5>
          <div className="row">
            {mockSlots.map((slot) => (
              <div key={slot.id} className="col-md-6 mb-2">
                <div
                  className={`card cursor-pointer ${selectedSlot?.id === slot.id ? 'border-success' : ''}`}
                  onClick={() => handleSlotSelect(slot)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body p-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`slot-${slot.id}`}
                        checked={selectedSlot?.id === slot.id}
                        readOnly
                      />
                      <label className="form-check-label" htmlFor={`slot-${slot.id}`}>
                        <strong>{slot.time}</strong> - ₹{slot.charge}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotPicker;
