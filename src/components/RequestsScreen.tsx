import { useState } from "react";
import { RequestCard } from "./RequestCard";
import { RequestDetailModal } from "./RequestDetailModal";
import { ArrowLeft } from "lucide-react";

interface Request {
  id: string;
  friendName: string;
  friendAvatar?: string;
  date: string;
  time: string;
  energyLevel: "High Energy" | "Low Energy" | "Virtual";
  message?: string;
}

// Mock data - replace with real data
const mockRequests: Request[] = [
  {
    id: "1",
    friendName: "Kelly Martinez",
    date: "2025-11-22",
    time: "8:00 PM",
    energyLevel: "High Energy",
    message: "Want to check out that new arcade bar?"
  },
  {
    id: "2",
    friendName: "Jordan Lee",
    date: "2025-11-21",
    time: "2:00 PM",
    energyLevel: "Low Energy",
    message: "Coffee and catch up?"
  },
  {
    id: "3",
    friendName: "Sam Patel",
    date: "2025-11-23",
    time: "7:30 PM",
    energyLevel: "Virtual",
    message: "Game night on Discord!"
  }
];

export function RequestsScreen() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleAccept = (id: string) => {
    // Remove request from list and show confirmation
    setRequests(requests.filter(req => req.id !== id));
    // In real app: API call to accept, move to Plans screen
  };

  const handleDecline = (id: string) => {
    // Remove request from list
    setRequests(requests.filter(req => req.id !== id));
    // In real app: API call to decline
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A1628] border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <button 
            className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-white">Requests</h1>
            <p className="text-white/60 text-sm">
              {requests.length === 0 
                ? "No pending requests" 
                : `${requests.length} ${requests.length === 1 ? 'request' : 'requests'} to review`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {requests.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            <div className="w-20 h-20 rounded-full bg-[#E8B8FE]/10 flex items-center justify-center mb-4">
              <svg 
                className="w-10 h-10 text-[#E8B8FE]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h2 className="text-white mb-2">No requests yet</h2>
            <p className="text-white/60 max-w-sm">
              When friends send you hangout requests, they'll appear here for you to accept or decline.
            </p>
          </div>
        ) : (
          // Request Cards
          <div className="space-y-3">
            {requests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccept={() => handleAccept(selectedRequest.id)}
          onDecline={() => handleDecline(selectedRequest.id)}
        />
      )}
    </div>
  );
}
