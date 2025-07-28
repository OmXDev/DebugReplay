/**
 * Test file to verify our custom date utilities work correctly
 * You can run these tests to ensure the functions behave as expected
 */

import {
  formatDistanceToNow,
  format,
  addDays,
  addHours,
  subDays,
  formatRelative,
  getDateRange,
  isWithinRange,
} from "./date-utils"

// Test formatDistanceToNow
console.log("Testing formatDistanceToNow:")
const now = new Date()
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

console.log("5 minutes ago:", formatDistanceToNow(fiveMinutesAgo, { addSuffix: true }))
console.log("2 hours ago:", formatDistanceToNow(twoHoursAgo, { addSuffix: true }))
console.log("3 days ago:", formatDistanceToNow(threeDaysAgo, { addSuffix: true }))

// Test format
console.log("\nTesting format:")
const testDate = new Date("2024-01-15T14:30:25")
console.log("yyyy-MM-dd HH:mm:ss:", format(testDate, "yyyy-MM-dd HH:mm:ss"))
console.log("MMM d, yyyy:", format(testDate, "MMM d, yyyy"))
console.log("EEEE, MMMM d:", format(testDate, "EEEE, MMMM d"))

// Test date arithmetic
console.log("\nTesting date arithmetic:")
const baseDate = new Date("2024-01-15T12:00:00")
console.log("Base date:", format(baseDate, "yyyy-MM-dd HH:mm:ss"))
console.log("Add 7 days:", format(addDays(baseDate, 7), "yyyy-MM-dd HH:mm:ss"))
console.log("Add 2 hours:", format(addHours(baseDate, 2), "yyyy-MM-dd HH:mm:ss"))
console.log("Subtract 3 days:", format(subDays(baseDate, 3), "yyyy-MM-dd HH:mm:ss"))

// Test relative formatting
console.log("\nTesting formatRelative:")
console.log("Today:", formatRelative(new Date()))
console.log("Yesterday:", formatRelative(subDays(new Date(), 1)))
console.log("3 days ago:", formatRelative(subDays(new Date(), 3)))

// Test date ranges
console.log("\nTesting getDateRange:")
const range7Days = getDateRange(7)
console.log("Last 7 days range:")
console.log("Start:", format(range7Days.start, "yyyy-MM-dd HH:mm:ss"))
console.log("End:", format(range7Days.end, "yyyy-MM-dd HH:mm:ss"))

// Test within range
const testDateInRange = new Date()
console.log("Is now within last 7 days?", isWithinRange(testDateInRange, range7Days.start, range7Days.end))
