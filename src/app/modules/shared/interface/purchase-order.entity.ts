export interface PurchaseOrderSearch {
    poDate: string;
    poValue: number;
    currency: string;
    poNumber: string;
    poStatus: string;
    deliveryDate: string;
    purchaseType: string;
    supplierName: string;
    purchaseOrderId: number;
    deliveryLocation: string;
}

export interface PurchaseOrderData {
    purchaseOrderId: number;
    deliveryDate: string;
    poAddress: number;
    purchaseType: string;
    poDate: string;
    paymentTerm: string;
    specialInstruction: string;
    poNo: string;
    subTotal: string;
    poVlue: string;
    poStatus: string;
    poExchangeRate: string;
    supplier: {
        shortCode: string;
        supplierId: number;
        supplierCode: string;
        supplierName: string;
        supplierCodePrefix: string;
    };
    attentionPerson: null | string;
    taxGroup: null | string;
    deliveryLocation: {
        warehouseId: number;
        warehouseCode: string;
        warehouseName: string;
        warehouseAddress: string;
    };
    currency: {
        currencyId: number;
        currencyCode: string;
        currencyName: string;
    };
    purchaseOrderItems: {
        size: string;
        unit: number;
        styleNo: string;
        quantity: number;
        unitPrice: number;
        description: string;
        purchaseItemId: number;
        receivedQuantity: number;
        rquestedBy?: string;
        department?: string;
        inventoryItem: {
            quantityOnHand: number;
            inventoryItemId: number;
            reOrderQuantity: number;
            inventoryItemCode: string;
            inventoryItemName: string;
            inventoryItemDescription: string;
        };
    }[];
}
