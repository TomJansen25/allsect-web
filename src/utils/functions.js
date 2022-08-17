export function parseDate(date, monthLength = "short") {
    const dateParts = date.split("-")
    const day = Number(dateParts[0])
    const month = Number(dateParts[1]) - 1
    const year = Number(dateParts[2])

    const dt = new Date(day, month, year)

    const options = { day: "numeric", month: monthLength, year: "numeric" }
    // return dt.toLocaleString('de-DE', options).replace('.', '');
    return dt.toLocaleString("en-GB", options).replace(".", "")
}

export function readingTime(words) {
    return Math.ceil(words / 200).toString()
}

export function getFirstSliceOfType(body, type) {
    const isSlice = (slice) => slice.slice_type === type
    return body.findIndex(isSlice)
}
