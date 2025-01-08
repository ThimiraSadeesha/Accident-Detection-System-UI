export interface StatusOption {
    value: string;
    label: string;
}

export const PI_STATUS_OPTIONS: StatusOption[] = [
    { value: '', label: 'Unavailable' },
    { value: 'received', label: 'Received' },
    { value: 'not_received', label: 'Not Received' },
    { value: 'rejected', label: 'Rejected' }
];

export const PO_STATUS_OPTIONS: StatusOption[] = [
    { value: '', label: 'Unavailable' },
    { value: 'sent', label: 'Sent' },
    { value: 'processing', label: 'Processing' }
];

export const PAYMENT_STATUS_OPTIONS: StatusOption[] = [
    { value: '', label: 'Unavailable' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'credit', label: 'Credit' }
];

export const SHIPMENT_OPTIONS: StatusOption[] = [
    { value: 'sea', label: 'Sea' },
    { value: 'air', label: 'Air' },
    { value: 'courier', label: 'Courier' }
];

export const SHIPMENT_STATUS_OPTIONS: StatusOption[] = [
    { value: '', label: 'Unavailable' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'pending', label: 'Pending' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'hold', label: 'Hold' }
];
