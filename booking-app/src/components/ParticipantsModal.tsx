import React from 'react'

interface Participant {
  id: string
  name: string
  isOrganizer: boolean
}

interface ParticipantsModalProps {
  isOpen: boolean
  onClose: () => void
  participants: Participant[]
  bookingTime: string
  courtName: string
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ isOpen, onClose, participants, bookingTime, courtName }) => {
  if (!isOpen) return null

  const organizer = participants.find(p => p.isOrganizer)
  const others = participants.filter(p => !p.isOrganizer)

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '28px',
          maxWidth: '480px',
          width: '90%',
          zIndex: 9999,
          boxShadow: '0 20px 25px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9ca3af' }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Participants</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{bookingTime} • {courtName}</div>
        </div>

        {/* Organizer */}
        {organizer && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 6 }}>Organizer</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#0e8fc6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {organizer.name.split(' ').map(s => s.charAt(0)).join('').slice(0,2)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{organizer.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Organizer</div>
              </div>
            </div>
          </div>
        )}

        {/* Other participants */}
        {others.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginBottom: 6 }}>Participants</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {others.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#e5e7eb', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {p.name.split(' ').map(s => s.charAt(0)).join('').slice(0,2)}
                  </div>
                  <div style={{ fontSize: 14, color: '#111827' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 18px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default ParticipantsModal
