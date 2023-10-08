/**
 * @param {String} date a standard timestamp string.
 * @description Converts a timestamp string into a DD/MM/YYYY formatted string.
 * @return {String} a DD/MM/YYYY formatted string.
 */
export const formatDateDDMMYYY = (date) => {
    return ( new Date(date) ).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"});
}