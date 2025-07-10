function formatInvoiceNumber(id) {
    const paddedId = String(id).padStart(6, '0');
    const year = new Date().getFullYear();
    return `INV-${year}-${paddedId}`;
}

module.exports = formatInvoiceNumber;
