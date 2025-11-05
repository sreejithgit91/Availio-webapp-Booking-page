import React, { useState } from 'react'
import ParticipantsModal from './ParticipantsModal'

interface NoCalendarBookingProps {
  onBook: () => void
  bookingBlocked?: boolean
  blockedMessage?: string
  onNavigateToEarliestDate?: () => void
}

const NoCalendarBooking: React.FC<NoCalendarBookingProps> = ({ onBook, bookingBlocked = false, blockedMessage, onNavigateToEarliestDate }) => {
  // State for managing section visibility
  const [showCourtSection, setShowCourtSection] = useState(false)
  const [showConfirmationSection, setShowConfirmationSection] = useState(false)
  const [showAddPlayersSection, setShowAddPlayersSection] = useState(false)
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false)
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<any[]>([])
  const [isAddPlayersOpen, setIsAddPlayersOpen] = useState(false)
  const [playerType, setPlayerType] = useState<'member' | 'guest'>('member')
  const [memberSearch, setMemberSearch] = useState('')
  const [guestName, setGuestName] = useState('')
  const [guestSurname, setGuestSurname] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  
  // State for selections
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card')
  
  // Available options
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30'
  ]
  
  const courts = [
    { id: 'court1', name: 'Court 1', price: 0 },
    { id: 'court2', name: 'Platz 2', price: 0 },
    { id: 'court3', name: 'Court 3', price: 0 }
  ]
  
  // For the no-calendar view, the design shows one option card per court
  // with a single duration of 60 minutes priced at CHF 20.00
  const durations = [
    { minutes: 60, label: '60min', price: 20 }
  ]
  
  const paymentMethods = ['Credit Card', 'PayPal']
  
  // Sample players data
  const samplePlayers = [
    { id: '1', name: 'John Doe', surname: 'Doe', email: 'john.doe@example.com', isOrganizer: true },
    { id: '2', name: 'Jane Smith', surname: 'Smith', email: 'jane.smith@example.com', isOrganizer: false },
    { id: '3', name: 'Mike Johnson', surname: 'Johnson', email: 'mike.johnson@example.com', isOrganizer: false },
    { id: '4', name: 'Sarah Wilson', surname: 'Wilson', email: 'sarah.wilson@example.com', isOrganizer: false },
    { id: '5', name: 'David Brown', surname: 'Brown', email: 'david.brown@example.com', isOrganizer: false },
    { id: '6', name: 'Lisa Davis', surname: 'Davis', email: 'lisa.davis@example.com', isOrganizer: false }
  ]
  
  // Initialize with default organizer
  React.useEffect(() => {
    if (selectedEventParticipants.length === 0) {
      setSelectedEventParticipants([
        {
          id: 'organizer',
          name: 'John',
          surname: 'Doe',
          email: 'john.doe@example.com',
          type: 'member' as const
        }
      ])
    }
  }, [])
  
  // Handle start time selection
  const handleStartTimeSelect = (time: string) => {
    // Always allow time selection; courts will handle blocking/locks
    setSelectedStartTime(time)
    setShowCourtSection(true)
  }
  
  // Handle court and duration selection
  const handleCourtDurationSelect = (court: string, duration: string) => {
    setSelectedCourt(court)
    setSelectedDuration(duration)
    setShowAddPlayersSection(true)
    setShowConfirmationSection(true)
  }
  
  // Calculate total price
  const selectedCourtData = courts.find(c => c.id === selectedCourt)
  const selectedDurationData = durations.find(d => d.minutes.toString() === selectedDuration)
  const basePrice = selectedCourtData ? selectedCourtData.price : 0
  const durationPrice = selectedDurationData ? selectedDurationData.price : 0
  const totalPrice = basePrice + durationPrice
  
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      width: '100%',
      maxWidth: '100%',
      margin: '0',
      padding: '20px'
    },
    section: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333'
    },
    timeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(64px, auto))',
      gap: '8px',
      marginBottom: '20px',
      width: '100%'
    },
    timeButton: {
      padding: '6px 10px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: 1.2,
      transition: 'all 0.2s ease',
      width: 'auto',
      minWidth: '64px',
      height: '36px'
    },
    timeButtonSelected: {
      padding: '6px 10px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: 1.2,
      transition: 'all 0.2s ease',
      width: 'auto',
      minWidth: '64px',
      height: '36px'
    },
    courtList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
      marginBottom: '10px',
      width: '100%'
    },
    courtRow: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-start' as const,
      gap: '8px'
    },
    courtName: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    optionCard: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '60px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      cursor: 'pointer'
    },
    optionCardSelected: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '60px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      boxShadow: '0 6px 14px rgba(14, 143, 198, 0.35)',
      cursor: 'pointer',
      outline: 'none'
    },
    optionPrice: {
      fontSize: '14px',
      fontWeight: 400 as const,
      color: '#111827',
      lineHeight: 1.1,
      marginBottom: '2px'
    },
    optionMinutes: {
      fontSize: '12px',
      color: '#4b5563',
      lineHeight: 1.1
    },
    paymentGrid: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginBottom: '20px',
      width: '100%'
    },
    paymentButton: {
      padding: '10px 14px',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      backgroundColor: '#f3f4f6',
      color: '#111827',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      width: 'auto',
      minHeight: '40px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
    },
    paymentButtonSelected: {
      padding: '10px 14px',
      border: '1px solid #0e78a8',
      borderRadius: '12px',
      backgroundColor: '#0e8fc6',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      width: 'auto',
      minHeight: '40px',
      boxShadow: '0 6px 14px rgba(14, 143, 198, 0.35)'
    },
    summarySection: {
      backgroundColor: '#f8f9fa',
      padding: '25px',
      borderRadius: '8px',
      marginBottom: '20px',
      width: '100%'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      fontSize: '14px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #ddd',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    bookButton: {
      width: 'auto',
      padding: '15px 30px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      minHeight: '50px',
      alignSelf: 'flex-start'
    },
    backButton: {
      padding: '15px 25px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'background-color 0.2s ease',
      width: '100%',
      maxWidth: '200px'
    },

  }

  // Advance booking modal state
  const [isAdvanceBookingModalOpen, setIsAdvanceBookingModalOpen] = useState(false)
  
  // Guest quota modal state
  const [isGuestQuotaModalOpen, setIsGuestQuotaModalOpen] = useState(false)
  
  // Guest quota constants
  const MAX_GUESTS_PER_BOOKING = 3
  
  // Calculate earliest available date (4 days from now)
  const getEarliestAvailableDate = () => {
    const today = new Date()
    const earliestDate = new Date(today.getTime() + (4 * 24 * 60 * 60 * 1000))
    return earliestDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    })
  }
  
  // Handle advance booking modal
  const handleAdvanceBookingModal = () => {
    setIsAdvanceBookingModalOpen(true)
  }
  
  // Handle earliest date selection
  const handleUseEarliestDate = () => {
    // This would need to be implemented to update the parent component's selected date
    // For now, just close the modal
    setIsAdvanceBookingModalOpen(false)
  }

  // Guest management functions
  const handleAddGuest = () => {
    if (guestName.trim() && guestSurname.trim() && guestEmail.trim()) {
      const currentGuestCount = selectedEventParticipants.filter(p => p.type === 'guest').length
      if (currentGuestCount >= MAX_GUESTS_PER_BOOKING) {
        // Open quota modal and do not add
        setIsGuestQuotaModalOpen(true)
        return
      }
      const newGuest = {
        id: Date.now().toString(),
        name: guestName.trim(),
        surname: guestSurname.trim(),
        email: guestEmail.trim(),
        type: 'guest' as const
      }
      setSelectedEventParticipants(prev => [...prev, newGuest])
      // Reset fields and auto-close dialog
      setGuestName('')
      setGuestSurname('')
      setGuestEmail('')
      setIsParticipantsModalOpen(false)
    }
  }

  const handleAddMember = (member: any) => {
    const newMember = {
      id: member.id,
      name: member.name,
      surname: member.surname || '',
      email: member.email || '',
      type: 'member' as const
    }
    setSelectedEventParticipants(prev => [...prev, newMember])
    setMemberSearch('')
  }

  const handleRemoveParticipant = (participantId: string) => {
    setSelectedEventParticipants(prev => prev.filter(p => p.id !== participantId))
  }

  const handleOpenParticipantsModal = () => {
    setIsParticipantsModalOpen(true)
  }

  const handleCloseParticipantsModal = () => {
    setIsParticipantsModalOpen(false)
  }

  // Compute guest quota status
  const guestCount = selectedEventParticipants.filter(p => p.type === 'guest').length;
  const guestQuotaReached = guestCount >= MAX_GUESTS_PER_BOOKING;

  return (
    <div style={styles.container}>

      {/* Section 1: Select Start Time */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Select Start Time</div>
        {/* Remove the global advance-booking banner */}
        {/* {bookingBlocked && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <div 
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#0e8fc6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 6px rgba(14, 143, 198, 0.35)'
              }}
              title={blockedMessage}
            >
              i
            </div>
            <span style={{ fontSize: '13px', color: '#111827', fontWeight: 700 as const }}>{blockedMessage}</span>
          </div>
        )} */}
        <div style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <button
              key={time}
              style={selectedStartTime === time ? styles.timeButtonSelected : styles.timeButton}
              onClick={() => {
                handleStartTimeSelect(time)
              }}
              onMouseEnter={(e) => {
                if (selectedStartTime !== time) {
                  e.currentTarget.style.backgroundColor = '#f8fafc'
                  e.currentTarget.style.borderColor = '#cbd5e1'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedStartTime !== time) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
              }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Select Court and Booking Duration */}
      {showCourtSection && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Select Court and Booking Duration</div>
          <div style={styles.courtList}>
            {courts.map((court) => {
              const isSelected = selectedCourt === court.id && selectedDuration === '60'
              
              return (
                <div key={court.id} style={styles.courtRow}>
                  <div style={{ ...styles.courtName, marginBottom: 0 }}>{court.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                      style={isSelected ? styles.optionCardSelected : styles.optionCard}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCourtDurationSelect(court.id, '60')
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        const btn = e.currentTarget as HTMLButtonElement
                          btn.style.backgroundColor = '#f8fafc'
                          btn.style.borderColor = '#cbd5e1'
                          btn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        const btn = e.currentTarget as HTMLButtonElement
                          btn.style.backgroundColor = '#f3f4f6'
                        btn.style.borderColor = '#e5e7eb'
                          btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                        }
                      }}
                    >
                    <div style={isSelected ? { ...styles.optionPrice, color: '#fff' } : styles.optionPrice}>{`CHF ${(durations[0]?.price ?? 0).toFixed(2)}`}</div>
                    <div style={isSelected ? { ...styles.optionMinutes, color: '#fff' } : styles.optionMinutes}>{durations[0]?.label ?? ''}</div>
                  </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Section 3: Add Players */}
      {showAddPlayersSection && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Add Players
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#6b7280',
              marginTop: '4px'
            }}>
              {selectedEventParticipants.filter(p => p.type === 'guest').length} of {MAX_GUESTS_PER_BOOKING} guests added
            </div>
          </div>
          
          {/* Banner for guest quota limit on booking screen */}
          {guestQuotaReached && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '16px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '8px',
              border: '1px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '14px', color: '#92400e', fontWeight: 600 as const }}>
                Your Guest limit reached for the day. Will get reset tomorrow.
              </span>
              <span style={{ color: '#92400e' }}>•</span>
              <button
                onClick={() => alert('Navigate to View bookings')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#92400e',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 600 as const
                }}
              >
                View bookings
              </button>
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Current Players</div>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {/* Display actual participants from state */}
              {selectedEventParticipants.map((participant) => (
                <div key={participant.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: participant.type === 'member' ? '#0e8fc6' : '#10b981',
                      border: '2px solid #e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '60px' }}>
                    <div style={{ fontWeight: '500', color: '#111827' }}>
                      {participant.name} {participant.surname}
                    </div>
                    <div style={{ 
                      fontSize: '10px', 
                      color: participant.type === 'member' ? '#0e8fc6' : '#10b981', 
                      fontWeight: '500' 
                    }}>
                      {participant.type === 'member' ? 'Member' : 'Guest'}
                    </div>
                  </div>
                  <button
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#dc3545',
                      border: '2px solid white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={`Remove ${participant.name}`}
                    title={`Remove ${participant.name}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveParticipant(participant.id)
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#c82333'
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc3545'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    ✖
                  </button>
                </div>
              ))}
              
              {/* Add User Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <button
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: guestQuotaReached ? '2px dashed #e5e7eb' : '2px dashed #cbd5e1',
                    background: guestQuotaReached ? '#f3f4f6' : '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: guestQuotaReached ? 'not-allowed' : 'pointer',
                    color: guestQuotaReached ? '#9ca3af' : '#64748b',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (guestQuotaReached) return
                    e.currentTarget.style.borderColor = '#0e8fc6'
                    e.currentTarget.style.background = '#eff6ff'
                    e.currentTarget.style.color = '#0e8fc6'
                  }}
                  onMouseLeave={(e) => {
                    if (guestQuotaReached) return
                    e.currentTarget.style.borderColor = '#cbd5e1'
                    e.currentTarget.style.background = '#f8fafc'
                    e.currentTarget.style.color = '#64748b'
                  }}
                  onClick={() => { if (!guestQuotaReached) handleOpenParticipantsModal() }}
                  aria-label="Add new player"
                  title="Add new player"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '60px', color: '#64748b' }}>
                  Add User
                </div>
              </div>
            </div>
          </div>
          
          {/* Continue to Payment button removed – payment section loads automatically */}
        </div>
      )}

      {/* Section 4: Booking Details, Price and Confirm */}
      {showConfirmationSection && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Booking Details, Price and Confirm</div>
          
          {/* Payment Method Selection */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Payment Method</div>
            <div style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  style={selectedPaymentMethod === method ? styles.paymentButtonSelected : styles.paymentButton}
                  onClick={() => setSelectedPaymentMethod(method)}
                  onMouseEnter={(e) => {
                    if (selectedPaymentMethod !== method) {
                      e.currentTarget.style.backgroundColor = '#f8fafc'
                      e.currentTarget.style.borderColor = '#cbd5e1'
                      ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPaymentMethod !== method) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                      ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'
                    }
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div style={styles.summarySection}>
            <div style={styles.summaryRow}>
              <span>Court Fee:</span>
              <span>{basePrice} CHF</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Duration Fee:</span>
              <span>{durationPrice} CHF</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total:</span>
              <span>{totalPrice} CHF</span>
            </div>
          </div>

          {/* Book Button */}
          <button
            style={styles.bookButton}
            onClick={onBook}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Confirm Booking
          </button>
        </div>
      )}

      {/* Add Players Modal */}
      {isParticipantsModalOpen && (
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
              zIndex: 10000
            }}
            onClick={handleCloseParticipantsModal}
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
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 10001,
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
                Add Players
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
                Add members or guests to your booking
              </p>
    </div>

            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <button
                onClick={() => setPlayerType('member')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: playerType === 'member' ? '#0e8fc6' : '#9ca3af',
                  borderBottom: playerType === 'member' ? '2px solid #0e8fc6' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Members
              </button>
              <button
                onClick={() => setPlayerType('guest')}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  background: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: playerType === 'guest' ? '#0e8fc6' : '#9ca3af',
                  borderBottom: playerType === 'guest' ? '2px solid #0e8fc6' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Guests
              </button>
            </div>

            {/* Member Tab */}
            {playerType === 'member' && (
              <div style={{ position: 'relative' }}>
                <div style={{ marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>
                {/* Autocomplete dropdown */}
                {memberSearch.trim() !== '' && (
                  <div style={{
                    position: 'absolute',
                    top: '56px',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                    zIndex: 10002,
                    maxHeight: '220px',
                    overflowY: 'auto'
                  }}>
                    {samplePlayers
                      .filter(player => player.name.toLowerCase().includes(memberSearch.toLowerCase()))
                      .map(player => (
                        <button
                          key={player.id}
                          onClick={() => { handleAddMember(player); setIsParticipantsModalOpen(false); setMemberSearch('') }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                            padding: '10px 14px', background: 'white', border: 'none', cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f9ff' }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white' }}
                        >
                          <div style={{ width: '28px', height: '28px', backgroundColor: '#0e8fc6', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600 as const }}>
                            {player.name.charAt(0)}
                          </div>
                          <span style={{ fontSize: '15px', color: '#374151' }}>{player.name}</span>
                        </button>
                      ))}
                    {samplePlayers.filter(p => p.name.toLowerCase().includes(memberSearch.toLowerCase())).length === 0 && (
                      <div style={{ padding: '10px 14px', color: '#6b7280', fontSize: '14px' }}>No matches</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Guest Tab */}
            {playerType === 'guest' && (
              <div>
                {/* Quota banner inside dialog when limit reached */}
                {guestQuotaReached && (
                  <div style={{ 
                    marginBottom: '12px',
                    padding: '12px 14px',
                    backgroundColor: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 as const, color: '#92400e' }}>
                      You have reached your guest limit for the day. Will reset tomorrow.
                    </div>
                    <button
                      onClick={() => alert('Navigate to View Bookings')}
                      style={{
                        marginTop: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#92400e',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontWeight: 600 as const
                      }}
                    >
                      View Bookings
                    </button>
                  </div>
                )}

                {/* Guest Form - only keep manual details; disable when quota reached */}
                <div style={{ 
                  opacity: guestQuotaReached ? 0.5 : 1,
                  pointerEvents: guestQuotaReached ? 'none' : 'auto'
                }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={guestSurname}
                    onChange={(e) => setGuestSurname(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                  
                  <button
                    onClick={handleAddGuest}
                    disabled={!guestName.trim() || !guestSurname.trim() || !guestEmail.trim() || guestQuotaReached}
                    style={{
                      width: '100%',
                      padding: '12px 24px',
                      backgroundColor: guestQuotaReached ? '#9ca3af' : '#0e8fc6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: guestQuotaReached ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease',
                      marginTop: '12px'
                    }}
                    onMouseEnter={(e) => {
                      if (!guestQuotaReached && guestName.trim() && guestSurname.trim() && guestEmail.trim()) {
                        e.currentTarget.style.backgroundColor = '#0d7bb8'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!guestQuotaReached && guestName.trim() && guestSurname.trim() && guestEmail.trim()) {
                        e.currentTarget.style.backgroundColor = '#0e8fc6'
                      }
                    }}
                  >
                    {guestQuotaReached ? 'Guest Quota Reached' : 'Add Guest'}
                  </button>
                </div>
              </div>
            )}

            {/* Current Participants list removed from dialog */}

            {/* Close Button */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={handleCloseParticipantsModal}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b7280'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Advance Booking Modal */}
      {isAdvanceBookingModalOpen && (
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
            onClick={() => setIsAdvanceBookingModalOpen(false)}
          />
          
          {/* Modal Dialog */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              zIndex: 9999,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsAdvanceBookingModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#9ca3af',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.color = '#6b7280'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#9ca3af'
              }}
            >
              ✕
            </button>
            
            {/* Title */}
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#111827',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Advance booking
            </div>
            
            {/* Content */}
            <div style={{ 
              fontSize: '16px', 
              color: '#6b7280',
              lineHeight: '1.5',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '8px' }}>
                You can book this court up to 4 days in advance.
              </div>
            </div>
            
            {/* Primary Button removed per requirement */}
          </div>
        </>
      )}
      
      {/* Guest Quota Modal */}
      {isGuestQuotaModalOpen && (
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
              zIndex: 10000
            }}
            onClick={() => setIsGuestQuotaModalOpen(false)}
          />
          
          {/* Modal Dialog */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              zIndex: 10001,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={() => setIsGuestQuotaModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#9ca3af',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.color = '#6b7280'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#9ca3af'
              }}
            >
              ✕
            </button>
            
            {/* Title */}
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#111827',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Guest Quota Limit
            </div>
            
            {/* Content */}
            <div style={{ 
              fontSize: '16px', 
              color: '#6b7280',
              lineHeight: '1.5',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '8px' }}>
                You have reached your quota limit for adding guests.
              </div>
              <div>
                Maximum {MAX_GUESTS_PER_BOOKING} guests allowed per booking.
              </div>
            </div>
            
            {/* Primary Button */}
            <button
              onClick={() => setIsGuestQuotaModalOpen(false)}
              style={{
                width: '100%',
                backgroundColor: '#0e8fc6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0d7bb8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0e8fc6'
              }}
            >
              Understood
            </button>
          </div>
        </>
      )}

      {/* Add Players Modal */}
    </div>
  )
}

export default NoCalendarBooking
