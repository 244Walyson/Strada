export interface RideHistoryInterface {
<<<<<<< HEAD
    id: string; // Changed to string to match API
    driver_id?: string; // Optional, only for passenger view
    date: string;
    time: string;
    type: "passenger" | "driver";
    status: "completed" | "cancelled" | "active" | "pending" | "accepted"; // Added 'active', 'pending', 'accepted'
=======
    id: number;
    date: string;
    time: string;
    type: "driver" | "passenger";
    status: "completed" | "cancelled" | "ongoing";
>>>>>>> 7882329 (funcional 1)
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    price: string;
<<<<<<< HEAD
    cancellationReason?: string;
  }
=======
    participants: ParticipantsInterface[];
    cancellationReason?: string;
}
>>>>>>> 7882329 (funcional 1)

export interface ParticipantsInterface {
    name: string;
    rating: number;
    photo: string;
    role: "passenger" | "driver";
}